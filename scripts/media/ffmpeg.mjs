// ffmpeg / ffprobe wrappers. Windows-safe binary resolution, no shell.
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

function resolveBin(name, envVar) {
  const fromEnv = process.env[envVar];
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  // `where` on Windows, `which` elsewhere — spawnSync, no shell.
  const finder = process.platform === "win32" ? "where" : "which";
  const res = spawnSync(finder, [name], { encoding: "utf8" });
  if (res.status === 0) {
    const first = res.stdout.split(/\r?\n/).find(Boolean);
    if (first && existsSync(first.trim())) return first.trim();
  }
  return name; // last resort — PATH lookup by the OS
}

export const FFMPEG = resolveBin("ffmpeg", "FFMPEG_BIN");
export const FFPROBE = resolveBin("ffprobe", "FFPROBE_BIN");

export function run(bin, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(bin, args, { shell: false, stdio: ["ignore", "pipe", "pipe"] });
    let err = "";
    p.stderr.on("data", (d) => (err += d));
    p.on("error", reject);
    p.on("close", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${bin} exited ${code}\n${err.slice(-2000)}`)),
    );
  });
}

export async function probe(file) {
  return new Promise((resolve, reject) => {
    const p = spawn(
      FFPROBE,
      [
        "-v", "error",
        "-select_streams", "v:0",
        "-show_entries", "stream=width,height,duration",
        "-show_entries", "format=duration",
        "-of", "json",
        file,
      ],
      { shell: false },
    );
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.on("error", reject);
    p.on("close", () => {
      try {
        const j = JSON.parse(out);
        const s = j.streams?.[0] ?? {};
        resolve({
          width: Number(s.width) || 0,
          height: Number(s.height) || 0,
          duration: Number(s.duration || j.format?.duration) || 0,
        });
      } catch (e) {
        reject(e);
      }
    });
  });
}

/** Single frame → webp. `t` is "HH:MM:SS.mmm" or seconds. */
export async function extractFrame(src, t, out, { width = 1600, crop16x10 = false, quality = 82 } = {}) {
  const h = Math.round((width / 16) * 10);
  const vf = crop16x10
    ? `scale=${width}:${h}:force_original_aspect_ratio=increase:flags=lanczos,crop=${width}:${h}`
    : `scale=${width}:-2:flags=lanczos`;
  await run(FFMPEG, [
    "-y", "-ss", String(t), "-i", src,
    "-frames:v", "1", "-vf", vf,
    "-c:v", "libwebp", "-quality", String(quality), "-compression_level", "6",
    out,
  ]);
}

/** 2–4s muted loop → mp4 (h264) + webm (vp9). Never upscales. */
export async function makeLoop(
  src,
  t,
  durationSec,
  outMp4,
  outWebm,
  { width = 1280, crf = 28 } = {},
) {
  // Cap to source width (even), keep aspect. `-2` keeps height even.
  const vf = `scale='min(${width},iw)':-2:flags=lanczos`;
  await run(FFMPEG, [
    "-y", "-ss", String(t), "-t", String(durationSec), "-i", src,
    "-an", "-vf", vf,
    "-c:v", "libx264", "-crf", String(crf), "-preset", "slow",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    outMp4,
  ]);
  await run(FFMPEG, [
    "-y", "-ss", String(t), "-t", String(durationSec), "-i", src,
    "-an", "-vf", vf,
    "-c:v", "libvpx-vp9", "-crf", String(crf + 8), "-b:v", "0",
    "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
    outWebm,
  ]);
}

/**
 * Contact sheet: `cols*rows` frames spread evenly across the whole clip,
 * tiled. Returns the per-tile timestamp map (tile index, row-major, 0-based →
 * seconds) so picks can be read off position — no drawtext / fontconfig needed.
 */
export async function contactSheet(src, out, { cols = 5, rows = 5 } = {}) {
  const { duration } = await probe(src);
  const n = cols * rows;
  const step = duration / n;
  const fps = 1 / step;
  const vf = `fps=${fps.toFixed(6)},scale=320:-1,tile=${cols}x${rows}:margin=6:padding=4`;
  await run(FFMPEG, ["-y", "-i", src, "-vf", vf, "-frames:v", "1", out]);
  return Array.from({ length: n }, (_, i) => ({
    tile: i,
    row: Math.floor(i / cols),
    col: i % cols,
    t: +(i * step + step / 2).toFixed(2),
  }));
}
