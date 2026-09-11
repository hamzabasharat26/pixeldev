// Presentation frames for REAL product screenshots.
//
// The service visuals used to be AI renders. They're now real screens from
// shipped projects. Those screenshots arrive in wildly different shapes (a
// 2.2:1 chat UI, a 3.3:1 architecture diagram, a 16:9 HUD), so instead of
// cropping them all to one ratio and losing the interface, each one is set in
// a consistent frame on a transparent 16:10 canvas: a browser window for
// desktop and web software, a pair of phones for the mobile visual.
//
// Privacy: `blur` regions are applied at SOURCE resolution, before any resize,
// so a name or ID can never survive downscaling as a legible smudge.
import sharp from "sharp";

const RATIO = 10 / 16;

/** Heavy blur over source-pixel regions: { left, top, width, height }. */
async function redact(input, regions = []) {
  let buf = await sharp(input).rotate().png().toBuffer();
  for (const r of regions) {
    const patch = await sharp(buf).extract(r).blur(30).toBuffer();
    buf = await sharp(buf).composite([{ input: patch, left: r.left, top: r.top }]).png().toBuffer();
  }
  return buf;
}

function roundedMask(w, h, r) {
  return Buffer.from(
    `<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`,
  );
}

function shadow(W, H, x, y, w, h, r, spread, opacity = 0.5) {
  return Buffer.from(
    `<svg width="${W}" height="${H}"><defs><filter id="s" x="-30%" y="-30%" width="160%" height="160%">` +
      `<feGaussianBlur stdDeviation="${spread}"/></filter></defs>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="rgba(3,10,22,${opacity})" filter="url(#s)"/></svg>`,
  );
}

async function transparent(W, H, layers) {
  return sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(layers)
    .png()
    .toBuffer();
}

/**
 * A browser window around a screenshot.
 * @param {string} src
 * @param {string} out  .webp path
 * @param {{ width?: number, quality?: number, blur?: object[], position?: string, fit?: "cover"|"contain", paper?: string }} o
 */
export async function browserFrame(src, out, o = {}) {
  const { width = 1400, quality = 82, blur = [], position = "top", fit = "cover", paper = "#ffffff" } = o;
  const W = width;
  const H = Math.round(W * RATIO);
  const pad = Math.round(W * 0.06);
  const winW = W - pad * 2;
  const winH = H - pad * 2;
  const bar = Math.round(winW * 0.04);
  const r = Math.round(winW * 0.016);

  const shot = await redact(src, blur);
  const content = await sharp(shot)
    .resize(winW, winH - bar, { fit, position, background: paper })
    .png()
    .toBuffer();

  const dot = Math.round(bar * 0.2);
  const cy = Math.round(bar / 2);
  const chrome = Buffer.from(
    `<svg width="${winW}" height="${bar}"><rect width="${winW}" height="${bar}" fill="#eceff4"/>` +
      `<rect y="${bar - 1}" width="${winW}" height="1" fill="#d9dee7"/>` +
      ["#ff5f57", "#febc2e", "#28c840"]
        .map((c, i) => `<circle cx="${Math.round(bar * 0.62 + i * dot * 3.1)}" cy="${cy}" r="${dot}" fill="${c}"/>`)
        .join("") +
      `<rect x="${Math.round(winW * 0.3)}" y="${Math.round(bar * 0.24)}" width="${Math.round(winW * 0.4)}" height="${Math.round(bar * 0.52)}" rx="${Math.round(bar * 0.26)}" fill="#ffffff"/>` +
      `</svg>`,
  );

  const win = await sharp({ create: { width: winW, height: winH, channels: 4, background: paper } })
    .composite([
      { input: chrome, left: 0, top: 0 },
      { input: content, left: 0, top: bar },
    ])
    .png()
    .toBuffer();
  const rounded = await sharp(win).composite([{ input: roundedMask(winW, winH, r), blend: "dest-in" }]).png().toBuffer();

  const canvas = await transparent(W, H, [
    { input: shadow(W, H, pad, Math.round(pad * 1.25), winW, winH, r, Math.round(pad * 0.42)) },
    { input: rounded, left: pad, top: pad },
  ]);
  await sharp(canvas).webp({ quality, alphaQuality: 90, effort: 5 }).toFile(out);
}

async function phone(screen, phoneH) {
  const phoneW = Math.round(phoneH * 0.49);
  const bezel = Math.round(phoneW * 0.045);
  const r = Math.round(phoneW * 0.15);
  const sw = phoneW - bezel * 2;
  const sh = phoneH - bezel * 2;
  const sr = r - bezel;

  const fitted = await sharp(screen).resize(sw, sh, { fit: "cover", position: "top" }).png().toBuffer();
  const screenR = await sharp(fitted).composite([{ input: roundedMask(sw, sh, sr), blend: "dest-in" }]).png().toBuffer();
  const island = Buffer.from(
    `<svg width="${sw}" height="${sh}"><rect x="${Math.round(sw * 0.34)}" y="${Math.round(sh * 0.018)}" width="${Math.round(sw * 0.32)}" height="${Math.round(sh * 0.03)}" rx="${Math.round(sh * 0.015)}" fill="#05080f"/></svg>`,
  );
  const body = Buffer.from(
    `<svg width="${phoneW}" height="${phoneH}"><rect width="${phoneW}" height="${phoneH}" rx="${r}" fill="#0a1322"/>` +
      `<rect x="1.5" y="1.5" width="${phoneW - 3}" height="${phoneH - 3}" rx="${r - 1}" fill="none" stroke="#2a3f5f" stroke-width="3"/></svg>`,
  );
  return {
    buf: await sharp(body)
      .composite([
        { input: screenR, left: bezel, top: bezel },
        { input: island, left: bezel, top: bezel },
      ])
      .png()
      .toBuffer(),
    w: phoneW,
    h: phoneH,
    r,
  };
}

/**
 * Two phones showing crops of one real screen.
 * @param {string} src
 * @param {string} out
 * @param {{ width?: number, quality?: number, front: object, back: object }} o
 *   front/back: source-pixel crop { left, top, width, height }
 */
export async function phoneFrame(src, out, o) {
  const { width = 1400, quality = 82, front, back } = o;
  const W = width;
  const H = Math.round(W * RATIO);
  const base = await sharp(src).rotate().png().toBuffer();

  const fh = Math.round(H * 0.86);
  const bh = Math.round(fh * 0.86);
  const f = await phone(await sharp(base).extract(front).png().toBuffer(), fh);
  const b = await phone(await sharp(base).extract(back).png().toBuffer(), bh);

  const fx = Math.round(W * 0.5);
  const fy = Math.round((H - fh) / 2);
  const bx = Math.round(W * 0.5 - b.w * 0.95);
  const by = Math.round(fy + (fh - bh) * 0.62);
  const blur = Math.round(W * 0.018);

  const canvas = await transparent(W, H, [
    { input: shadow(W, H, bx, by + blur, b.w, bh, b.r, blur, 0.45) },
    { input: b.buf, left: bx, top: by },
    { input: shadow(W, H, fx, fy + blur, f.w, fh, f.r, blur, 0.55) },
    { input: f.buf, left: fx, top: fy },
  ]);
  await sharp(canvas).webp({ quality, alphaQuality: 90, effort: 5 }).toFile(out);
}
