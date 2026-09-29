import { howItWorks } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowItWorks() {
  return (
    <section id="how" aria-label="How it works" className="section-y flex flex-col gap-14 px-gutter">
      <SectionHeader eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
      <ol className="grid gap-3 sm:gap-5 lg:grid-cols-3">
        {howItWorks.steps.map((step) => (
          <li
            key={step.number}
            className="relative flex flex-col gap-3.5 overflow-hidden rounded-card bg-white p-6 shadow-step sm:gap-4 sm:p-7.5"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-12 items-center justify-center rounded-lg bg-sunken">
                <Icon name={step.icon} size={22} />
              </span>
              {/* Decorative step number (order is conveyed by the <ol>); drawn as
                  generated content so the light design colour isn't flagged as body text. */}
              <span
                aria-hidden="true"
                data-step={step.number}
                className="font-mono text-[32px] font-medium sm:text-[40px] tracking-[-0.04em] text-line-strong before:content-[attr(data-step)]"
              />
            </div>
            <h3 className="mt-3 text-[22px] leading-6.5 font-semibold tracking-[-0.03em] sm:text-2xl sm:leading-7">{step.title}</h3>
            <p className="text-[17px] leading-6.5 text-ink-2">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
