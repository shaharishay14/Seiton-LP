import Image from "next/image";
import { heroContent, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneFrame, phoneTilt } from "@/components/phone/PhoneFrame";
import { HomeScreen } from "@/components/phone/screens/HomeScreen";
import { ProjectScreen } from "@/components/phone/screens/ProjectScreen";
import { RecordingScreen } from "@/components/phone/screens/RecordingScreen";
import { UpNextCard } from "@/components/phone/cards/UpNextCard";
import { RecordingChip } from "@/components/phone/cards/RecordingChip";

const bandMask = "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0) 100%)";

/**
 * The phone composition lives on a 1440 × 547 stage (the part of the 1180px
 * desktop hero below the text column). `.hero-stage` in globals.css scales it
 * to the viewport; the section clips whatever falls outside.
 */
function HeroStage() {
  return (
    <div className="hero-stage pointer-events-none relative select-none" aria-hidden="true" inert>
      <div className="absolute top-(--stage-top) left-(--stage-left) h-[547px] w-[1440px] origin-(--stage-origin) [transform:scale(var(--s))]">
        <PhoneFrame
          size="side"
          className="absolute z-1 max-sm:hidden"
          style={{ left: 250, top: 87, ...phoneTilt(10, -7) }}
        >
          <ProjectScreen />
        </PhoneFrame>
        <PhoneFrame
          size="side"
          className="absolute z-1 max-sm:hidden"
          style={{ left: 774, top: 87, ...phoneTilt(-10, 7) }}
        >
          <RecordingScreen />
        </PhoneFrame>
        <PhoneFrame size="center" className="absolute z-2" style={{ left: 492, top: 37 }}>
          <HomeScreen />
        </PhoneFrame>
        <div
          className="float-shadow absolute z-3 w-[260px] origin-top-left max-sm:hidden"
          style={{ left: 1010, top: 247, transform: "rotate(5deg) scale(1.12)" }}
        >
          <RecordingChip />
        </div>
        <div
          className="float-shadow absolute z-3 w-[342px] origin-top-left max-sm:hidden"
          style={{ left: 150, top: 357, transform: "rotate(-4deg) scale(1.12)" }}
        >
          <UpNextCard />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-4 h-[calc(180px*var(--s))] bg-linear-to-b from-white/0 to-white to-90% max-sm:h-35 max-sm:to-100%" />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden @container">
      <Image
        src="/images/hero-silk-band.webp"
        alt=""
        width={3960}
        height={1084}
        sizes="3960px"
        preload
        className="absolute top-0 left-[calc(50%-1920px)] h-[900px] w-[3960px] max-w-none object-cover max-sm:left-[calc(50%-755px)] max-sm:h-[560px] max-sm:w-[1500px]"
        style={{ WebkitMaskImage: bandMask, maskImage: bandMask }}
      />
      <div className="absolute inset-x-0 top-0 h-[520px] max-sm:h-[380px] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.7)_60%,rgba(255,255,255,0)_100%)]" />

      <div className="relative z-2 flex flex-col items-center gap-5.5 px-gutter pt-26 text-center sm:gap-6.5 sm:pt-37.5">
        <span className="inline-flex min-h-7.5 items-center gap-2 rounded-sm bg-white/90 px-3 shadow-ring">
          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
          <span className="mono-caps text-ink">{heroContent.badge}</span>
        </span>
        <h1 id="hero-title" className="type-hero max-w-250">
          {heroContent.titleLines[0]}
          <br />
          {heroContent.titleLines[1]}
        </h1>
        <p className="type-lead max-w-155 text-ink-2">{heroContent.lead}</p>
        <div className="mt-1 flex w-full flex-col gap-2.5 sm:mt-1.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          <ButtonLink href={siteConfig.appStoreUrl} arrow>
            {heroContent.primaryCta}
          </ButtonLink>
          <ButtonLink href={heroContent.secondaryCta.href} variant="secondary">
            {heroContent.secondaryCta.label}
          </ButtonLink>
        </div>
        <span className="text-sm text-ink-2">{heroContent.microcopy}</span>
      </div>

      <HeroStage />
    </section>
  );
}
