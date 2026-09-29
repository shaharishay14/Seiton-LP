import { audience } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

export function WhoItsFor() {
  return (
    <section aria-label="Who it's for" className="audience-y flex flex-col items-center gap-5 px-gutter text-center sm:gap-5.5">
      <h2 className="mono-caps text-ink-2">{audience.label}</h2>
      <ul className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {audience.items.map((item) => (
          <li
            key={item.label}
            className="flex h-11 items-center gap-2.5 rounded-md bg-white px-4 text-base font-medium shadow-ring sm:h-12 sm:px-5 sm:text-[17px]"
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
