import { Icon } from "./Icon";

/** Feature bullets: 22×22 ink square with a white check, then 17/24 text. */
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-3 sm:gap-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base leading-[23px] text-ink sm:text-[17px] sm:leading-6">
          <span className="mt-px flex size-5.5 shrink-0 items-center justify-center rounded-[7px] bg-ink">
            <Icon name="check" size={13} strokeWidth={2.6} color="#FFFFFF" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
