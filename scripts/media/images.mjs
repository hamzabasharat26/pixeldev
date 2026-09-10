// sharp helpers for the static-image branch of the pipeline.
import { join } from "node:path";
import sharp from "sharp";

/** Any raster → webp at a target width (never upscales). */
export async function toWebp(src, out, { width = 1600, quality = 82, crop16x10 = false } = {}) {
  let img = sharp(src).rotate(); // respect EXIF orientation
  const meta = await img.metadata();
  const w = Math.min(width, meta.width ?? width);
  if (crop16x10) {
    img = img.resize(w, Math.round((w / 16) * 10), { fit: "cover", position: "attention" });
  } else {
    img = img.resize(w, null, { withoutEnlargement: true });
  }
  await img.webp({ quality, effort: 5 }).toFile(out);
}

/** Render → jpg at a fixed box (OG images). */
export async function toJpg(src, out, { width, height, quality = 82 } = {}) {
  await sharp(src)
    .rotate()
    .resize(width, height, { fit: "cover", position: "attention" })
    .jpeg({ quality, mozjpeg: true })
    .toFile(out);
}

/** One source → several widths: `<base>-<w>.webp`. Returns written paths. */
export async function multiWidth(src, outDir, base, widths, quality = 80) {
  const written = [];
  for (const w of widths) {
    const out = join(outDir, `${base}-${w}.webp`);
    await toWebp(src, out, { width: w, quality });
    written.push(out);
  }
  return written;
}
