# Seiton — website

Marketing site for **Seiton**, the iPhone app that keeps each client's tasks,
meetings, notes and recordings in their own project. Next.js (App Router) +
TypeScript + Tailwind CSS v4. The design source of truth is in [`design/`](design/)
(`SPEC.md` and the 1440px reference `landing-desktop.html`).

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
npm run check:interactions            # tab order/focus rings, billing toggle, FAQ, mobile menu, reduced motion
npm run check:dev-indicator           # confirms the Next.js dev badge is hidden
npm run check:placeholders            # lists legal facts still null (add `-- --strict` to fail on any)
```

Routes: `/` (landing), `/privacy`, `/terms`, `/support`, and `POST /api/support`.

## Where things live

| What | Where |
|---|---|
| Design tokens (colours, radii, shadows, fonts, keyframes, gutters, fluid type roles) | `src/app/globals.css` (`@theme` block + `@utility` roles) |
| Landing copy, nav, footer links, FAQ | `src/config/site.ts` |
| **Plan prices and limits** (single source for landing, Terms and Support) | `siteConfig.pricing` in `src/config/site.ts` |
| Unknown legal/support facts (company, emails, jurisdiction…) | `src/config/legal.ts` — `null` renders a blue `[TAG]` |
| Privacy / Terms text (typed blocks) | `src/content/privacy.ts`, `src/content/terms.ts` |
| Support copy and FAQ | `src/content/support.ts`, `src/content/support-faq.ts` |
| Support form validation (client + server) | `src/lib/support-form.ts` |
| Page sections | `src/components/sections/` |
| Header, footer, mobile menu | `src/components/layout/` |
| Phone frame, app screens, floating cards | `src/components/phone/` |
| Reference-derived stroke icons | `src/components/ui/Icon.tsx` (Lucide is used for Plus/X/Chevron/Menu) |

Client components: `PricingPlans` (billing toggle), `MobileMenu`, `LegalToc` (section highlight) and
`SupportForm`. Everything else is server-rendered and static.

## Placeholders to fill in

All in `src/config/site.ts`:

- **`appStoreUrl`** — every "Get Seiton for iPhone", "Get the app" and plan CTA uses it. Currently `#pricing`.
- **Every key in `src/config/legal.ts`** (23, all `null`). `npm run check:placeholders` lists them.
- **Support email delivery** — `POST /api/support` validates and logs only. See the `TODO(support-email)`
  in `src/app/api/support/route.ts`; wire it to `legal.supportEmail` and a mail provider.
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
