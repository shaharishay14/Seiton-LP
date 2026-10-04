import type { ReactNode } from "react";
import { Icon } from "./Icon";

export type FaqItem = { q: string; a: ReactNode };

type FaqSectionProps = {
  eyebrow: string;
  title: string;
  /** Optional line under the heading, e.g. "Anything else? Get in touch." */
  intro?: ReactNode;
  items: readonly FaqItem[];
  /** `name` shared by the <details> so only one item is open at a time. */
  group: string;
  className?: string;
};

/**
 * Heading block + native <details> accordion (landing FAQ and Support FAQ).
 * First item open; stacks below 1024px.
 */
export function FaqSection({ eyebrow, title, intro, items, group, className = "" }: FaqSectionProps) {
  return (
    <section
      id="faq"
      aria-label="Questions"
      className={`grid gap-8 px-gutter sm:gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-20 ${className}`}
    >
      <div className="flex flex-col gap-4.5">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="type-section">{title}</h2>
        {intro && <p className="text-[17px] leading-6.5 text-ink-2">{intro}</p>}
      </div>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <details
            key={item.q}
            name={group}
            open={i === 0}
            className="group border-t border-line py-4.5 last:border-b sm:py-5.5"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-[clamp(18px,16.886px+0.2857vw,21px)] leading-6 font-semibold tracking-[-0.02em] sm:leading-[normal]">
              {item.q}
              <Icon
                name="plus"
                size={20}
                className="shrink-0 transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="mt-3.5 max-w-170 text-[17px] leading-[27px] text-ink-2">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
