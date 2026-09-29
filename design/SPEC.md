# Seiton landing page — design spec

Source: Claude canvas "v2". Boards covered: **Landing page · desktop 1440**, **Landing page · mobile 390**, **Privacy Policy**, **Terms of Use** and **Support** (all desktop 1440).
Design language: **Seiton Design System v2.0 — Light. "Soft surface. Precise system."**
Hairlines instead of shadows, mono metadata, one signal accent, silk imagery framed like a specimen.

> **Source of truth for pixels:** `design/landing-desktop.html` (open it in a browser at 1440px wide).
> This spec explains the intent, tokens, copy and behavior. When the two disagree on a number, the HTML wins.
> The canvas has two layouts for the landing page: desktop (1440) and mobile (390). Tablet is not designed; section 9 says how to interpolate. The three inner pages are designed at desktop only; section 15 says how to make them responsive.

---

## 1. Files in `design/`

| File | What it is |
|---|---|
| `landing-desktop.html` | Standalone reference of the full desktop landing page (1440). Pricing toggle works. Inline styles on purpose, so values can be read straight off it. |
| `landing-mobile.html` | Standalone reference of the mobile landing page (390). Menu button and pricing toggle work. |
| `privacy.html` | Privacy Policy, desktop 1440 |
| `terms.html` | Terms of Use, desktop 1440 |
| `support.html` | Support page, desktop 1440. FAQ accordion works. |
| `assets/logo.webp` | Seiton logo mark (600×600, transparent) |
| `assets/hero-silk-band.webp` | Wide silk band (3960×1084) used behind the hero and in the closing CTA card |
| `assets/tex-azure.webp` | Blue silk texture 1000×1000 — Acme Corp project |
| `assets/tex-lilac.webp` | Violet silk texture — Northwind project |
| `assets/tex-coral.webp` | Pink silk texture — Globex project |
| `assets/tex-lime.webp` | Lime silk texture — Studio rebrand project |
| `assets/tex-iris.webp` | Holographic/iris silk texture — Dana · therapy project, Pro card |

Copy `design/assets/*` to `public/images/` in the Next.js app (see the prompt for exact paths). Open the reference files in a browser at their native width (1440 or 390); they link to each other.

---

## 2. Design tokens

### Color
| Token | Hex | Use |
|---|---|---|
| `canvas` | `#FAFAFA` | App background inside phone frames, visual panels |
| `surface` | `#FFFFFF` | Page background, cards, inputs |
| `sunken` | `#F2F2F4` | Segmented tracks, count chips |
| `line` | `#E6E6EA` | Hairlines and card rings |
| `line-strong` | `#D4D4DA` | Secondary buttons, dashed "add" tiles |
| `ink-3` | `#71717A` | Mono metadata (on white only) |
| `ink-2` | `#52525B` | Secondary text |
| `ink` | `#0B0B0F` | Text, primary buttons |
| `ink-raised` | `#2A2A30` | Phone bezel inner ring |
| `accent` | `#0A6CFF` | Links (hover), focus ring, live dots |
| `accent-ink` | `#0050C8` | Accent text on accent-soft (e.g. "−37%") |
| `accent-soft` | `#EAF2FF` | Focus halo, time badges |
| `live` | `#C8F03C` | **Recording only**, always with ink on top |
| `success` | `#14855A` | Saved / synced |
| `danger-soft` / `danger` | `#FDECEA` / `#B4231F` | High-priority badge |

Rule from the system: lime is reserved for recording UI. Blue is the only general accent.

### Typography
- **Geist** (400, 500, 600, 700) for everything you read.
- **Geist Mono** (400, 500) for everything the system reports: eyebrows, times, counts, states, step numbers.
- Load with `next/font/google` (`Geist`, `Geist_Mono`). `-webkit-font-smoothing: antialiased`.

| Role | Size / line | Weight | Tracking |
|---|---|---|---|
| Hero h1 | 92 / 90 | 600 | −0.055em |
| Section h2 (features) | 52 / 54 | 600 | −0.045em |
| Section h2 (how, pricing, faq) | 56 / 58 | 600 | −0.045em |
| Hero paragraph | 21 / 31 | 400 | 0 |
| Feature paragraph | 19 / 29 | 400 | 0 |
| Feature bullet | 17 / 24 | 400 | 0 |
| Button | 16 (nav 14) | 500 | −0.01em |
| Price | 56 / 56 | 600 | −0.05em |
| Mono eyebrow | 13 / 16 (badges 11 / 14) | 500 | +0.08em (badges +0.06em), uppercase |

