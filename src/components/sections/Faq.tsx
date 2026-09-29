import Link from "next/link";
import { faq, siteConfig } from "@/config/site";
import { FaqSection } from "@/components/ui/FaqSection";

export function Faq() {
  return (
    <FaqSection
      eyebrow={faq.eyebrow}
      title={faq.title}
      group="faq"
      items={faq.items}
      className="section-y"
      intro={
        <>
          {faq.contactPrompt}{" "}
          <Link href={siteConfig.contactUrl} className="text-ink underline underline-offset-3 hover:text-accent">
            {faq.contactLabel}
          </Link>
          .
        </>
      }
    />
  );
}
