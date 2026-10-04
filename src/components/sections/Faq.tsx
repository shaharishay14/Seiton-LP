import { faq } from "@/config/site";
import { FaqSection } from "@/components/ui/FaqSection";

export function Faq() {
  return <FaqSection eyebrow={faq.eyebrow} title={faq.title} group="faq" items={faq.items} className="section-y" />;
}