### Radius
xs 6 · sm 8 · md 12 · lg 14 (cards, list groups) · xl 16 · 28 (pricing cards) · 32 (feature visual panels) · phone bezel 57 / screen 47.

### Depth
- Ring: `0 0 0 1px #E6E6EA` (default for every card)
- Ring + soft drop: `0 0 0 1px #E6E6EA, 0 12px 28px -18px rgba(11,11,15,.3)` (raised cards inside phones)
- Pro pricing card: `0 0 0 1px #0B0B0F, 0 30px 60px -30px rgba(11,11,15,.35)`
- Phone bezel: `0 0 0 2px #2A2A30 inset, 0 60px 90px -40px rgba(11,11,15,.5), 0 20px 40px -24px rgba(11,11,15,.3)`
- Primary button: `inset 0 1px 0 rgba(255,255,255,.14), 0 1px 2px rgba(11,11,15,.2)`

### Spacing
4px grid. Page gutters are **120px** on desktop. Section vertical padding is 100–120px.

### Motion
Keyframes defined on the reference: `rise`, `float`, `blink`, `pulse` (waveform bars, `scaleY .35 → 1`), `scan`, `caret`, `load`, `halo` (lime ring, 0 → 14px, used on the record dot), `sweep`.
- Buttons and links: `transition: transform .16s, background-color .16s, box-shadow .16s`; `:active { transform: scale(.97) }`.
- Focus: `outline: 2px solid #0A6CFF; outline-offset: 2px` on links, buttons, inputs.
- `html { scroll-behavior: smooth }`.
- **Must honor `prefers-reduced-motion: reduce`** (all animation and transition off).

---

## 3. Page structure (top to bottom)

1. Header (absolute over the hero)
2. Hero — headline, CTAs, three phones, two floating cards
3. "Who it's for" strip
4. Features — 4 alternating rows (`#features`)
5. How it works — 3 step cards (`#how`)
6. Pricing — toggle + 2 plans (`#pricing`)
7. FAQ — accordion (`#faq`)
8. Closing CTA card
9. Footer

Section numbering in the mono eyebrows is part of the design: 01 Projects, 02 Voice, 03 Calendar, 04 Notes and tasks, 05 How it works, 06 Pricing, 07 FAQ.

---

## 4. Sections

### 4.1 Header
- Height 84px, absolutely positioned over the hero, `z-index: 10`, padding `0 120px`, flex, space-between.
- Left: logo (38×38) + wordmark "Seiton" 22px / 600 / −0.04em, gap 10.
- Center: `nav` pill, height 44, padding `0 6px`, radius 12, `background: rgba(255,255,255,.82)`, `backdrop-filter: blur(14px)`, ring `#E6E6EA`. Links: **Features** (`#features`), **How it works** (`#how`), **Pricing** (`#pricing`), **FAQ** (`#faq`). Each link 32px tall, padding `0 14px`, radius 8, 14px / 500.
- Right: **Get the app** → `#pricing`. Height 44, padding `0 18px`, radius 11, ink background, white text, arrow-right icon 16px, gap 8.

### 4.2 Hero
- Section height 1180px, `overflow: hidden`, relative.
- Background: `hero-silk-band.webp`, `position:absolute; left:-1200px; top:0; width:3960px; height:900px; object-fit:cover`, masked with `linear-gradient(180deg,#000 0%, rgba(0,0,0,.9) 45%, transparent 100%)`. On top of it a white wash: 520px tall, `linear-gradient(180deg, rgba(255,255,255,.88), rgba(255,255,255,.7) 60%, transparent)`.
- Content column centered, `padding-top: 150px`, gap 26:
  - Badge: height 30, padding `0 12px`, radius 8, white 90%, ring. 6px blue dot + mono 11px caps text **"For iPhone · Hebrew and English"**.
  - **h1:** "Every client.<br>One place." (max-width 1000)
  - **p:** "Seiton keeps each client's tasks, meetings, notes and recordings in their own project. So nothing gets mixed up, and nothing gets lost." (max-width 620, `#52525B`)
  - Buttons (gap 12, top margin 6): primary **"Get Seiton for iPhone"** + arrow (52px tall, padding `0 24px`, radius 12, ink) → `#pricing`; secondary **"See how it works"** (white, `inset 0 0 0 1px #D4D4DA`) → `#how`.
  - Micro copy: "Free to start. No credit card."
