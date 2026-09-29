import { pricing } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingPlans } from "./PricingPlans";

export function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing" className="section-y flex flex-col items-center gap-10 px-gutter">
      <SectionHeader eyebrow={pricing.eyebrow} title={pricing.title} />
      <PricingPlans />
      <p className="text-center text-sm leading-5 text-ink-2 sm:leading-normal">{pricing.footnote}</p>
    </section>
  );
}
