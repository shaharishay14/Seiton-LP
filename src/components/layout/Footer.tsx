import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="footer-y flex flex-col items-start gap-5 border-t border-line px-gutter sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-center gap-2.5">
        <Logo size={28} />
        <span className="text-[17px] font-semibold tracking-[-0.035em]">{siteConfig.name}</span>
        <span className="ml-2.5 text-sm text-ink-3">© {siteConfig.copyrightYear}</span>
      </div>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 text-sm sm:gap-x-7">
        {siteConfig.footerLinks.map((link) => (
          <Link key={link.label} href={link.href} className="inline-flex min-h-11 items-center text-ink-2 hover:text-accent sm:min-h-0">
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
