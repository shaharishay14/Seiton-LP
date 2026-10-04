import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/sections/PageHero";
import { ContactAside } from "@/components/support/ContactAside";
import { SupportForm } from "@/components/support/SupportForm";
import { TopicGrid } from "@/components/support/TopicGrid";
import { FaqSection } from "@/components/ui/FaqSection";
import { RichText } from "@/components/ui/RichText";
import { support } from "@/content/support";
import { supportFaq } from "@/content/support-faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Support — Seiton",
  description: support.description,
  path: "/support",
});

export default function SupportPage() {
  return (
    <InnerPage>
      <PageHero badge={support.badge} title={support.title} meta={support.intro} />
      <section
        aria-label="Contact"
        className="grid gap-5 px-gutter pt-8 pb-16 sm:pb-25 min-[1100px]:grid-cols-[minmax(0,1fr)_440px]"
      >
        <SupportForm />
        <ContactAside />
      </section>
      <TopicGrid />
      <FaqSection
        eyebrow={support.faq.eyebrow}
        title={support.faq.title}
        group="support-faq"
        className="pb-16 sm:pb-25"
        items={supportFaq.map((item) => ({ q: item.q, a: <RichText content={item.a} /> }))}
        intro={
          <>
            {support.faq.prompt}{" "}
            <a href="#contact" className="text-ink underline underline-offset-3 hover:text-accent">
              {support.faq.link}
            </a>
            .
          </>
        }
      />
    </InnerPage>
  );
}
