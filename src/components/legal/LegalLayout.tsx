import type { LegalDocument } from "@/content/types";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/sections/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { LegalArticle } from "./LegalArticle";
import { LegalToc } from "./LegalToc";

/** Privacy and Terms (SPEC §12.2): hero, "On this page" + article. */
export function LegalLayout({ doc }: { doc: LegalDocument }) {
  return (
    <InnerPage>
      <PageHero
        badge={doc.badge}
        title={doc.title}
        meta={
          <>
            Last updated · <Placeholder name="lastUpdated" plain />
          </>
        }
      />
      <div className="grid gap-8 px-gutter pt-8 pb-20 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 lg:pb-30 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-20">
        <LegalToc items={doc.sections.map(({ id, number, title }) => ({ id, number, title }))} />
        <LegalArticle doc={doc} />
      </div>
    </InnerPage>
  );
}
