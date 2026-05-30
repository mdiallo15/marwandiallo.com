#!/usr/bin/env node
// Bundle-size guard. Fails non-zero when the raw byte total of
// `rootMainFiles` in `.next/build-manifest.json` exceeds BUDGET_KB.
// Note: this is raw on-disk bytes (uncompressed, unminified path),
// not the gzipped "First Load JS" figure Next prints — that one is
// ~30% of this. Today the raw total is ~340 kB; budget gives ~20 %
// headroom so accidental dep bloat trips the check before review.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUDGET_KB = 420;
const manifestPath = join(process.cwd(), ".next", "build-manifest.json");

if (!existsSync(manifestPath)) {
  console.error(
    "check-bundle: .next/build-manifest.json missing — run `npm run build` first.",
  );
  process.exit(2);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const sharedChunks = manifest.rootMainFiles ?? [];
let bytes = 0;
for (const rel of sharedChunks) {
  const file = join(process.cwd(), ".next", rel);
  if (existsSync(file)) {
    bytes += readFileSync(file).length;
  }
}

const kb = bytes / 1024;
const formatted = kb.toFixed(1);
if (kb > BUDGET_KB) {
  console.error(
    `check-bundle: shared chunks = ${formatted} kB > budget ${BUDGET_KB} kB. Fail.`,
  );
  process.exit(1);
}
console.log(
  `check-bundle: shared chunks = ${formatted} kB (budget ${BUDGET_KB} kB). OK.`,
);
