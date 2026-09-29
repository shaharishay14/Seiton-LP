type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  id?: string;
  align?: "center" | "start";
};

/** Mono eyebrow + section h2 (How it works, Pricing, FAQ). */
export function SectionHeader({ eyebrow, title, id, align = "center" }: SectionHeaderProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";
  return (
    <div className={`flex flex-col gap-4.5 ${alignment}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="type-section text-balance">
        {title}
      </h2>
    </div>
  );
}
