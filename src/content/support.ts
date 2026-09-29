import type { IconKey } from "@/components/ui/Icon";

/** Support page copy, from design/support.html. */
export const support = {
  badge: "Support",
  title: "How can we help?",
  intro: "Find a quick answer below, or write to us.",
  description: "Answers to common questions about Seiton, and how to reach us.",
  form: {
    title: "Write to us",
    intro: "Tell us what happened and what you expected.",
    submit: "Send message",
    emailPlaceholder: "name@company.com",
  },
  emailCard: { label: "Email", replyTime: "Usual reply time:" },
  beforeYouWrite: {
    label: "Before you write",
    items: [
      "Your Seiton version. It is at the bottom of Profile.",
      "Your iPhone model and iOS version.",
      "What you did, what you expected, and what happened.",
    ],
  },
  topics: {
    eyebrow: "Browse by topic",
    title: "Start with the basics.",
    items: [
      { title: "Signing in", body: "Codes, email and your account", icon: "mail" },
      { title: "Projects and limits", body: "Free plan, archiving and Pro", icon: "folder" },
      { title: "Recording", body: "Microphone, locked screen and length", icon: "mic" },
      { title: "Calendar", body: "Apple Calendar sync and reminders", icon: "calendar-alt" },
      { title: "Plans and billing", body: "Trial, cancelling and restoring", icon: "card" },
    ] satisfies { title: string; body: string; icon: IconKey }[],
  },
  faq: {
    eyebrow: "Help",
    title: "Common questions.",
    prompt: "Not here?",
    link: "Write to us",
  },
} as const;