- **Three phones** below the CTAs (see section 5 for the phone component):
  | Phone | Position (in 1440 frame) | Size | Transform | z |
  |---|---|---|---|---|
  | Left — Project screen "Acme Corp" | left 250, top 720 | 415 × 878 | `perspective(2600px) rotateY(10deg) rotate(-7deg)` | 1 |
  | Right — Recording screen "Maestro weekly" | left 774, top 720 | 415 × 878 | `perspective(2600px) rotateY(-10deg) rotate(7deg)` | 1 |
  | Center — Home "Good morning, Shahar" | left 492, top 670 | 456 × 965 | none | 2 |
  `transform-origin: 50% 40%`. The hero section clips the bottom of the phones.
- **Two floating cards** overlapping the phones: an "Up next" card (Weekly sync, Acme Corp · 16:00 – 17:00 · In Calendar, Record + Take notes buttons) and a small recording chip (red/lime dot "Recording", "Acme Corp", `04:12`, animated waveform). Take exact positions from the reference HTML.

### 4.3 Who it's for
- Padding `20px 120px 100px`, centered column, gap 22.
- Mono label: **"Made for people who work with clients"**
- Five pill chips with a 1.5px stroke icon each: **Freelancers · Consultants · Therapists · Coaches · Agencies**.

### 4.4 Features (`#features`)
Section padding `40px 120px 60px`, rows separated by **140px**. Each row: flex, `align-items:center`, `justify-content: space-between`, gap 80. Text column **480px** wide, gap 22. Visual panel **640 × 640**, radius 32, `#FAFAFA`, ring `#E6E6EA`, `overflow:hidden`.

Text column anatomy: mono eyebrow (13px, `#52525B`) → h2 52/54 → paragraph 19/29 `#52525B` → bullet list (gap 14). Each bullet: 22×22 ink square (radius 7) with a white check icon, then 17/24 text.

| # | Layout | Eyebrow | Headline | Paragraph | Bullets |
|---|---|---|---|---|---|
| 1 | text left, visual right | 01 · Projects | A folder for<br>every client. | Open a project and everything about that client is there: what is due, what was said, what comes next. | Tasks, meetings, notes and recordings in one place · Pin your active clients to Home · A glance shows what is due and what is next |
| 2 | visual left, text right | 02 · Voice | Record the<br>meeting. | One tap to start. It keeps recording with your phone locked, and the audio is saved straight to the right project. | Start from the meeting or from Home · Keeps going when the screen is off · Saved to the client, not to a camera roll. **Plus a pill below the list:** "Transcripts in Hebrew and English · coming soon" |
| 3 | text left, visual right | 03 · Calendar | Synced with<br>Apple Calendar. | Meetings you add in Seiton show up in Apple Calendar, with a reminder before each one. No double entry. | Meetings land in the calendar you already use · A reminder 15 minutes before · Works with the Calendar app you already have |
| 4 | visual left, text right | 04 · Notes and tasks | Notes that stay<br>with the client. | Write in Hebrew or English. Headings, lists, highlights and tags, and every task keeps its own history. | Rich text, right to left or left to right · Tasks with due dates, priorities and checklists · Voice memos attached to the task they belong to |

