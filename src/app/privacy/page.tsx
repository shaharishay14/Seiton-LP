import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { privacy } from "@/content/privacy";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy — Seiton",
  description: privacy.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalLayout doc={privacy} />;
}
