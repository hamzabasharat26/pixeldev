// Size-budget assertions + a report table.
import { statSync } from "node:fs";
import { relative } from "node:path";

const ROOT = process.cwd();
const rows = [];
let breached = 0;

export function record(file, budgetKB) {
  let kb = 0;
  try {
    kb = statSync(file).size / 1024;
  } catch {
    rows.push({ file: relative(ROOT, file), kb: null, budgetKB, ok: false });
    breached++;
    return;
  }
  const ok = kb <= budgetKB;
  if (!ok) breached++;
  rows.push({ file: relative(ROOT, file), kb, budgetKB, ok });
}

export function report() {
  const pad = (s, n) => String(s).padEnd(n);
  console.log("\n" + pad("file", 46) + pad("size", 12) + pad("budget", 10) + "ok");
  console.log("-".repeat(76));
  for (const r of rows) {
    console.log(
      pad(r.file, 46) +
        pad(r.kb == null ? "MISSING" : `${r.kb.toFixed(0)} KB`, 12) +
        pad(`${r.budgetKB} KB`, 10) +
        (r.ok ? "ok" : "OVER"),
    );
  }
  console.log("-".repeat(76));
  console.log(`${rows.length} files, ${breached} over budget\n`);
  return breached;
}

export function breachedCount() {
  return breached;
}
