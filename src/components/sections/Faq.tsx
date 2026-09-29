import Link from "next/link";
import { faq, siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

/** Native <details> accordion; `name` makes it open one item at a time. */
export function Faq() {
  return (
    <section
      id="faq"
      aria-label="Questions"
      className="grid gap-10 px-gutter pt-20 pb-15 lg:pt-30 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-20"
    >
      <div className="flex flex-col gap-4.5">
        <span className="eyebrow">{faq.eyebrow}</span>
        <h2 className="type-section">{faq.title}</h2>
        <p className="text-[17px] leading-6.5 text-ink-2">
          {faq.contactPrompt}{" "}
          <Link href={siteConfig.contactUrl} className="text-ink underline underline-offset-3 hover:text-accent">
            {faq.contactLabel}
          </Link>
          .
        </p>
      </div>
      <div className="flex flex-col">
        {faq.items.map((item, i) => (
          <details
            key={item.q}
            name="faq"
            open={i === 0}
            className="group border-t border-line py-5.5 last:border-b"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-[clamp(18px,16.886px+0.2857vw,21px)] font-semibold tracking-[-0.02em]">
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
