import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ComingSoonButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Site header: 84px (64px below 640px).
 * `overlay` (landing page) floats over the hero; `inflow` (inner pages) sits
 * in the document flow and the page hero slides underneath it.
 */
export function Header({ variant = "overlay" }: { variant?: "overlay" | "inflow" }) {
  const position = variant === "overlay" ? "absolute inset-x-0 top-0" : "relative shrink-0";
  return (
    <header
      className={`${position} z-10 flex h-(--header-h) items-center justify-between gap-3 px-gutter`}
    >
      <Link href="/" className="flex items-center gap-2 text-ink sm:gap-2.5" aria-label={`${siteConfig.name} home`}>
        <Logo size={38} className="size-8 sm:size-9.5" />
        <span className="text-xl font-semibold tracking-[-0.04em] sm:text-[22px]">{siteConfig.name}</span>
      </Link>
      <nav
        aria-label="Main"
        className="hidden h-11 items-center gap-1.5 rounded-md bg-white/82 px-1.5 shadow-ring backdrop-blur-[14px] lg:flex"
      >
        {siteConfig.nav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex h-8 items-center rounded-sm px-3.5 text-sm font-medium text-ink hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ComingSoonButton size="nav" className="px-4 sm:px-4.5" />
        <MobileMenu />
      </div>
    </header>
  );
}
