# Seiton — website

Marketing site for **Seiton**, an AI assistant for iPhone that keeps all your
projects moving. Next.js (App Router) + TypeScript + Tailwind CSS v4. The current
landing design is [`design/Landing.dc.html`](design/Landing.dc.html) (1440px) and
[`design/LandingMobile.dc.html`](design/LandingMobile.dc.html) (390px); `SPEC.md`
and the older references document the rest of the system.

**One-page "coming soon" release.** The landing page has no prices, no plan
wording, no App Store link and no Privacy, Terms or Support pages: every app
CTA is a disabled "Coming soon" button. Those pages and `POST /api/support` are
parked in `src/app/_unpublished/` — a private folder, so Next.js does not route
it and the URLs return 404. To publish them again, move the folders back up to
`src/app/` (and `api/support` to `src/app/api/support`) and add them to the
sitemap and footer.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Quality checks:

```bash
npm run lint
npm run typecheck
# with the dev server running on :3000
npx playwright install chromium       # once
npm run screenshots                   # full-page shots of the reference + site → .screenshots/
npm run check:interactions            # tab order/focus rings, FAQ, mobile menu, unpublished routes 404, reduced motion
npm run check:landing                 # no prices/plan wording, no legal/App Store links, CTAs disabled
npm run check:dev-indicator           # confirms the Next.js dev badge is hidden
npm run check:placeholders            # lists legal facts still null (add `-- --strict` to fail on any)
```

Routes: `/` (landing) only. `/privacy`, `/terms`, `/support` and `POST /api/support` are unpublished (see above).

## Where things live

| What | Where |
|---|---|
| Design tokens (colours, radii, shadows, fonts, keyframes, gutters, fluid type roles) | `src/app/globals.css` (`@theme` block + `@utility` roles) |
| Landing copy, nav, FAQ | `src/config/site.ts` |
| **Plan prices and limits** (Terms and Support only; not shown on the landing page) | `siteConfig.pricing` in `src/config/site.ts` |
| Unknown legal/support facts (company, emails, jurisdiction…) | `src/config/legal.ts` — `null` renders a blue `[TAG]` |
| Privacy / Terms text (typed blocks) | `src/content/privacy.ts`, `src/content/terms.ts` |
| Support copy and FAQ | `src/content/support.ts`, `src/content/support-faq.ts` |
| Support form validation (client + server) | `src/lib/support-form.ts` |
| Page sections | `src/components/sections/` |
| Header, footer, mobile menu | `src/components/layout/` |
| Phone frame, app screens, floating cards | `src/components/phone/` |
| Reference-derived stroke icons | `src/components/ui/Icon.tsx` (Lucide is used for Plus/X/Chevron/Menu) |

Client components: `MobileMenu`, `LegalToc` (section highlight) and
`SupportForm`. Everything else is server-rendered and static.

## Placeholders to fill in

- **App Store launch** — the header, hero and closing CTAs are `ComingSoonButton`
  (`src/components/ui/Button.tsx`). Swap them for links once the listing exists.
- **Every key in `src/config/legal.ts`** (23, all `null`). `npm run check:placeholders` lists them.
- **Support email delivery** — `POST /api/support` validates and logs only. See the `TODO(support-email)`
  in `src/app/_unpublished/api/support/route.ts`; wire it to `legal.supportEmail` and a mail provider.
- **Site URL** — set `NEXT_PUBLIC_SITE_URL` (e.g. `https://seiton.app`). Until it is set, canonical and
  `og:url` are omitted and `sitemap.xml` is empty.

> The Privacy Policy and Terms of Use are **drafts** and must be reviewed by a lawyer before launch.
- **OG image** — none yet. Add `src/app/opengraph-image.png` (1200×630) and Next picks it up automatically.

## How the phone mockups scale

Every phone is real HTML/CSS with real text, never a screenshot:

1. **Screens** (`phone/screens/*`) are authored at the iPhone logical size, **390 × 844**.
2. **`PhoneFrame`** draws the bezel at one of three sizes (415×878 hero sides, 456×965 hero centre,
   296×623 feature panels) and scales the screen into it with `transform: scale(1.02 | 1.12 | 0.72)`.
3. **Compositions** are then scaled as a whole, with no JavaScript:
   - The hero phones sit on a **1440 × 547 stage** (desktop coordinates of the area under the hero text).
   - Each feature visual is a **640 × 640 stage**.
   - The stage is scaled to its container using container query units and a unitless ratio:
     `scale(tan(atan2(100cqi, 1440px)))` = container width ÷ 1440. See `.hero-stage` and the
     `scale-to-container` utility in `globals.css`.
   - The hero uses different ratios per breakpoint (≥1024: fits the width, capped at 1; 640–1023: centre
     phone ≈ 50% of width; <640: the mobile board — Home phone only at 0.766, pinned to the 20px gutter,
     side phones and floating cards hidden). The section clips the overflow, so there is never
     horizontal scroll.
   - Feature panels scale the whole 640 composition, radius and ring included (0.547 at 390).

The mockups are decorative: their roots are `aria-hidden` and `inert`, they contain no links or
buttons, and `pointer-events` are off.
