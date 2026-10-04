// Content checks for the one-page "coming soon" release:
// no prices, plan wording or Hebrew mentions (page text, mockups, metadata), no links to the
// legal/support pages or the App Store, every app CTA is a disabled
// "Coming soon" button.
// Usage: node scripts/check-landing.mjs http://localhost:3000
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failures++;
};

/** "plan" is allowed only in these mockup phrases (not pricing). */
const PLAN_ALLOWED = ["Onboarding plan"];
const BANNED = [
  { label: '"$" price', re: /\$\s?\d/ },
  { label: '"free"', re: /\bfree\b/i },
  { label: '"Pro"', re: /\bPro\b/ },
  { label: '"plan"', re: /\bplans?\b/i },
  { label: '"trial"', re: /\btrial\b/i },
  { label: '"/month"', re: /\/\s?month|per month|billed/i },
  { label: '"Hebrew"', re: /\bHebrew\b/i },
];
const OLD_CTAS = ["Get Seiton for iPhone", "Get the app", "Start free", "Go Pro", "free trial"];

for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });

  // All text, including hidden breakpoint variants and mockups, plus metadata and attributes.
  const text = await page.evaluate(() => {
    const body = document.body.cloneNode(true);
    body.querySelectorAll("script, style, template").forEach((el) => el.remove());
    const attrs = [...document.querySelectorAll("[alt], [aria-label], [title], meta[content]")].map((el) =>
      ["alt", "aria-label", "title", "content"].map((a) => el.getAttribute(a) ?? "").join(" "),
    );
    return [document.title, ...attrs, body.textContent].join("\n").replace(/\s+/g, " ");
  });
  const scrubbed = PLAN_ALLOWED.reduce((t, phrase) => t.replaceAll(phrase, ""), text);
  for (const { label, re } of BANNED) {
    const hit = scrubbed.match(re);
    check(!hit, `${width}px: no ${label}${hit ? ` (found: "…${scrubbed.slice(Math.max(0, hit.index - 30), hit.index + 30)}…")` : ""}`);
  }
  for (const cta of OLD_CTAS) check(!text.includes(cta), `${width}px: no "${cta}" CTA`);

  const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((a) => a.getAttribute("href")));
  const bad = hrefs.filter((h) => /privacy|terms|support|apps\.apple\.com|itunes|#pricing|mailto:/i.test(h));
  check(bad.length === 0, `${width}px: no links to legal/support pages, App Store or pricing${bad.length ? ` (${bad.join(", ")})` : ""}`);
  check((await page.locator("#pricing").count()) === 0, `${width}px: no pricing section`);

  const soon = page.locator("button", { hasText: "Coming soon" });
  const states = await soon.evaluateAll((els) => els.map((b) => b.disabled));
  check(states.length === 3 && states.every(Boolean), `${width}px: header, hero and closing "Coming soon" buttons are disabled (${states.length} found)`);
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
