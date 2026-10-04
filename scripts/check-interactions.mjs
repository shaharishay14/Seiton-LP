// Behavioural checks: tab order + focus ring, FAQ accordions,
// mobile menu, unpublished routes return 404, reduced motion, mockups hidden
// from assistive tech.
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

  // FAQ
  const details = page.locator("#faq details");
  check((await details.count()) === 3, "3 FAQ items");
  check(await details.nth(0).evaluate((d) => d.open), "first FAQ item open by default");
  await details.nth(2).locator("summary").click();
  check(await details.nth(2).evaluate((d) => d.open), "clicking a question opens it");
  await details.nth(2).locator("summary").focus();
  await page.keyboard.press("Enter");
  check(!(await details.nth(2).evaluate((d) => d.open)), "Enter on summary closes it");

  // Mockups hidden from AT, single h1
  const tree = await page.locator("body").ariaSnapshot();
  check(!tree.includes("Good morning, Alex") && !tree.includes("Push tomorrow"), "phone mockup text not in accessibility tree");
  check((await page.locator("h1").count()) === 1, "exactly one h1");
  await page.close();
}

// Mobile menu
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(url, { waitUntil: "networkidle" });
  const btn = page.getByRole("button", { name: "Menu" });
  check(await btn.isVisible(), "menu button visible at 390px");
  await btn.click();
  check(await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "FAQ" }).isVisible(), "menu opens with nav links");
  check((await btn.getAttribute("aria-expanded")) === "true", "menu button reports aria-expanded=true");
  await page.keyboard.press("Escape");
  check(await btn.evaluate((el) => el === document.activeElement) && (await btn.getAttribute("aria-expanded")) === "false", "Escape closes menu and restores focus");
  await btn.click();
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "FAQ" }).click();
  check((await btn.getAttribute("aria-expanded")) === "false", "tapping a menu link closes the menu");
  check((await page.locator("footer a").count()) === 0, "footer has no links");
  await page.close();
}

// Unpublished routes (one-page release): legal/support pages and the support API are off the router
{
  const page = await browser.newPage();
  for (const route of ["/privacy", "/terms", "/support"]) {
    const res = await page.goto(url + route);
    check(res.status() === 404, `${route} returns 404`);
  }
  const api = await page.request.post(url + "/api/support", { data: {} });
  check(api.status() === 404, "POST /api/support returns 404");
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
