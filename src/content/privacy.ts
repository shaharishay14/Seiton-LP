import type { LegalDocument } from "./types";

/**
 * Privacy Policy. Copied verbatim from design/privacy.html.
 * DRAFT: must be reviewed by a lawyer before launch.
 * Unknown facts are placeholder keys from config/legal.ts; never write literal values here.
 */
export const privacy: LegalDocument = {
  title: "Privacy Policy",
  badge: "Legal",
  description:
    "How Seiton collects, uses and protects your information, and the choices you have.",
  shortVersion: [
    "Your projects, tasks, notes and recordings belong to you and stay in your account.",
    "We use your email to sign you in with a code. There is no password.",
    "Calendar, microphone and notification access are only used to do what you ask, and you can turn each off in iPhone Settings.",
    "We do not sell your personal information.",
  ],
  sections: [
    {
      id: "who",
      number: "01",
      title: "Who we are",
      blocks: [
        { type: "paragraph", content: [
          "Seiton is an iPhone app that keeps each client's tasks, meetings, notes and recordings in their own project. It is run by ",
          { placeholder: "companyName" },
          " (\"we\", \"us\"). This policy explains what we collect, why we collect it, and the choices you have. Questions go to ",
          { placeholder: "privacyEmail" },
          ".",
        ] },
      ],
    },
    {
      id: "collect",
      number: "02",
      title: "What we collect",
      blocks: [
        {
          type: "table",
          rows: [
            { label: "Account", value: [
              "Your email address, the name you choose, and an optional profile photo or texture. We use your email to send sign-in codes.",
            ] },
            { label: "Your content", value: [
              "Projects, tasks, meetings, notes, tags, checklists and audio recordings you create in Seiton. Transcripts too, once they launch.",
            ] },
            { label: "Calendar", value: [
              "If you allow access, Seiton adds the meetings you create to the calendar you choose in Profile, and shows calendar events next to your tasks.",
            ] },
            { label: "Microphone", value: ["Used only while you record. Recordings are saved to the project you record in."] },
            { label: "Notifications", value: ["Reminders for tasks and meetings, if you turn them on."] },
            { label: "Purchases", value: [
              "Subscriptions are handled by Apple. We receive your plan status, not your card or payment details.",
            ] },
            { label: "Device and usage", value: [{ placeholder: "analyticsNote" }] },
          ],
        },
      ],
    },
    {
      id: "use",
      number: "03",
      title: "How we use it",
      blocks: [
        { type: "paragraph", content: ["We use your information to:"] },
        {
          type: "list",
          items: [
            ["run Seiton, and keep your projects, calendar and reminders in step;"],
            ["send sign-in codes and essential messages about your account;"],
            ["apply the limits of your plan;"],
            ["answer your support requests;"],
            ["keep Seiton secure and fix problems."],
          ],
        },
        { type: "paragraph", content: [
          "We do not sell your personal information, and we do not use your notes or recordings to show you ads.",
        ] },
      ],
    },
    {
      id: "recordings",
      number: "04",
      title: "Recordings and transcripts",
      blocks: [
        { type: "paragraph", content: [
          "A recording is audio you capture inside a project. It is stored with that project and is visible only to your account. When transcripts launch, audio will be processed by ",
          { placeholder: "transcriptionProvider" },
          " to produce text.",
        ] },
        { type: "paragraph", content: [
          "Please get consent from the people you record. Recording laws differ by country and state, and following them is your responsibility.",
        ] },
      ],
    },
    {
      id: "share",
      number: "05",
      title: "Who we share it with",
      blocks: [
        { type: "paragraph", content: [
          "We share data only with providers that help us run Seiton, under agreements that limit how they can use it:",
        ] },
        {
          type: "list",
          items: [
            ["Hosting and storage: ", { placeholder: "hostingProvider" }],
            ["Email delivery for sign-in codes: ", { placeholder: "emailProvider" }],
            ["Apple, for the App Store, subscriptions and the Calendar on your device"],
          ],
        },
        { type: "paragraph", content: [
          "We may also disclose information when the law requires it, or to protect the rights and safety of our users.",
        ] },
      ],
    },
    {
      id: "where",
      number: "06",
      title: "Where it is stored",
      blocks: [
        { type: "paragraph", content: [
          "Your data is stored on servers in ",
          { placeholder: "dataRegion" },
          ". If you use Seiton from another country, your data is transferred there. ",
          { placeholder: "transferSafeguards" },
        ] },
      ],
    },
    {
      id: "keep",
      number: "07",
      title: "How long we keep it",
      blocks: [
        { type: "paragraph", content: [
          "We keep your data for as long as your account is open. To close your account and erase your data, ",
          { placeholder: "deletionPath" },
          ". Backups are cleared within ",
          { placeholder: "backupPeriod" },
          ".",
        ] },
      ],
    },
    {
      id: "rights",
      number: "08",
      title: "Your choices and rights",
      blocks: [
        { type: "paragraph", content: [
          "Depending on where you live, you may have the right to access, correct, export or delete your personal information, and to object to or restrict some uses of it. You can also:",
        ] },
        {
          type: "list",
          items: [
            ["change your name or photo in Profile;"],
            ["turn Calendar, Microphone or Notifications on or off in iPhone Settings;"],
            ["cancel Pro from your App Store subscriptions."],
          ],
        },
        { type: "paragraph", content: [
          "To use a right, write to ",
          { placeholder: "privacyEmail" },
          ". We reply within ",
          { placeholder: "responsePeriod" },
          ".",
        ] },
      ],
    },
    {
      id: "security",
      number: "09",
      title: "Security",
      blocks: [
        { type: "paragraph", content: [
          "We protect data in transit with encryption and limit who can reach it. ",
          { placeholder: "encryptionNote" },
        ] },
        { type: "paragraph", content: [
          "No system is perfectly secure. Keep your email account safe: anyone who can read your sign-in codes can sign in as you.",
        ] },
      ],
    },
    {
      id: "children",
      number: "10",
      title: "Children",
      blocks: [
        { type: "paragraph", content: [
          "Seiton is not directed to children under ",
          { placeholder: "minimumAge" },
          ". We do not knowingly collect their information. If you think a child has given us data, write to us and we will delete it.",
        ] },
      ],
    },
    {
      id: "changes",
      number: "11",
      title: "Changes to this policy",
      blocks: [
        { type: "paragraph", content: [
          "If we change this policy in a way that matters, we will tell you in the app or by email before it takes effect. The date at the top shows the latest version.",
        ] },
      ],
    },
    {
      id: "contact",
      number: "12",
      title: "Contact",
      blocks: [
        { type: "paragraph", content: [
          { placeholder: "companyName" },
          " · ",
          { placeholder: "companyAddress" },
          " · ",
          { placeholder: "privacyEmail" },
        ] },
      ],
    },
  ],
};
