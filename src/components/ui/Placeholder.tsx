import { legal, legalLabels, type LegalKey } from "@/config/legal";

type PlaceholderProps = {
  name: LegalKey;
  /** Overrides the bracketed label where the design words it differently. */
  label?: string;
  /** Render the bracketed label as plain text (no blue tag), e.g. in the hero date line. */
  plain?: boolean;
};

/**
 * A fact from config/legal.ts. Set → plain text (emails become mailto links).
 * `null` → the blue bracketed tag from the design, e.g. [COMPANY NAME].
 */
export function Placeholder({ name, label, plain = false }: PlaceholderProps) {
  const value = legal[name];
  if (value !== null) {
    return name.endsWith("Email") ? (
      <a href={`mailto:${value}`} className="text-ink underline underline-offset-3 hover:text-accent">
        {value}
      </a>
    ) : (
      <>{value}</>
    );
  }
  const text = `[${label ?? legalLabels[name]}]`;
  if (plain) return <>{text}</>;
  return (
    <span
      data-placeholder={name}
      className="rounded-[5px] bg-accent-soft px-1.5 py-0.5 font-mono text-[14px] font-normal tracking-normal text-accent-ink [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
    >
      {text}
    </span>
  );
}
