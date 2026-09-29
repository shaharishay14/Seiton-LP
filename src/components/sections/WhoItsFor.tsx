import { audience } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

export function WhoItsFor() {
  return (
    <section aria-label="Who it's for" className="flex flex-col items-center gap-5.5 px-gutter pt-5 pb-25 text-center">
      <h2 className="mono-caps text-ink-2">{audience.label}</h2>
      <ul className="flex flex-wrap justify-center gap-3">
        {audience.items.map((item) => (
          <li
            key={item.label}
            className="flex h-12 items-center gap-2.5 rounded-md bg-white px-5 text-[17px] font-medium shadow-ring"
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
