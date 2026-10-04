import Image from "next/image";
import { closingCta } from "@/config/site";
import { ComingSoonButton } from "@/components/ui/Button";

export function ClosingCta() {
  return (
    <section aria-label="Get Seiton" className="closing-y px-gutter">
      <div className="relative flex h-105 flex-col items-center justify-center gap-6 overflow-hidden rounded-plan px-5 text-center sm:h-auto sm:min-h-115 sm:rounded-[36px] sm:px-6 sm:py-16">
        <Image
          src="/images/hero-silk-band.webp"
          alt=""
          width={3960}
          height={1084}
          sizes="3960px"
          className="absolute -top-50 left-[calc(50%-2000px)] h-[1084px] max-sm:-top-70 max-sm:left-[calc(50%-1875px)] w-[3960px] max-w-none object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.75)_45%,rgba(255,255,255,0.15)_100%)]" />
        <Image
          src="/images/logo.webp"
          alt=""
          width={96}
          height={96}
          sizes="96px"
          className="relative size-18 object-contain sm:size-24 drop-shadow-[0_12px_18px_rgba(40,30,90,0.25)]"
        />
        <h2 className="type-closing relative">{closingCta.title}</h2>
        <p className="relative text-[17px] text-ink-2 sm:text-[19px]">{closingCta.body}</p>
        <div className="relative">
          <ComingSoonButton />
        </div>
      </div>
    </section>
  );
}
