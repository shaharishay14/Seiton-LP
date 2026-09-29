import type { Block, LegalDocument, LegalSection } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";

function ShortVersion({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] bg-canvas p-7 shadow-ring">
      <h2 className="eyebrow">The short version</h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[17px] leading-6.5 text-ink">
            <span className="mt-px flex size-5.5 shrink-0 items-center justify-center rounded-[7px] bg-ink">
              <Icon name="check" size={13} strokeWidth={2.6} color="#FFFFFF" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[17px] leading-7 text-ink-2">
          <RichText content={block.content} />
        </p>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3.5 text-[17px] leading-7 text-ink-2">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-[2px] bg-ink" />
              <span>
                <RichText content={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <dl className="flex flex-col overflow-hidden rounded-lg shadow-ring">
          {block.rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid gap-x-6 gap-y-1 px-5.5 py-4.5 sm:grid-cols-[170px_minmax(0,1fr)] ${i > 0 ? "border-t border-line" : ""}`}
            >
              <dt className="font-mono text-xs leading-5 font-medium tracking-[0.06em] text-ink uppercase">
                {row.label}
              </dt>
              <dd className="text-base leading-6 text-ink-2">
                <RichText content={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

function Section({ section }: { section: LegalSection }) {
  const titleId = `${section.id}-title`;
  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="flex scroll-mt-6 flex-col gap-4 border-t border-line pt-10"
    >
      <div className="flex items-baseline gap-3.5">
        <span className="font-mono text-sm text-ink-3">{section.number}</span>
        <h2 id={titleId} className="type-legal-h2">
          {section.title}
        </h2>
      </div>
      {section.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </section>
  );
}

export function LegalArticle({ doc }: { doc: LegalDocument }) {
  return (
    <article className="flex max-w-190 min-w-0 flex-col gap-10">
      <ShortVersion items={doc.shortVersion} />
      {doc.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </article>
  );
}
