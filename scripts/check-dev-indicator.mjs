// Verifies the Next.js dev indicator badge is not visible on the dev page.
// Usage: node scripts/check-dev-indicator.mjs http://localhost:3000 [screenshot.png]
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const visible = await page.evaluate(() => {
  const root = document.querySelector("nextjs-portal")?.shadowRoot;
  if (!root) return [];
  return [...root.querySelectorAll("*")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && Number(s.opacity) > 0;
    })
    .map((el) => `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""} ${[...el.attributes].map((a) => a.name).join(",")}`);
});
if (out) await page.screenshot({ path: out, clip: { x: 0, y: 700, width: 300, height: 200 } });
console.log(visible.length ? `VISIBLE dev-tools elements:\n${visible.join("\n")}` : "OK: no visible dev indicator");
await browser.close();
process.exit(visible.length ? 1 : 0);
