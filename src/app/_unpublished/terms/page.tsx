import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { terms } from "@/content/terms";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use — Seiton",
  description: terms.description,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalLayout doc={terms} />;
}