Visual panels:
1. **Projects:** `tex-azure` faded at the top, and a 3-column grid of project folders (`repeat(3,158px)`, gap `18px 14px`, `scale(1.02)`, offset `left:50%; margin-left:-250px; top:110px`). Folders: Acme Corp (12, azure, "Sync today · 16:00", 4/5/3), Northwind (8, lilac, "Kickoff tomorrow", 2/4/1), Globex (21, coral, "Launch in 3 days", 9/8/4), Studio rebrand (6, lime, "3 tasks", 3/2/1), Dana · therapy (14, iris, "Session Thu · 10:00", 1/11/2), and a dashed **New project** tile.
2. **Voice:** `tex-lime` band, one phone (296 × 623, left 190, top 80, `rotate(-4deg)`) showing the Recording screen ("Maestro weekly", 04:12, 40-bar waveform, "Free plan 4:12 of 10:00" progress, Discard / Stop & save / Pause, "Keeps recording when your phone is locked"), plus a floating recording chip.
3. **Calendar:** `tex-lilac` band, phone (left 70, top 80, `rotate(4deg)`) showing the Calendar screen ("2026 · Week 39", "September", Day/Month segmented, Mon 21 – Sun 27 with Wed 23 selected, hour grid 08:00–15:00 with events: Weekly sync, Send integration spec, Dentist, Northwind kickoff, now-line 10:40), plus floating "Weekly sync · SYNCED · Acme Corp · 09:00 – 10:00 · Apple Calendar · reminder 15 min before" card.
4. **Notes:** `tex-coral` band, phone (left 190, top 80, `rotate(-3deg)`) showing the Note editor ("Acme Corp · Note · Edited 2 min ago", "Onboarding plan for Acme.", numbered items 01–03, "Open questions", tags #onboarding #q4, recording attachment, formatting toolbar), plus two floating cards: an Acme Corp note excerpt and the "Send integration spec · Today, 16:00 · High" task.

### 4.5 How it works (`#how`)
- Padding `120px 120px 60px`, column gap 56.
- Eyebrow "05 · How it works", h2 **"Set up in a minute."**
- 3-column grid (`repeat(3, minmax(0,1fr))`, gap 20). Each card: icon tile + mono step number, h3, paragraph.
  1. **01 — Create a project:** One per client, patient or job. Pick a texture so you can spot it.
  2. **02 — Add what matters:** Tasks with due dates, meetings, notes. Everything lands in that project.
  3. **03 — Record and stay synced:** Record the meeting. It goes to the project, and to your calendar.

### 4.6 Pricing (`#pricing`)
- Padding `120px 120px 60px`, centered, gap 40.
- Eyebrow "06 · Pricing", h2 **"Start free. Go Pro when you grow."** (56/58)
- **Billing toggle** (radiogroup semantics, `aria-pressed` on two buttons): track height 44, padding 4, radius 12, `#F2F2F4`. Segments: **Yearly** with a mono badge `−37%` in `#0050C8`, and **Monthly**. Selected segment: white, `0 0 0 1px #E6E6EA, 0 1px 2px rgba(11,11,15,.08)`. **Default: Yearly.**
- Two cards in a 960px-wide grid (`1fr 1fr`, gap 20), radius 28, padding 36, column gap 24:
  - **Free** — `$0 /month`, "Core features, with limits". Bullets: Up to 3 projects · Tasks, notes and meetings · Apple Calendar sync · Recordings up to 10 min. Button **"Start free"** (secondary, ring `#D4D4DA`), pinned to bottom.
  - **Pro** (ring `#0B0B0F` + big soft shadow, `tex-iris` texture faded at top, black "Recommended" badge). Bullets: Unlimited projects · Recordings up to 60 min · Everything in Free · Transcripts when they launch. Primary ink button with arrow.
  - **Toggle-driven copy:**
    | | Yearly (default) | Monthly |
    |---|---|---|
    | Price | `$4.99` | `$7.99` |
    | Note | $59.99 billed yearly · 7 days free | Billed monthly |
    | CTA | Start 7-day free trial | Go Pro |
- Footnote: "Prices in USD. Subscriptions are billed through the App Store and can be cancelled anytime."

### 4.7 FAQ (`#faq`)
- Padding `120px 120px 60px`, grid `360px minmax(0,1fr)`, gap 80.
- Left: eyebrow "07 · FAQ", h2 **"Questions."**, "Anything else? **Get in touch**." (link)
- Right: native `<details>` accordion, each item `border-top: 1px solid #E6E6EA; padding: 22px 0`, chevron icon rotates when open, **first item open by default**, default marker hidden. Items:
  1. **Does Seiton work in Hebrew?** Yes. Notes, tasks and project names work in Hebrew and English, and text follows the direction of the language you type in.
  2. **Does it sync with Apple Calendar?** Yes. Meetings you create in Seiton are added to Apple Calendar, with a reminder before each one.
  3. **Is there an Android or web version?** Not yet. Seiton is iPhone only for now.
  4. **Can I cancel Pro?** Anytime, from your App Store subscriptions. You keep Pro until the end of the period you paid for.
  5. **What happens when I hit the free limit?** Nothing is deleted. Archive a project to make room, or upgrade to Pro for unlimited projects.
  6. **Who is it for?** Anyone who juggles several clients: freelancers, consultants, therapists, coaches and small agencies.

### 4.8 Closing CTA
- Section padding `100px 120px 80px`. A big rounded card with the silk band as background (white-washed), the logo mark centered, h2 **"Give every client a home."**, paragraph "Free to start. On iPhone.", primary button **"Get Seiton for iPhone"** → `#pricing`.

### 4.9 Footer
> Footer links go to real routes: Privacy → `/privacy`, Terms → `/terms`, Support → `/support`, Contact → `/support#contact`. The FAQ line "Get in touch" → `/support#contact`.

- Padding `40px 120px 60px`, `border-top: 1px solid #E6E6EA`, flex space-between.
- Left: logo (small) + "Seiton" + "© 2026".
- Right: Privacy · Terms · Support · Contact.

---

## 5. Phone mockups (build as components, not images)

Every phone on the page is live HTML/CSS with real text, which is why the reference is large. Build one `<PhoneFrame>` component plus one component per screen and reuse them across hero and features.

**Frame:** outer bezel `padding: 9px; radius 57; background #0B0B0F` + bezel shadow. Inner screen `radius 47; overflow hidden; background #FAFAFA`. The app screen is authored at **390 × 844** and scaled to fit (`transform: scale(...)`, `transform-origin: top left`). Sizes used: 415 × 878 (hero sides), 456 × 965 (hero center), 296 × 623 (feature rows).

**Screens needed (all in the reference HTML):**
1. **Home** — date eyebrow "Wed · 23 Sep", "Good morning, Shahar", "Up next" card, "My projects" 2-col grid of folders, "Recent" filter segmented (All/Notes/Voice/Tasks) + voice-note, checklist, note and task cards, tab bar.
2. **Project** — texture header, back button, "Acme Corp" + "12 items", Next meeting card (Record / Take notes), segmented Tasks 4 / Meetings 2 / Notes 5 / Audio 3, task rows with priority badges, tab bar.
3. **Recording** — "Maestro weekly", timer 04:12, waveform, free-plan progress, controls.
4. **Calendar** — week strip, hour grid, events.
5. **Note editor** — title, numbered list, toolbar.

**Project folder card** (used in Home, Projects panel): neutral folder with white front. Project texture blends into the front at ~42% and fades out toward the counts. Count number top-right, three small tab stripes, name + status line, three icon counters (tasks / notes / recordings).

**Tab bar:** Home, Tasks, center "+" button, Calendar, Profile. Icons: 1.5px stroke, round caps, 24px grid; active tab steps up to 1.7px and ink.

Icons are inline SVG in the reference (Lucide-style). Use `lucide-react` equivalents where they match, otherwise copy the inline SVG.

---

## 6. Interactions

- Smooth in-page scroll for header links and CTAs (`#features`, `#how`, `#pricing`, `#faq`). Offset for the fixed/absolute header is not needed on desktop because the header is absolute, but if you make it sticky on mobile add `scroll-margin-top`.
- Pricing toggle: client state, `year | month`, default `year`. Updates price, note and CTA text and `aria-pressed`.
- FAQ: native `<details>` (no JS needed). Optional: only one open at a time.
- Waveform bars animate with `pulse`; the record dot uses `halo`. Both stop under reduced motion.
- Links inside the phone mockups are decorative. They must not navigate; render them as non-interactive (`aria-hidden`, `tabIndex={-1}`, `pointer-events: none`), and the mockups as a whole should be `aria-hidden="true"` with meaningful alt/labels provided by the surrounding text.

## 7. Content decisions still open (use placeholders, do not invent)

- **App Store URL:** not known. All "Get Seiton for iPhone" / "Get the app" buttons currently point at `#pricing`; keep that, but centralize the destination in one config constant (`siteConfig.appStoreUrl`) so it can be swapped.
- **Legal and support facts:** company name, address, emails, jurisdiction, hosting/email/transcription providers, retention, response time and more are unknown. In the design they appear as blue bracketed tags such as `[COMPANY NAME]`. Full list in section 14. They must live in one config file and render as visible tags until filled.
- **Domain / OG image:** not provided.

## 8. SEO and metadata

- `<title>`: "Seiton — Every client. One place." 
- Description: "Seiton keeps each client's tasks, meetings, notes and recordings in their own project. iPhone app in Hebrew and English."
- `lang="en"`. One `<h1>` (the hero). Landmarks: header, main, section with `aria-label`s as in the reference, footer.
- Open Graph + Twitter card tags; favicon from `logo.webp`.

## 9. Responsive plan

The canvas has **1440 (desktop)** and **390 (mobile, section 11)**. Nothing is designed in between, so interpolate with these rules; do not redesign. Below 640px, follow section 11 exactly.

| Breakpoint | Behavior |
|---|---|
| ≥ 1280 | Exactly the desktop design. Scale the 1440 composition down proportionally between 1280 and 1440 if needed. |
| 1024 – 1279 | Gutters 64px. Feature rows keep two columns; visual panel shrinks (scale the inner composition, keep the 1:1 panel). Hero phones scale down. |
| 640 – 1023 | Gutters 32px. Feature rows stack (text first, then visual, always in that order). How-it-works grid 1 column or 3 tight columns. Pricing cards stack, full width max 560. FAQ stacks (heading above list). Header nav pill hidden; show logo + "Get the app" + a menu button. |
| < 640 | Gutters 20px. h1 ≈ 48/48, h2 ≈ 36/38. Hero shows the center phone only (large) with the two side phones tucked behind and cropped, or removed. Feature visuals become full-width squares, scaled compositions. Pricing toggle full width. |

Fluid type: use `clamp()` between the mobile and desktop sizes, do not jump.

## 10. Accessibility

- Contrast: all text meets AA on its background (ink on white, `#52525B` on white, white on ink). `#71717A` mono metadata only on white.
- Visible focus ring everywhere (see Motion).
- Toggle uses `aria-pressed`; accordion is native `details/summary`.
- Decorative imagery (`alt=""`), phone mockups `aria-hidden`.
- Respect `prefers-reduced-motion`.
- Do not rely on color alone for priority badges (they carry text: High / Medium / Low).

---

## 11. Mobile landing page (390)

Board: **Landing page · mobile 390** (390 × 8560). Same copy, same order, same tokens as desktop. Gutters are **20px**. Everything is one column. Use this as the layout for viewports below ~640px; see section 9 for the range in between.

| Section | Mobile spec |
|---|---|
| Header | Height 64, absolute over hero, padding `0 20px`. Left: logo 32 + "Seiton" 20/600. Right: **Get the app** (44 tall, ink, radius 11, 14px, no arrow) and a **menu button** 44×44 (radius 11, white 82% + blur, ring, two-line icon, `aria-label="Menu"`, `aria-expanded`). The desktop nav pill is not shown. |
| Menu | Opens a card under the header: `top 64; left/right 20`, radius 14, ring + `0 20px 40px -20px rgba(11,11,15,.3)`, padding 6. Four links (Features, How it works, Pricing, FAQ), each 48 tall, padding `0 14px`, radius 9, 16/500. Closes when a link is tapped. |
| Hero | Section height 1130, clipped. Silk band `left -560, width 1500, height 560`, same mask as desktop; white wash 380 tall. Content centered, `padding: 104px 20px 0`, gap 22: badge, **h1 54/54 −0.055em**, paragraph 17/26, buttons stacked full width (gap 10, each 52 tall; primary with arrow, secondary "See how it works"), micro copy 14px. |
| Hero phone | One phone only: the Home screen at **scale 0.766** (456×965 source), left 20, starting at `top: 636` in the section, in a 494px-tall clip box; the phone is cut off at the bottom by a 140px gradient to white. The two side phones and floating cards are not used. |
| Who it's for | Padding `8px 20px 64px`. Chips wrap, centered, gap 10, 44 tall, padding `0 16px`, 16/500. |
| Features | Section padding `24px 20px`, **80px** between rows. Each row: text first, then visual, gap 32. Eyebrow 12px, **h2 38/40**, paragraph 17/26, bullets 16/23 (gap 12). Voice row keeps the "Transcripts … coming soon" pill. |
| Feature visuals | The same 640×640 desktop panels, drawn at **scale 0.547** inside a **350×350** box. Do not redraw them; reuse the components and scale. |
| How it works | Padding `72px 20px 24px`. h2 40/42. Cards stacked (gap 12), radius 24, padding 24, step number 32px. h3 22/26. |
| Pricing | Padding `72px 20px 24px`. h2 40/42. Toggle is **full width** (each segment `flex: 1`). Cards stacked (gap 16), radius 24, padding 28, price 48/48. Footnote centered 14/20. |
| FAQ | Stacks: heading block, then list. Summary 18/24 (gap 16), padding 18px 0, plus icon never shrinks. First item open. "Get in touch" → `/support#contact`. |
| Closing CTA | Padding `40px 20px 56px`. Card 420 tall, radius 28. Logo 72, h2 40/42, paragraph 17. |
| Footer | Stacked, padding `32px 20px 44px`, gap 20. Links wrap, each at least 44px tall (tap size). |

Touch targets are at least 44px throughout. Phone-mockup internals are identical to desktop.

---

## 12. Privacy Policy page (`/privacy`)

Board: **Privacy Policy · desktop 1440**. Reference: `privacy.html`. Terms and Support share the same shell (section 15).

### 12.1 Shared inner-page shell (Privacy, Terms, Support)
- **Header:** same as the landing page header but **not** absolute: it is in flow, 84px tall, and the hero band slides underneath it with `margin-top: -84px`. Logo → `/`. Nav links go to `/#features`, `/#how`, `/#pricing`, `/#faq`. "Get the app" → `/#pricing`.
- **Hero band:** height **380**, clipped. Silk band at `left -1200, width 3960, height 520` with the same fade mask, white wash 420 tall. Content: `padding: 176px 120px 0`, gap 20, left aligned:
  - Badge (same as landing, mono 11px caps, blue dot): "Legal" (Privacy, Terms) or "Support".
  - **h1 76/76, 600, −0.055em.**
  - Mono line 13/18 `#52525B`: `Last updated · [DATE]`.
- **Footer:** same as landing footer, pushed to the bottom of the page (`margin-top: auto`), links to `/privacy`, `/terms`, `/support`.

### 12.2 Legal layout (Privacy and Terms)
- `main`: padding `32px 120px 120px`, grid `280px minmax(0, 1fr)`, gap 80.
- **Left: "On this page"** nav, `position: sticky; top: 24px`. Mono 11px caps label, then one link per section: 36 tall, padding `0 10px`, radius 8, 14/500, with a mono number (`01`, `02`, …, `#71717A`) before the title. The link for the section in view gets `#F2F2F4`. Build it as a client component using `IntersectionObserver`; without JS the first item stays highlighted.
- **Right: article**, `max-width: 760`, gap 40.
  - **"The short version" card:** radius 20, `#FAFAFA`, ring, padding 28, gap 16. Mono caps label, then bullets using the ink check square (22×22).
  - **Sections:** each `<section id="…">` has `border-top: 1px solid #E6E6EA; padding-top: 40px`, gap 16, `scroll-margin-top: 24px`. Title row: mono number 14px `#71717A` + **h2 30/34, 600, −0.035em**, baseline aligned.
  - Body paragraph: **17/28, `#52525B`**. Bold runs use weight 600 and ink.
  - Lists: 6×6 ink square bullet (radius 2), 17/28, `#52525B`, gap 8.
  - **Definition table** ("rows"): radius 14, ring, overflow hidden. Each row is a grid `170px minmax(0,1fr)`, gap 24, padding `18px 22px`, `border-top: 1px solid #E6E6EA` except the first. Label: mono 12/20 caps ink. Value: 16/24 `#52525B`.
- **Placeholder tag:** any unknown fact renders as a tag: Geist Mono 14px, padding `2px 6px`, radius 5, background `#EAF2FF`, text `#0050C8`, shown in square brackets, e.g. `[COMPANY NAME]`. See section 14.

### 12.3 Privacy sections (in order, IDs in brackets)
Short version (4 bullets): your content stays in your account · sign-in is by emailed code, no password · Calendar, microphone and notification access are used only for what you ask and can be turned off in iPhone Settings · we do not sell personal information.

01 Who we are `[who]` · 02 What we collect `[collect]` (table: Account, Your content, Calendar, Microphone, Notifications, Purchases, Device and usage) · 03 How we use it `[use]` · 04 Recordings and transcripts `[recordings]` · 05 Who we share it with `[share]` · 06 Where it is stored `[where]` · 07 How long we keep it `[keep]` · 08 Your choices and rights `[rights]` · 09 Security `[security]` · 10 Children `[children]` · 11 Changes to this policy `[changes]` · 12 Contact `[contact]`.

**The exact copy is in `privacy.html`. Copy it verbatim into a typed content file (`src/content/privacy.ts`), not JSX.** The text is a draft based on what the app does; it must be reviewed by a lawyer before launch.

---

## 13. Terms of Use page (`/terms`)

Board: **Terms of Use · desktop 1440**. Reference: `terms.html`. Same layout as section 12.2.

Short version (3 bullets): you own your content · Free has limits, Pro is billed by Apple and can be cancelled in the App Store · get consent before recording people.

01 The agreement `[agreement]` · 02 Your account `[account]` · 03 Your content `[content]` · 04 Using Seiton `[use]` · 05 Plans and billing `[plans]` (table: Free, Pro, Billing, Cancel, Refunds, Prices) · 06 Free plan limits `[limits]` · 07 Changes and availability `[availability]` · 08 Our rights `[rights]` · 09 Ending these terms `[ending]` · 10 Disclaimers `[disclaimers]` · 11 Limit of liability `[liability]` · 12 Apple `[apple]` · 13 Governing law `[law]` · 14 Changes to these terms `[changes]` · 15 Contact `[contact]`.

Plan facts in the Plans table must come from the same data as the landing page pricing (`siteConfig.pricing`): Free = $0, 3 projects, Apple Calendar sync, recordings up to 10 min. Pro = $59.99/year ($4.99/month equivalent) with a 7-day trial, or $7.99/month; unlimited projects; recordings up to 60 min; transcripts when they launch. Do not hard-code the numbers twice.

Copy is in `terms.html`; move it to `src/content/terms.ts`. Draft only; lawyer review required.

---

## 14. Placeholders that must be filled before launch

These are the blue tags in the design. Keep them in one file (`src/config/legal.ts`) as `string | null`. A `null` renders the blue tag; a string renders as normal text.

| Key | Appears in |
|---|---|
| `companyName`, `companyAddress` | Privacy 01, 12 · Terms 01, 08, 11, 15 |
| `privacyEmail` | Privacy 01, 08, 12 |
| `supportEmail`, `responseTime` | Terms 15 · Support |
| `lastUpdated` | Hero line on Privacy and Terms |
| `analyticsNote` (or remove the row) | Privacy 02 "Device and usage" |
| `transcriptionProvider`, `hostingProvider`, `emailProvider` | Privacy 04, 05 |
| `dataRegion`, `transferSafeguards` | Privacy 06 |
| `deletionPath`, `backupPeriod` | Privacy 07 · Terms 09 · Support FAQ "delete my account" |
| `responsePeriod` | Privacy 08 |
| `encryptionNote` | Privacy 09 |
| `minimumAge` | Privacy 10 · Terms 02 |
| `priceChangeNotice`, `regulatedDataPosition`, `liabilityCap`, `appleTermsCheck` | Terms 05, 10, 11, 12 |
| `jurisdiction`, `courts` | Terms 13 |

Add a script `npm run check:placeholders` that prints every key still `null` and exits non-zero when `NODE_ENV=production` builds are run with `--strict`. It must not block normal dev.

---

## 15. Support page (`/support`)

Board: **Support · desktop 1440**. Reference: `support.html`. Uses the shell from 12.1 (badge "Support", h1 **"How can we help?"**, mono line "Find a quick answer below, or write to us.").

1. **Contact** section, padding `32px 120px 100px`, grid `minmax(0,1fr) 440px`, gap 20.
   - **Write to us** card (id `contact`): radius 28, ring, padding 36, gap 22. Title 30/34, intro 17/26. Fields with visible mono-caps labels: **Email** (`type=email`), **Topic** (select: Signing in, Projects and limits, Recording, Calendar, Plans and billing, Something else), **Message** (textarea, 150 tall). Inputs are 48 tall, radius 12, `inset 0 0 0 1.5px #D4D4DA`, 16px. Button "Send message" + arrow, ink, 52 tall.
   - **Right column** (gap 20): (a) email card with the Pro-card look (ring `#0B0B0F`, big soft shadow, `tex-iris` faded at the top right): label "Email", the support email at 24/30, "Usual reply time: [RESPONSE TIME]"; (b) "Before you write" card (`#FAFAFA`, ring): Seiton version (bottom of Profile), iPhone model and iOS version, what you did / expected / happened.
2. **Browse by topic**: padding `0 120px 100px`, eyebrow, h2 **"Start with the basics."** (56/58), then a 3-column grid (gap 20) of 6 cards: Signing in, Projects and limits, Recording, Calendar, Plans and billing, Writing in Hebrew. Card: radius 20, ring, padding 24, icon tile 48 (radius 14, `#F2F2F4`), up-right arrow top right, title 20/26, description 15/22. Cards link to `#faq`.
3. **FAQ** (`#faq`): same layout as the landing FAQ (`360px | 1fr`, gap 80), eyebrow "Help", h2 **"Common questions."**, "Not here? Write to us" → `#contact`. Nine native `<details>` items, first open: sign-in code · Hebrew · Calendar sync · recording stopped · free limit · cancel/restore · change name or photo · Android/web · delete account (a placeholder answer).

**Form behavior:** the design is static. Build it as a real form that posts to a server action / route handler (`/api/support`) which validates and, for now, only logs and returns success. Show a success state in place of the form ("Thanks. We'll reply to [email].") and inline errors under fields. Do not wire an email service; leave a clearly marked TODO with the placeholder `supportEmail`. Add a hidden honeypot field for spam.

### 15.1 Responsive rules for the three inner pages
- ≥1280: as designed.
- 1024–1279: gutters 64; legal grid `240px | 1fr`, gap 48; Support contact grid stacks below 1100.
- <1024: gutters 32; legal TOC moves above the article as a horizontally scrollable row of pills (or a collapsed `<details>` "On this page"), no longer sticky; Support contact and topic grids collapse to 1 and 2 columns; FAQ stacks.
- <640: gutters 20; h1 clamp to ~44/44; legal section h2 24/28; definition-table rows become one column (label above value); topic grid 1 column; footer stacks like the mobile landing footer; header uses the mobile header (logo, Get the app, menu button).
