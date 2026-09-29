import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="flex flex-col gap-6 border-t border-line px-gutter pt-10 pb-15 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <Logo size={28} />
        <span className="text-[17px] font-semibold tracking-[-0.035em]">{siteConfig.name}</span>
        <span className="ml-2.5 text-sm text-ink-3">© {siteConfig.copyrightYear}</span>
      </div>
      <nav aria-label="Legal" className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
        {siteConfig.footerLinks.map((link) => (
          <Link key={link.label} href={link.href} className="text-ink-2 hover:text-accent">
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
