import type { ReactNode } from "react";
import { Icon } from "./Icon";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "lg" | "nav";
  arrow?: boolean;
  className?: string;
};

const base =
  "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap";

const sizes = {
  lg: "h-13 gap-2.5 rounded-md px-6 text-base tracking-[-0.01em]",
  nav: "h-11 gap-2 rounded-[11px] px-4.5 text-sm",
} as const;

const variants = {
  primary: "bg-ink text-white shadow-button",
  secondary: "bg-surface text-ink shadow-ring-strong",
} as const;

/** Link styled as a button (every CTA on the page is an in-page or external link). */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "lg",
  arrow = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <a href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      {arrow && <Icon name="arrow-right" size={size === "lg" ? 18 : 16} />}
    </a>
  );
}
