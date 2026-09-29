import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";

/** 84px header, absolutely positioned over the hero. */
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex h-21 items-center justify-between gap-3 px-gutter">
      <a href="#top" className="flex items-center gap-2.5 text-ink" aria-label={`${siteConfig.name} home`}>
        <Logo size={38} />
        <span className="text-[22px] font-semibold tracking-[-0.04em]">{siteConfig.name}</span>
      </a>
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
        <ButtonLink href={siteConfig.appStoreUrl} size="nav" arrow className="max-[399px]:hidden">
          Get the app
        </ButtonLink>
        <MobileMenu />
      </div>
    </header>
  );
}
