import { howItWorks } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowItWorks() {
  return (
    <section id="how" aria-label="How it works" className="flex flex-col gap-14 px-gutter pt-20 pb-15 lg:pt-30">
      <SectionHeader eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
      <ol className="grid gap-5 lg:grid-cols-3">
        {howItWorks.steps.map((step) => (
          <li
            key={step.number}
            className="relative flex flex-col gap-4 overflow-hidden rounded-card bg-white p-7.5 shadow-step"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-12 items-center justify-center rounded-lg bg-sunken">
                <Icon name={step.icon} size={22} />
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-[40px] font-medium tracking-[-0.04em] text-line-strong"
              >
                {step.number}
              </span>
            </div>
            <h3 className="mt-3 text-2xl leading-7 font-semibold tracking-[-0.03em]">{step.title}</h3>
            <p className="text-[17px] leading-6.5 text-ink-2">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
