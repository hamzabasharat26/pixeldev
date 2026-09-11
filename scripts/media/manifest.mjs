// Load + validate scripts/media/manifest.json, resolve paths against repo root.
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

export function loadManifest() {
  const raw = JSON.parse(readFileSync(join(HERE, "manifest.json"), "utf8"));
  const missing = [];

  const check = (p) => {
    const abs = resolve(ROOT, p);
    if (!existsSync(abs)) missing.push(p);
    return abs;
  };

  for (const proj of raw.projects) {
    if (proj.sourceType === "video") {
      proj._source = check(proj.source);
    } else if (proj.sourceType === "stills") {
      proj._stills = Object.fromEntries(
        Object.entries(proj.stills).map(([k, v]) => [k, check(v)]),
      );
    }
  }
  for (const svc of raw.services) svc._source = check(svc.source);
  for (const s of raw.showcase ?? []) s._source = check(s.source);
  raw.og._source = check(raw.og.source);

  return { manifest: raw, root: ROOT, missing };
}

export { ROOT };
