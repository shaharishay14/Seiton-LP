// Behavioural checks: tab order + focus ring, billing toggle, FAQ accordion,
// mobile menu, reduced motion, mockups hidden from assistive tech.
// Usage: node scripts/check-interactions.mjs http://localhost:3000
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failures++;
};

// Desktop: keyboard order and focus ring
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  const stops = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    stops.push(
      await page.evaluate(() => {
        const el = document.activeElement;
        if (el === document.body) return null; // focus wrapped past the last link
        const s = getComputedStyle(el);
        return {
          text: (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
          ring: s.outlineStyle !== "none" && s.outlineWidth === "2px",
          inMockup: !!el.closest("[inert], [aria-hidden='true']"),
        };
      }),
    );
  }
  const cycle = stops.filter(Boolean).slice(0, stops.indexOf(null) > 0 ? stops.indexOf(null) : undefined);
  console.log("Tab order:", cycle.map((s) => s.text).join(" → "));
  stops.splice(0, stops.length, ...stops.filter(Boolean));
  check(stops.every((s) => s.ring), "every tab stop shows the 2px focus ring");
  check(stops.every((s) => !s.inMockup), "no tab stop inside a phone mockup");

  // Billing toggle
  const year = page.getByRole("button", { name: /Yearly/ });
  const month = page.getByRole("button", { name: "Monthly" });
  const pro = page.locator("#pricing");
  check((await year.getAttribute("aria-pressed")) === "true", "Yearly selected by default");
  check((await pro.textContent()).includes("$4.99") && (await pro.textContent()).includes("Start 7-day free trial"), "yearly copy shown");
  await month.click();
  const monthly = await pro.textContent();
  check((await month.getAttribute("aria-pressed")) === "true" && (await year.getAttribute("aria-pressed")) === "false", "Monthly pressed after click");
  check(monthly.includes("$7.99") && monthly.includes("Billed monthly") && monthly.includes("Go Pro"), "monthly copy shown");
  await year.focus();
  await page.keyboard.press("Enter");
  check((await pro.textContent()).includes("$59.99 billed yearly · 7 days free"), "toggle works from keyboard");

  // FAQ
  const details = page.locator("#faq details");
  check((await details.count()) === 6, "6 FAQ items");
  check(await details.nth(0).evaluate((d) => d.open), "first FAQ item open by default");
  await details.nth(2).locator("summary").click();
  check(await details.nth(2).evaluate((d) => d.open), "clicking a question opens it");
  await details.nth(2).locator("summary").focus();
  await page.keyboard.press("Enter");
  check(!(await details.nth(2).evaluate((d) => d.open)), "Enter on summary closes it");

  // Mockups hidden from AT, single h1
  const tree = await page.locator("body").ariaSnapshot();
  check(!tree.includes("Good morning, Shahar") && !tree.includes("Maestro weekly"), "phone mockup text not in accessibility tree");
  check((await page.locator("h1").count()) === 1, "exactly one h1");
  await page.close();
}

// Mobile menu
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(url, { waitUntil: "networkidle" });
  const btn = page.getByRole("button", { name: "Open menu" });
  check(await btn.isVisible(), "menu button visible at 390px");
  await btn.click();
  check(await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Pricing" }).isVisible(), "menu opens with nav links");
  await page.keyboard.press("Escape");
  check(await page.getByRole("button", { name: "Open menu" }).evaluate((el) => el === document.activeElement), "Escape closes menu and restores focus");
  await page.close();
}

// Reduced motion
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  const animated = await page.evaluate(() =>
    [...document.querySelectorAll("*")].filter((el) => {
      const s = getComputedStyle(el);
      return s.animationName !== "none" || (s.transitionDuration.split(",").some((d) => parseFloat(d) > 0));
    }).length,
  );
  check(animated === 0, `no animations or transitions under reduced motion (${animated} found)`);
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
