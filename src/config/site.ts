/**
 * Site-wide content and links. Every landing-page string lives here or in the
 * phone mockup components (which render fixed, decorative app content).
 * Legal/support facts that are still unknown live in `config/legal.ts`.
 *
 * One-page "coming soon" release: no store link, no prices and no links to
 * the legal or support pages. Placeholder still to be filled in: `url` (env).
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
  title: "Seiton · Your AI assistant for every project.",
  description:
    "Tell Seiton what you need, in your own words. It adds tasks, moves deadlines and turns meetings into action items, across all your projects. Coming soon to iPhone.",
  /**
   * Production origin, e.g. "https://example.com". Placeholder: set
   * NEXT_PUBLIC_SITE_URL once the domain is decided. While unset, canonical
   * and og:url tags are omitted.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL,
  /** Label of the disabled button that stands in for every app CTA until launch. */
  comingSoonLabel: "Coming soon",
  copyrightHolder: "Shahar Ishay",
  copyrightYear: 2026,

  /** Root-relative so the same header works on the landing page and inner pages. */
  nav: [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how" },
    { label: "FAQ", href: "/#faq" },
  ],

  /**
   * Plan facts for the Terms "Plans and billing" table and the Support FAQ.
   * Not shown on the landing page: prices are not final.
   */
  pricing: {
    free: { price: "$0", projectLimit: 3, recordingLimitMinutes: 10 },
    pro: {
      /** Yearly price expressed per month. */
      monthlyEquivalent: "$4.99",
      yearlyPrice: "$59.99",
      monthlyPrice: "$7.99",
      trialDays: 7,
      recordingLimitMinutes: 60,
      yearlySaving: "−37%",
    },
  },
} as const;

export const heroContent = {
  badge: "For iPhone",
  /** Desktop and mobile headlines differ in the design. */
  titleLines: ["Your AI assistant", "for every project."],
  titleLinesMobile: ["Your AI", "assistant."],
  lead: "Tell Seiton what you need, in your own words. It adds tasks, moves deadlines and turns meetings into action items, across all your projects.",
  secondaryCta: { label: "See how it works", href: "#how" },
} as const;

export const audience = {
  label: "Made for people who run more than one thing",
  items: [
    { label: "Freelancers", icon: "folder" },
    { label: "Consultants", icon: "check-square" },
    { label: "Founders", icon: "file" },
    { label: "Makers", icon: "user" },
    { label: "Agencies", icon: "bell" },
  ] satisfies { label: string; icon: IconName }[],
} as const;

export type FeatureId = "assistant" | "meetings" | "accounts" | "notes";

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
    id: "assistant",
    eyebrow: "01 · Assistant",
    titleLines: ["Just tell it", "what you need."],
    body: "Type or speak, in plain words. Seiton works out the project, the date and the details, then does it. It asks before it changes anything important.",
    bullets: [
      "Add a task or reminder in one sentence",
      "Move a whole day of tasks with one message",
      "Asks for your approval first",
    ],
  },
  {
    id: "meetings",
    eyebrow: "02 · Meetings",
    titleLines: ["Record it.", "Get the tasks."],
    body: "One tap to start. Seiton transcribes the recording, finds the action items and offers them as tasks. You choose what to keep.",
    bullets: [
      "Start from the meeting or from Home",
      "Keeps going when the screen is off",
      "Action items become tasks you approve",
    ],
    pill: "Transcripts · coming soon",
  },
  {
    id: "accounts",
    eyebrow: "03 · Accounts",
    titleLines: ["Your inbox and", "calendar, linked."],
    body: "Link Apple Calendar, Google Calendar and Gmail. Pick a different inbox and calendar for each project, so work never mixes.",
    bullets: [
      "Apple Calendar and Google Calendar",
      "A different inbox and calendar per project",
      "Gmail drafts, sent only when you approve · coming soon",
    ],
  },
  {
    id: "notes",
    eyebrow: "04 · Notes and tasks",
    titleLines: ["Notes that turn", "into tasks."],
    body: "Ask Seiton to turn any note into tasks, or to find what you decided last week.",
    bullets: [
      "Tasks with due dates, priorities and checklists",
      "Ask for tasks from any note or recording",
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
      body: "One per client or job. Pick a texture so you can spot it.",
    },
    {
      number: "02",
      icon: "plus",
      title: "Tell the assistant",
      body: "Say what you need in your own words. It lands in the right project.",
    },
    {
      number: "03",
      icon: "mic",
      title: "Review and approve",
      body: "Check what it did. It asks before it changes or sends anything important.",
    },
  ] satisfies { number: string; icon: IconName; title: string; body: string }[],
} as const;

export const faq = {
  eyebrow: "06 · FAQ",
  title: "Questions.",
  items: [
    {
      q: "Can I undo what the assistant does?",
      a: "Yes. Every task the assistant adds shows a card with an Undo button.",
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
      q: "What can the assistant do?",
      a: "Add and move tasks, answer questions about your day, pull action items from meetings, and draft email replies once Gmail is connected. It asks before it changes or sends anything important.",
    },
  ],
} as const;

export const closingCta = {
  title: "Let Seiton run your day.",
  body: "Coming soon to iPhone.",
} as const;
