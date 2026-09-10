#!/usr/bin/env node
/**
 * Media pipeline for public/work/** + public/services/*.webp + public/og.jpg.
 *
 *   node scripts/build-media.mjs sheets [--only <slug>]   contact sheets → scripts/media/_sheets/
 *   node scripts/build-media.mjs probe                     ffprobe every source
 *   node scripts/build-media.mjs build  [--only <slug>] [--force]
 *   node scripts/build-media.mjs thumbs [--only <slug>] [--force]  small covers
 *   node scripts/build-media.mjs check                     budgets only, nonzero exit on breach
 *
 * Raw sources live in media-src/ (git-ignored, owner-held). Only the derived
 * assets under public/ are committed. Timestamps are hand-curated in
 * scripts/media/manifest.json — run `sheets`, eyeball, write the `t` values.
 */
import { mkdirSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { extractFrame, makeLoop, contactSheet, probe } from "./media/ffmpeg.mjs";
import { toWebp, toJpg } from "./media/images.mjs";
import { loadManifest, ROOT } from "./media/manifest.mjs";
import { record, report } from "./media/budget.mjs";

const cmd = process.argv[2] ?? "build";
const only = argValue("--only");
const force = process.argv.includes("--force");
const SHEETS = resolve(ROOT, "scripts/media/_sheets");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : null;
}
function ensureDir(p) {
  mkdirSync(dirname(p), { recursive: true });
}
function fresh(out, src) {
  if (force || !existsSync(out)) return false;
  try {
    return statSync(out).mtimeMs >= statSync(src).mtimeMs;
  } catch {
    return false;
  }
}
function pick(list) {
  return only ? list.filter((x) => x.slug === only || x.name === only) : list;
}

const { manifest, missing } = loadManifest();

if (missing.length && cmd !== "check") {
  console.warn(`\n! ${missing.length} source(s) not found (skipped):`);
  missing.forEach((m) => console.warn(`  ${m}`));
  console.warn("");
}

async function doSheets() {
  mkdirSync(SHEETS, { recursive: true });
  for (const p of pick(manifest.projects)) {
    if (p.sourceType !== "video" || !existsSync(p._source)) continue;
    const out = join(SHEETS, `${p.slug}.png`);
    process.stdout.write(`sheet  ${p.slug} … `);
    const map = await contactSheet(p._source, out);
    console.log("ok");
    // 5x5 grid, row-major; each cell's centre timestamp (seconds).
    const cols = 5;
    for (let r = 0; r < 5; r++) {
      console.log(
        "   " +
          map
            .slice(r * cols, r * cols + cols)
            .map((c) => `${String(c.t).padStart(6)}s`)
            .join("  "),
      );
    }
  }
  console.log(`\ncontact sheets in ${SHEETS}`);
}

async function doProbe() {
  for (const p of manifest.projects) {
    if (p.sourceType !== "video" || !existsSync(p._source)) continue;
    const info = await probe(p._source);
    console.log(
      `${p.slug.padEnd(24)} ${info.width}x${info.height}  ${info.duration.toFixed(1)}s  ${p._source}`,
    );
  }
}

async function buildProject(p) {
  const outDir = resolve(ROOT, "public/work", p.slug);
  const d = manifest.defaults;

  if (p.sourceType === "video") {
    if (!existsSync(p._source)) return;
    for (const f of p.frames) {
      const out = join(outDir, `${f.name}.webp`);
      if (fresh(out, p._source)) continue;
      ensureDir(out);
      await extractFrame(p._source, f.t, out, {
        width: f.name === "cover" ? d.cover.width : d.still.width,
        crop16x10: f.name === "cover",
        quality: f.name === "cover" ? d.cover.quality : d.still.quality,
      });
      console.log(`  frame  ${p.slug}/${f.name}.webp @ ${f.t}`);
    }
    if (p.loop) {
      const mp4 = join(outDir, "loop.mp4");
      const webm = join(outDir, "loop.webm");
      if (!fresh(mp4, p._source)) {
        ensureDir(mp4);
        await makeLoop(
          p._source,
          p.loop.t,
          p.loop.durationSec ?? d.loop.durationSec,
          mp4,
          webm,
          { width: d.loop.width, crf: p.loop.crf ?? 28 },
        );
        console.log(`  loop   ${p.slug}/loop.{mp4,webm} @ ${p.loop.t}`);
      }
      const poster = join(outDir, "poster.webp");
      if (!fresh(poster, p._source)) {
        await extractFrame(p._source, p.poster?.t ?? p.loop.t, poster, {
          width: d.cover.width,
          crop16x10: true,
          quality: d.cover.quality,
        });
        console.log(`  poster ${p.slug}/poster.webp`);
      }
    }
  } else if (p.sourceType === "stills") {
    for (const [name, src] of Object.entries(p._stills)) {
      if (!existsSync(src)) continue;
      const out = join(outDir, `${name}.webp`);
      if (fresh(out, src)) continue;
      ensureDir(out);
      await toWebp(src, out, {
        width: name === "cover" ? d.cover.width : d.still.width,
        quality: d.still.quality,
        crop16x10: name === "cover",
      });
      console.log(`  still  ${p.slug}/${name}.webp`);
    }
  }

  // budgets
  const b = manifest.budgets;
  for (const f of p.frames ?? []) record(join(outDir, `${f.name}.webp`), f.name === "cover" ? b.coverKB : b.stillKB);
  for (const name of Object.keys(p.stills ?? {})) record(join(outDir, `${name}.webp`), name === "cover" ? b.coverKB : b.stillKB);
  if (p.loop) {
    record(join(outDir, "loop.mp4"), b.loopKB);
    record(join(outDir, "loop.webm"), b.loopKB);
  }
}

