# Seiton landing page — design spec

Source: Claude canvas "v2", board **Landing page · desktop 1440** (1440 × 7700).
Design language: **Seiton Design System v2.0 — Light. "Soft surface. Precise system."**
Hairlines instead of shadows, mono metadata, one signal accent, silk imagery framed like a specimen.

> **Source of truth for pixels:** `design/landing-desktop.html` (open it in a browser at 1440px wide).
> This spec explains the intent, tokens, copy and behavior. When the two disagree on a number, the HTML wins.
> Everything on the reference is desktop-only. Tablet and mobile layouts are specified in section 9.

---

## 1. Files in `design/`

| File | What it is |
|---|---|
| `landing-desktop.html` | Standalone, openable reference of the full page. Pricing toggle works. Inline styles on purpose, so values can be read straight off it. |
| `assets/logo.webp` | Seiton logo mark (600×600, transparent) |
| `assets/hero-silk-band.webp` | Wide silk band (3960×1084) used behind the hero and in the closing CTA card |
| `assets/tex-azure.webp` | Blue silk texture 1000×1000 — Acme Corp project |
| `assets/tex-lilac.webp` | Violet silk texture — Northwind project |
| `assets/tex-coral.webp` | Pink silk texture — Globex project |
| `assets/tex-lime.webp` | Lime silk texture — Studio rebrand project |
| `assets/tex-iris.webp` | Holographic/iris silk texture — Dana · therapy project, Pro card |

Copy `design/assets/*` to `public/images/` in the Next.js app (see the prompt for exact paths).

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
- **Privacy / Terms / Support / Contact / "Get in touch":** target URLs unknown. Use `#` placeholders behind one config object, or create stub routes if asked.
- **Domain / OG image:** not provided.

## 8. SEO and metadata

- `<title>`: "Seiton — Every client. One place." 
- Description: "Seiton keeps each client's tasks, meetings, notes and recordings in their own project. iPhone app in Hebrew and English."
- `lang="en"`. One `<h1>` (the hero). Landmarks: header, main, section with `aria-label`s as in the reference, footer.
- Open Graph + Twitter card tags; favicon from `logo.webp`.

## 9. Responsive plan (not in the canvas — derived, keep it faithful)

The canvas only covers 1440px. Extend it with these rules; do not redesign.

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
