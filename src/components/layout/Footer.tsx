import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`footer-y flex items-center border-t border-line px-gutter ${className}`}>
      <div className="flex items-center gap-2.5">
        <Logo size={28} />
        <span className="text-[17px] font-semibold tracking-[-0.035em]">{siteConfig.name}</span>
        <span className="ml-2.5 text-sm text-ink-3">© {siteConfig.copyrightHolder} {siteConfig.copyrightYear}</span>
      </div>
    </footer>
  );
}
