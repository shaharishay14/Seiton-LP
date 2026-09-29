// Full-page screenshots of the design reference and the local site for visual comparison.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir] [widths...]
//   node scripts/screenshots.mjs http://localhost:3000 .screenshots 1440 1024 768 390
// The reference (design/landing-desktop.html) is captured at 1440 only.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const [baseUrl = "http://localhost:3000", outDir = ".screenshots", ...w] = process.argv.slice(2);
const widths = w.length ? w.map(Number) : [1440, 1024, 768, 390];
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

async function shoot(url, file, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
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

await shoot("file://" + path.resolve("design/landing-desktop.html"), path.join(outDir, "reference-1440.png"), 1440);
for (const width of widths) await shoot(baseUrl, path.join(outDir, `site-${width}.png`), width);
await browser.close();
