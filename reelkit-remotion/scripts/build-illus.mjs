// Converts ../reelkit/illus.js (browser IIFE that sets window.ILL) into src/illus.json
// so the Remotion kit uses the exact same flat illustrations.
// Run: node scripts/build-illus.mjs   (re-run whenever reelkit/illus.js changes)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(here, "../../reelkit/illus.js"), "utf8");
const ctx = { window: {} };
vm.runInNewContext(src, ctx);
const out = {};
for (const [k, v] of Object.entries(ctx.window.ILL)) {
  out[k] = v.replace("<svg ", '<svg width="100%" height="100%" ');
}
fs.writeFileSync(path.join(here, "../src/illus.json"), JSON.stringify(out));
console.log(`illus.json: ${Object.keys(out).length} illustrations → ${Object.keys(out).join(", ")}`);
