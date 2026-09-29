import type { LegalDocument } from "./types";
import { siteConfig } from "@/config/site";

const plan = siteConfig.pricing;

/**
 * Terms of Use. Copied verbatim from design/terms.html.
 * DRAFT: must be reviewed by a lawyer before launch.
 * Unknown facts are placeholder keys from config/legal.ts; never write literal values here.
 */
export const terms: LegalDocument = {
  title: "Terms of Use",
  badge: "Legal",
  description:
    "The terms for using Seiton: your account, your content, plans and billing.",
  shortVersion: [
    "You own your content. We only use it to run Seiton for you.",
    "Free has limits. Pro is billed by Apple and you can cancel any time in the App Store.",
    "Get consent before you record other people.",
  ],
  sections: [
    {
      id: "agreement",
      number: "01",
      title: "The agreement",
      blocks: [
        { type: "paragraph", content: [
          "These terms are a contract between you and ",
          { placeholder: "companyName" },
          " for the Seiton iPhone app and related services. By creating an account or using Seiton you agree to them and to our Privacy Policy. If you do not agree, do not use Seiton.",
        ] },
      ],
    },
    {
      id: "account",
      number: "02",
      title: "Your account",
      blocks: [
        { type: "paragraph", content: [
          "You sign in with a 6-digit code sent to your email. You are responsible for your email account and for everything done through your Seiton account. Tell us at once if you think someone else has access. You must be at least ",
          { placeholder: "minimumAge" },
          " to use Seiton.",
        ] },
      ],
    },
    {
      id: "content",
      number: "03",
      title: "Your content",
      blocks: [
        { type: "paragraph", content: [
          "You own what you put into Seiton, including projects, tasks, notes and recordings. You give us a limited licence to store, process and display it, only so we can run Seiton for you. You are responsible for your content and for having the right to use it.",
        ] },
        { type: "paragraph", content: [
          { strong: "Recordings." },
          " Recording laws differ by place. Tell people, and get their consent, before you record them. That is your responsibility, not ours.",
        ] },
      ],
    },
    {
      id: "use",
      number: "04",
      title: "Using Seiton",
      blocks: [
        { type: "paragraph", content: ["Do not use Seiton to:"] },
        {
          type: "list",
          items: [
            ["break the law, or harass or harm others;"],
            ["record people without a legal basis;"],
            ["upload malware, or probe or disrupt our systems;"],
            ["copy, resell or reverse engineer the app;"],
            ["get around the limits of your plan."],
          ],
        },
      ],
    },
    {
      id: "plans",
      number: "05",
      title: "Plans and billing",
      blocks: [
        {
          type: "table",
          rows: [
            // Plan facts come from siteConfig.pricing (same source as the landing page).
            {
              label: "Free",
              value: [
                `${plan.free.price}. Up to ${plan.free.projectLimit} projects, Apple Calendar sync, and recordings up to ${plan.free.recordingLimitMinutes} minutes.`,
              ],
            },
            {
              label: "Pro",
              value: [
                `Yearly at ${plan.pro.yearlyPrice} (shown as ${plan.pro.monthlyEquivalent} a month) with a ${plan.pro.trialDays}-day free trial, or monthly at ${plan.pro.monthlyPrice}. Unlimited projects, recordings up to ${plan.pro.recordingLimitMinutes} minutes, and transcripts when they launch.`,
              ],
            },
            { label: "Billing", value: [
              "Charged by Apple through your Apple ID. Subscriptions renew automatically unless you cancel at least 24 hours before the period ends.",
            ] },
            { label: "Cancel", value: ["From your App Store subscriptions. You keep Pro until the end of the period you paid for."] },
            { label: "Refunds", value: ["Requests go through Apple."] },
            { label: "Prices", value: ["In USD. Local prices and taxes can differ. ", { placeholder: "priceChangeNotice" }] },
          ],
        },
      ],
    },
    {
      id: "limits",
      number: "06",
      title: "Free plan limits",
      blocks: [
        { type: "paragraph", content: [
          "When you reach a free limit, nothing is deleted. You can archive a project to make room, or upgrade to Pro.",
        ] },
      ],
    },
    {
      id: "availability",
      number: "07",
      title: "Changes and availability",
      blocks: [
        { type: "paragraph", content: [
          "We work to keep Seiton available, but we do not promise it will always be uninterrupted or error-free. We may change or remove features, with notice where we can. Transcripts are planned and may change before they launch.",
        ] },
      ],
    },
    {
      id: "rights",
      number: "08",
      title: "Our rights",
      blocks: [
        { type: "paragraph", content: [
          "Seiton, including its design, name and code, belongs to ",
          { placeholder: "companyName" },
          " or its licensors. We give you a personal, non-exclusive, non-transferable licence to use the app on your Apple devices.",
        ] },
      ],
    },
    {
      id: "ending",
      number: "09",
      title: "Ending these terms",
      blocks: [
        { type: "paragraph", content: [
          "You can stop using Seiton at any time and ",
          { placeholder: "deletionPath", label: "DESCRIBE ACCOUNT DELETION" },
          ". We may suspend or close accounts that break these terms. When an account closes, your right to use Seiton ends.",
        ] },
      ],
    },
    {
      id: "disclaimers",
      number: "10",
      title: "Disclaimers",
      blocks: [
        { type: "paragraph", content: [
          "Seiton is provided \"as is\". To the extent the law allows, we disclaim all warranties, including fitness for a particular purpose. Seiton is a productivity tool and does not give legal, medical or clinical advice.",
        ] },
        { type: "paragraph", content: [
          "If you work with regulated information, such as health records, check that Seiton meets your legal obligations before you store it. ",
          { placeholder: "regulatedDataPosition" },
        ] },
      ],
    },
    {
      id: "liability",
      number: "11",
      title: "Limit of liability",
      blocks: [
        { type: "paragraph", content: [
          "To the extent the law allows, ",
          { placeholder: "companyName" },
          " is not liable for indirect or consequential losses, or for lost profits or data. Our total liability for any claim is limited to the amount you paid us in the 12 months before the claim, or ",
          { placeholder: "liabilityCap" },
          " if you paid nothing. Nothing here limits liability that the law does not allow us to limit.",
        ] },
      ],
    },
    {
      id: "apple",
      number: "12",
      title: "Apple",
      blocks: [
        { type: "paragraph", content: [
          "These terms are between you and us, not Apple. Apple has no obligation to provide support or maintenance for Seiton. If the app fails to meet a warranty, you may tell Apple and Apple will refund the purchase price, if any. Apple and its subsidiaries are third-party beneficiaries of these terms and may enforce them against you. ",
          { placeholder: "appleTermsCheck" },
        ] },
      ],
    },
    {
      id: "law",
      number: "13",
      title: "Governing law",
      blocks: [
        { type: "paragraph", content: [
          "These terms are governed by the laws of ",
          { placeholder: "jurisdiction" },
          ". Disputes go to the courts of ",
          { placeholder: "courts" },
          ", unless local consumer law gives you other rights.",
        ] },
      ],
    },
    {
      id: "changes",
      number: "14",
      title: "Changes to these terms",
      blocks: [
        { type: "paragraph", content: [
          "We may update these terms. If a change matters, we will tell you in the app or by email before it starts. If you keep using Seiton after that, you accept the new terms.",
        ] },
      ],
    },
    {
      id: "contact",
      number: "15",
      title: "Contact",
      blocks: [
        { type: "paragraph", content: [
          { placeholder: "companyName" },
          " · ",
          { placeholder: "companyAddress" },
          " · ",
          { placeholder: "supportEmail" },
        ] },
      ],
    },
  ],
};
