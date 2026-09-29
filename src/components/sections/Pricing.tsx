import { pricing } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingPlans } from "./PricingPlans";

export function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing" className="flex flex-col items-center gap-10 px-gutter pt-20 pb-15 lg:pt-30">
      <SectionHeader eyebrow={pricing.eyebrow} title={pricing.title} />
      <PricingPlans />
      <p className="text-center text-sm text-ink-2">{pricing.footnote}</p>
    </section>
  );
}
