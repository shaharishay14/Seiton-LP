// Lists legal/support facts in src/config/legal.ts that are still null.
// Usage: npm run check:placeholders            → report only, always exits 0
//        npm run check:placeholders -- --strict → exits 1 while any key is null
// Not wired into dev or `next build`; run it in a release pipeline with --strict.
import { legal, legalLabels } from "../src/config/legal.ts";

const strict = process.argv.includes("--strict");
const open = Object.entries(legal).filter(([, value]) => value === null);

if (!open.length) {
  console.log("All legal placeholders are filled.");
  process.exit(0);
}
console.log(`${open.length} of ${Object.keys(legal).length} legal placeholders are still null (src/config/legal.ts):\n`);
for (const [key] of open) console.log(`  ${key.padEnd(24)} [${legalLabels[key]}]`);
if (strict) {
  console.error("\n--strict: fill these before launch.");
  process.exit(1);
}