async function buildServices() {
  const outDir = resolve(ROOT, "public/services");
  for (const svc of pick(manifest.services)) {
    if (!existsSync(svc._source)) continue;
    for (const w of svc.widths) {
      const out = join(outDir, `${svc.name}-${w}.webp`);
      if (fresh(out, svc._source)) continue;
      ensureDir(out);
      await toWebp(svc._source, out, { width: w, quality: svc.quality ?? 80 });
      console.log(`  service ${svc.name}-${w}.webp`);
      record(out, manifest.budgets.serviceKB);
    }
  }
}

async function buildOg() {
  const og = manifest.og;
  if (!existsSync(og._source)) return;
  const out = resolve(ROOT, og.out);
  if (!fresh(out, og._source)) {
    ensureDir(out);
    await toJpg(og._source, out, { width: og.width, height: og.height, quality: og.quality });
    console.log(`  og      ${og.out}`);
  }
  record(out, manifest.budgets.ogKB);
}

/**
 * Small covers for the hero panel and the work strip.
 *
 * Derived from the committed 1600px `cover.webp`, NOT from media-src/ — so it
 * runs from a clean checkout with no raw footage. The full-width cover is far
 * too many bytes for a 330–560px slot, and these are served `unoptimized`
 * (deliberately — it keeps the LCP image off the image-optimiser's critical
 * path), so the right width has to exist on disk.
 */
const THUMB_WIDTH = 800;

async function buildThumbs() {
  for (const p of pick(manifest.projects)) {
    // `poster` is the <video poster> attribute, which the browser fetches even
    // under preload="none" — so it needs a small variant just as much as the
    // cover does, and next/image never gets a chance to size it down.
    for (const name of ["cover", "poster"]) {
      const src = resolve(ROOT, "public/work", p.slug, `${name}.webp`);
      if (!existsSync(src)) continue;
      const out = resolve(
        ROOT,
        "public/work",
        p.slug,
        `${name}-${THUMB_WIDTH}.webp`,
      );
      if (fresh(out, src)) continue;
      await toWebp(src, out, { width: THUMB_WIDTH, quality: 78 });
      console.log(`  thumb   ${p.slug}/${name}-${THUMB_WIDTH}.webp`);
      record(out, manifest.budgets.stillKB);
    }
  }
}

async function doThumbs() {
  console.log("building small covers …\n");
  await buildThumbs();
  process.exit(report() ? 1 : 0);
}

async function doBuild() {
  console.log("building media …\n");
  for (const p of pick(manifest.projects)) await buildProject(p);
  if (!only || manifest.services.some((s) => s.name === only)) await buildServices();
  if (!only) await buildOg();
  await buildThumbs();
  const breached = report();
  if (breached) {
    console.error(`FAIL: ${breached} file(s) over budget.`);
    process.exit(1);
  }
}

async function doCheck() {
  for (const p of manifest.projects) {
    const outDir = resolve(ROOT, "public/work", p.slug);
    const b = manifest.budgets;
    for (const f of p.frames ?? []) record(join(outDir, `${f.name}.webp`), f.name === "cover" ? b.coverKB : b.stillKB);
    for (const name of Object.keys(p.stills ?? {})) record(join(outDir, `${name}.webp`), name === "cover" ? b.coverKB : b.stillKB);
    if (p.loop) {
      record(join(outDir, "loop.mp4"), b.loopKB);
      record(join(outDir, "loop.webm"), b.loopKB);
    }
  }
  for (const svc of manifest.services) {
    for (const w of svc.widths) record(resolve(ROOT, "public/services", `${svc.name}-${w}.webp`), manifest.budgets.serviceKB);
  }
  record(resolve(ROOT, manifest.og.out), manifest.budgets.ogKB);
  process.exit(report() ? 1 : 0);
}

const table = {
  sheets: doSheets,
  probe: doProbe,
  build: doBuild,
  thumbs: doThumbs,
  check: doCheck,
};
const fn = table[cmd];
if (!fn) {
  console.error(`unknown command: ${cmd}`);
  process.exit(2);
}
fn().catch((e) => {
  console.error(e);
  process.exit(1);
});
