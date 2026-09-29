import Image from "next/image";
import { closingCta, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";

export function ClosingCta() {
  return (
    <section aria-label="Get Seiton" className="px-gutter pt-25 pb-20">
      <div className="relative flex min-h-115 flex-col items-center justify-center gap-6 overflow-hidden rounded-[36px] px-6 py-16 text-center">
        <Image
          src="/images/hero-silk-band.webp"
          alt=""
          width={3960}
          height={1084}
          sizes="3960px"
          className="absolute -top-50 left-[calc(50%-2000px)] h-[1084px] w-[3960px] max-w-none object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.75)_45%,rgba(255,255,255,0.15)_100%)]" />
        <Image
          src="/images/logo.webp"
          alt=""
          width={96}
          height={96}
          sizes="96px"
          className="relative size-24 object-contain drop-shadow-[0_12px_18px_rgba(40,30,90,0.25)]"
        />
        <h2 className="type-closing relative text-balance">{closingCta.title}</h2>
        <p className="relative text-[19px] text-ink-2">{closingCta.body}</p>
        <div className="relative">
          <ButtonLink href={siteConfig.appStoreUrl} arrow>
            {closingCta.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
