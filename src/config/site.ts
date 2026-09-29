/**
 * Site-wide content and links. Every string on the page lives here or in the
 * phone mockup components (which render fixed, decorative app content).
 *
 * Placeholders still to be filled in: `appStoreUrl`, `url` (env), and every
 * entry in `legalLinks` / `contactUrl`.
 */

export type IconName =
  | "folder"
  | "check-square"
  | "file"
  | "user"
  | "bell"
  | "plus"
  | "mic";

export const siteConfig = {
  name: "Seiton",
  title: "Seiton — Every client. One place.",
  description:
    "Seiton keeps each client's tasks, meetings, notes and recordings in their own project. iPhone app in Hebrew and English.",
  /**
   * Production origin, e.g. "https://example.com". Placeholder: set
   * NEXT_PUBLIC_SITE_URL once the domain is decided. While unset, canonical
   * and og:url tags are omitted.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL,
  /**
   * Destination for every "Get Seiton" / "Get the app" / plan CTA.
   * Placeholder: points at the pricing section until the App Store listing exists.
   */
  appStoreUrl: "#pricing",
  /** "Get in touch" link in the FAQ. Placeholder. */
  contactUrl: "#",
  copyrightYear: 2026,

  nav: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],

  /** Footer links. All placeholders. */
  legalLinks: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Support", href: "#" },
    { label: "Contact", href: "#" },
  ],
} as const;

export const heroContent = {
  badge: "For iPhone · Hebrew and English",
  titleLines: ["Every client.", "One place."],
  lead: "Seiton keeps each client's tasks, meetings, notes and recordings in their own project. So nothing gets mixed up, and nothing gets lost.",
  primaryCta: "Get Seiton for iPhone",
  secondaryCta: { label: "See how it works", href: "#how" },
  microcopy: "Free to start. No credit card.",
} as const;

export const audience = {
  label: "Made for people who work with clients",
  items: [
    { label: "Freelancers", icon: "folder" },
    { label: "Consultants", icon: "check-square" },
    { label: "Therapists", icon: "file" },
    { label: "Coaches", icon: "user" },
    { label: "Agencies", icon: "bell" },
  ] satisfies { label: string; icon: IconName }[],
} as const;

export type FeatureId = "projects" | "voice" | "calendar" | "notes";

export type Feature = {
  id: FeatureId;
  eyebrow: string;
  titleLines: [string, string];
  body: string;
  bullets: string[];
  pill?: string;
};

export const features: Feature[] = [
  {
    id: "projects",
    eyebrow: "01 · Projects",
    titleLines: ["A folder for", "every client."],
    body: "Open a project and everything about that client is there: what is due, what was said, what comes next.",
    bullets: [
      "Tasks, meetings, notes and recordings in one place",
      "Pin your active clients to Home",
      "A glance shows what is due and what is next",
    ],
  },
  {
    id: "voice",
    eyebrow: "02 · Voice",
    titleLines: ["Record the", "meeting."],
    body: "One tap to start. It keeps recording with your phone locked, and the audio is saved straight to the right project.",
    bullets: [
      "Start from the meeting or from Home",
      "Keeps going when the screen is off",
      "Saved to the client, not to a camera roll",
    ],
    pill: "Transcripts in Hebrew and English · coming soon",
  },
  {
    id: "calendar",
    eyebrow: "03 · Calendar",
    titleLines: ["Synced with", "Apple Calendar."],
    body: "Meetings you add in Seiton show up in Apple Calendar, with a reminder before each one. No double entry.",
    bullets: [
      "Meetings land in the calendar you already use",
      "A reminder 15 minutes before",
      "Works with the Calendar app you already have",
    ],
  },
  {
    id: "notes",
    eyebrow: "04 · Notes and tasks",
    titleLines: ["Notes that stay", "with the client."],
    body: "Write in Hebrew or English. Headings, lists, highlights and tags, and every task keeps its own history.",
    bullets: [
      "Rich text, right to left or left to right",
      "Tasks with due dates, priorities and checklists",
      "Voice memos attached to the task they belong to",
    ],
  },
];

export const howItWorks = {
  eyebrow: "05 · How it works",
  title: "Set up in a minute.",
  steps: [
    {
      number: "01",
      icon: "folder",
      title: "Create a project",
      body: "One per client, patient or job. Pick a texture so you can spot it.",
    },
    {
      number: "02",
      icon: "plus",
      title: "Add what matters",
      body: "Tasks with due dates, meetings, notes. Everything lands in that project.",
    },
    {
      number: "03",
      icon: "mic",
      title: "Record and stay synced",
      body: "Record the meeting. It goes to the project, and to your calendar.",
    },
  ] satisfies { number: string; icon: IconName; title: string; body: string }[],
} as const;

export type Billing = "year" | "month";

export const pricing = {
  eyebrow: "06 · Pricing",
  title: "Start free. Go Pro when you grow.",
  billingOptions: [
    { value: "year", label: "Yearly", badge: "−37%" },
    { value: "month", label: "Monthly" },
  ] satisfies { value: Billing; label: string; badge?: string }[],
  defaultBilling: "year" as Billing,
  free: {
    name: "Free",
    price: "$0",
    period: "/month",
    note: "Core features, with limits",
    features: [
      "Up to 3 projects",
      "Tasks, notes and meetings",
      "Apple Calendar sync",
      "Recordings up to 10 min",
    ],
    cta: "Start free",
  },
  pro: {
    name: "Pro",
    badge: "Recommended",
    period: "/month",
    features: [
      "Unlimited projects",
      "Recordings up to 60 min",
      "Everything in Free",
      "Transcripts when they launch",
    ],
    byBilling: {
      year: {
        price: "$4.99",
        note: "$59.99 billed yearly · 7 days free",
        cta: "Start 7-day free trial",
      },
      month: { price: "$7.99", note: "Billed monthly", cta: "Go Pro" },
    } satisfies Record<Billing, { price: string; note: string; cta: string }>,
  },
  footnote:
    "Prices in USD. Subscriptions are billed through the App Store and can be cancelled anytime.",
} as const;

export const faq = {
  eyebrow: "07 · FAQ",
  title: "Questions.",
  contactPrompt: "Anything else?",
  contactLabel: "Get in touch",
  items: [
    {
      q: "Does Seiton work in Hebrew?",
      a: "Yes. Notes, tasks and project names work in Hebrew and English, and text follows the direction of the language you type in.",
    },
    {
      q: "Does it sync with Apple Calendar?",
      a: "Yes. Meetings you create in Seiton are added to Apple Calendar, with a reminder before each one.",
    },
    {
      q: "Is there an Android or web version?",
      a: "Not yet. Seiton is iPhone only for now.",
    },
    {
      q: "Can I cancel Pro?",
      a: "Anytime, from your App Store subscriptions. You keep Pro until the end of the period you paid for.",
    },
    {
      q: "What happens when I hit the free limit?",
      a: "Nothing is deleted. Archive a project to make room, or upgrade to Pro for unlimited projects.",
    },
    {
      q: "Who is it for?",
      a: "Anyone who juggles several clients: freelancers, consultants, therapists, coaches and small agencies.",
    },
  ],
} as const;

export const closingCta = {
  title: "Give every client a home.",
  body: "Free to start. On iPhone.",
  cta: "Get Seiton for iPhone",
} as const;
