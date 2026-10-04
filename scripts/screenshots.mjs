// Full-page screenshots of the design references and the local site for visual comparison.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir] [widths...]
//   node scripts/screenshots.mjs http://localhost:3000 .screenshots 1440 1024 768 390
// References are captured at their native width; every route at every width.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const [baseUrl = "http://localhost:3000", outDir = ".screenshots", ...w] = process.argv.slice(2);
const widths = w.length ? w.map(Number) : [1440, 1024, 768, 390];
const routes = { home: "/" };
const references = [
  ["landing-desktop", 1440],
  ["landing-mobile", 390],
  ["privacy", 1440],
  ["terms", 1440],
  ["support", 1440],
];
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

async function shoot(url, file, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  const res = await page.goto(url, { waitUntil: "networkidle" });
  if (res && !res.ok() && !url.startsWith("file:")) {
    console.log(`${path.basename(file)}  HTTP ${res.status()} — skipped`);
    return page.close();
  }
  await page.evaluate(() => document.fonts.ready);
  // The mobile reference renders its menu open; close it to compare the page.
  await page.evaluate(() => {
    const menu = document.getElementById("mobile-menu");
    if (menu && location.protocol === "file:") menu.style.display = "none";
  });
  // Trigger lazy images, then return to the top.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await page.screenshot({ path: file, fullPage: true });
  await page.close();
  console.log(`${path.basename(file)}  horizontal overflow: ${overflow}px`);
}

for (const [name, width] of references)
  await shoot("file://" + path.resolve(`design/${name}.html`), path.join(outDir, `reference-${name}.png`), width);
for (const [name, route] of Object.entries(routes))
  for (const width of widths) await shoot(baseUrl + route, path.join(outDir, `site-${name}-${width}.png`), width);
await browser.close();
