// Behavioural checks: tab order + focus ring, billing toggle, FAQ accordions,
// mobile menu, legal TOC, support form + API, reduced motion, mockups hidden
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
  check((await details.count()) === 5, "5 FAQ items");
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
  const btn = page.getByRole("button", { name: "Menu" });
  check(await btn.isVisible(), "menu button visible at 390px");
  await btn.click();
  check(await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Pricing" }).isVisible(), "menu opens with nav links");
  check((await btn.getAttribute("aria-expanded")) === "true", "menu button reports aria-expanded=true");
  await page.keyboard.press("Escape");
  check(await btn.evaluate((el) => el === document.activeElement) && (await btn.getAttribute("aria-expanded")) === "false", "Escape closes menu and restores focus");
  await btn.click();
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Pricing" }).click();
  check((await btn.getAttribute("aria-expanded")) === "false", "tapping a menu link closes the menu");
  const links = await page.locator("footer a").evaluateAll((els) => els.map((a) => a.getBoundingClientRect().height));
  check(links.every((h) => h >= 44), "footer links are at least 44px tall on mobile");
  await page.close();
}

// Legal TOC
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url + "/privacy", { waitUntil: "networkidle" });
  const current = () => page.locator('nav[aria-label="On this page"] a[aria-current="location"]').getAttribute("href");
  check((await current()) === "#who", "TOC highlights the first section on load");
  await page.locator('nav[aria-label="On this page"] a[href="#rights"]').click();
  await page.waitForTimeout(1200);
  check((await current()) === "#rights", "TOC click moves the highlight");
  check(await page.evaluate(() => Math.abs(document.getElementById("rights").getBoundingClientRect().top - 24) < 4), "TOC click scrolls the section to the top (scroll-margin 24px)");
  await page.evaluate(() => document.getElementById("security").scrollIntoView());
  await page.waitForTimeout(800);
  check((await current()) === "#security", "scrolling updates the highlight");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  check((await current()) === "#contact", "last section highlighted at the bottom of the page");
  check((await page.locator("[data-placeholder]").count()) > 0, "null placeholders render as tags");
  await page.close();
}

// Support: FAQ + form
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url + "/support", { waitUntil: "networkidle" });
  const details = page.locator("#faq details");
  check((await details.count()) === 8 && (await details.nth(0).evaluate((d) => d.open)), "support FAQ: 8 items, first open");
  await details.nth(3).locator("summary").click();
  check((await details.nth(3).evaluate((d) => d.open)) && !(await details.nth(0).evaluate((d) => d.open)), "support FAQ opens one item at a time");

  const form = page.locator("#contact form");
  const submit = page.getByRole("button", { name: "Send message" });
  await submit.click();
  const emailErr = await page.getByLabel("Email", { exact: true }).getAttribute("aria-invalid");
  check(emailErr === "true" && (await page.getByText("Enter your email address.").isVisible()) && (await page.getByText("Tell us what happened.").isVisible()), "empty submit shows inline errors");
  check(await page.getByLabel("Email", { exact: true }).evaluate((el) => el === document.activeElement), "focus moves to the first invalid field");
  await page.getByLabel("Email", { exact: true }).fill("not-an-email");
  await page.getByLabel("Message", { exact: true }).fill("The calendar sync stopped after the update.");
  await submit.click();
  check(await page.getByText("Enter a valid email address, like name@company.com.").isVisible(), "bad email is rejected");

  const bad = await page.request.post(url + "/api/support", { data: { email: "x", topic: "Nope", message: "" } });
  const badBody = await bad.json();
  check(bad.status() === 400 && badBody.errors?.email && badBody.errors?.topic && badBody.errors?.message, "API validates on the server (400 + field errors)");
  const bot = await page.request.post(url + "/api/support", { data: { email: "a@b.co", topic: "Calendar", message: "hello there bot", website: "spam" } });
  check(bot.ok(), "API accepts silently when the honeypot is filled");

  await page.getByLabel("Email", { exact: true }).fill("dana@example.com");
  await page.getByLabel("Topic", { exact: true }).selectOption("Calendar");
  await submit.click();
  await page.getByRole("status").waitFor();
  check((await page.getByRole("status").textContent()).includes("Thanks. We'll reply to dana@example.com."), "success state replaces the form");
  check((await form.count()) === 0, "form is removed after success");
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
