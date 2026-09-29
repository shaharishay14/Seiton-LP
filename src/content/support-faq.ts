import { siteConfig } from "@/config/site";
import type { Inline } from "./types";

const plan = siteConfig.pricing;

/**
 * Support page FAQ, copied from design/support.html. Numbers about plans come
 * from siteConfig.pricing. The account-deletion answer is a legal placeholder.
 */
export const supportFaq: { q: string; a: Inline[] }[] = [
  {
    q: "I did not get my sign-in code",
    a: [
      "Check your spam folder first. Codes have 6 digits and last 10 minutes, and you can ask for a new one from the code screen after a short wait. If it still does not arrive, write to us from the address you signed up with.",
    ],
  },
  {
    q: "Meetings are not showing in Apple Calendar",
    a: [
      "Meetings you create in Seiton are added to the calendar you pick under Calendar for meetings in Profile. If nothing appears, check that Calendar access is allowed for Seiton in iPhone Settings.",
    ],
  },
  {
    q: "My recording stopped",
    a: [
      `Free recordings run up to ${plan.free.recordingLimitMinutes} minutes and Pro recordings up to ${plan.pro.recordingLimitMinutes}. Seiton keeps recording when your phone is locked. If a recording will not start, check that Microphone is allowed for Seiton in iPhone Settings.`,
    ],
  },
  {
    q: "What happens when I hit the free limit?",
    a: ["Nothing is deleted. Archive a project to make room, or upgrade to Pro for unlimited projects."],
  },
  {
    q: "How do I cancel Pro or restore a purchase?",
    a: [
      "Cancel anytime from your App Store subscriptions. You keep Pro until the end of the period you paid for. To restore a purchase on a new phone, use Restore on the plan screen. Refunds go through Apple.",
    ],
  },
  {
    q: "How do I change my name or photo?",
    a: [
      "Open Profile and tap Edit. You can change your name, choose a photo, or pick a texture that shows when there is no photo.",
    ],
  },
  {
    q: "Is there an Android or web version?",
    a: ["Not yet. Seiton is iPhone only for now."],
  },
  {
    q: "How do I delete my account and data?",
    a: [{ placeholder: "deletionPath", label: "DESCRIBE THE ACCOUNT DELETION PATH" }],
  },
];
