import Image from "next/image";
import type { ReactNode } from "react";

const bandMask = "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0) 100%)";

type PageHeroProps = {
  badge: string;
  title: string;
  /** Mono line under the title ("Last updated · …" or a short intro). */
  meta: ReactNode;
};

/** 380px hero band for inner pages; slides under the in-flow header. */
export function PageHero({ badge, title, meta }: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-title"
      className="relative -mt-(--header-h) min-h-95 shrink-0 overflow-hidden pb-10"
    >
      <Image
        src="/images/hero-silk-band.webp"
        alt=""
        width={3960}
        height={1084}
        sizes="3960px"
        preload
        className="absolute top-0 left-[calc(50%-1920px)] h-[520px] w-[3960px] max-w-none object-cover"
        style={{ WebkitMaskImage: bandMask, maskImage: bandMask }}
      />
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.7)_60%,rgba(255,255,255,0)_100%)]" />
      <div className="relative z-2 flex flex-col items-start gap-5 px-gutter pt-[calc(var(--header-h)+92px)]">
        <span className="inline-flex h-7.5 items-center gap-2 rounded-sm bg-white/90 px-3 shadow-ring">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="mono-caps text-ink">{badge}</span>
        </span>
        <h1 id="page-title" className="type-page">
          {title}
        </h1>
        <p className="font-mono text-[13px] leading-[18px] text-ink-2">{meta}</p>
      </div>
    </section>
  );
}
