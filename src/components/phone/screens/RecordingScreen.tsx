import { Icon } from "@/components/ui/Icon";
import { X } from "lucide-react";
import { AppScreen } from "../AppScreen";
import { Texture, TextureSwatch, maskStyle, masks } from "../Texture";
import { WaveBars } from "../WaveBars";
import { BackButton } from "../parts";

const LEVELS = [
  10, 33, 48, 50, 38, 21, 13, 21, 19, 11, 14, 13, 16, 30, 42, 45, 34, 13, 30, 49, 54, 45, 27, 12, 26, 29, 23, 14,
  10, 12, 22, 33, 39, 33, 16, 26, 46, 55, 50, 32,
];

/** Live recording screen: "Maestro weekly", 04:12. */
export function RecordingScreen() {
  return (
    <AppScreen background="white">
      <Texture
        name="lime"
        sizes="900px"
        className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[390px]"
        style={maskStyle(masks.fadeUp)}
      />
      <div className="relative flex items-center justify-between px-6 pt-14">
        <BackButton />
        <div className="flex h-7 items-center gap-1.5 rounded-sm bg-white/85 px-2.5 shadow-ring">
          <TextureSwatch name="azure" size={14} radius={4} />
          <span className="mono-caps text-ink">Acme Corp</span>
        </div>
        <div className="w-10" />
      </div>
      <div className="relative mx-6 mt-6.5 flex flex-col items-center gap-1.5 text-center">
        <span className="text-2xl leading-7 font-semibold tracking-[-0.035em]">Maestro weekly</span>
        <span className="mono-caps text-ink-2">Today&apos;s 16:55 meeting</span>
      </div>

      <div className="absolute inset-x-0 top-[250px] flex flex-col items-center gap-3.5">
        <div className="flex h-7 items-center gap-2 rounded-sm bg-ink px-2.5">
          <span className="size-2 animate-halo rounded-full bg-live" />
          <span className="mono-caps mono-10 text-white">Recording</span>
        </div>
        <span className="font-mono text-[76px] leading-20 font-medium tracking-[-0.04em] text-ink [text-shadow:0_2px_30px_rgba(255,255,255,0.9)]">
          04:12
        </span>
      </div>

      <WaveBars
        heights={LEVELS}
        color="#0B0B0F"
        animated
        className="absolute inset-x-7 top-[420px] h-16 justify-between"
      />

      <div className="absolute inset-x-6 top-[528px] flex flex-col gap-2 rounded-md bg-white/90 px-3.5 py-3 shadow-ring backdrop-blur-[12px]">
        <div className="flex justify-between">
          <span className="mono-caps text-ink-2">Free plan</span>
          <span className="mono-caps text-ink">4:12 of 10:00</span>
        </div>
        <div className="h-[3px] rounded-[2px] bg-line">
          <div className="h-full w-[42%] rounded-[2px] bg-ink" />
        </div>
      </div>

      <div className="absolute inset-x-6 bottom-19 flex items-center justify-between">
        <span className="flex size-14 items-center justify-center rounded-xl bg-white shadow-ring-strong">
          <X size={20} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className="flex h-16 items-center gap-3 rounded-[18px] bg-ink px-6.5 text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_30px_-12px_rgba(11,11,15,0.55)]">
          <span className="size-4 rounded-[4px] bg-live" />
          Stop &amp; save
        </span>
        <span className="flex size-14 items-center justify-center rounded-xl bg-white shadow-ring-strong">
          <Icon name="pause" size={20} strokeWidth={2} />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-7.5 flex justify-center">
        <span className="inline-flex h-7 items-center gap-1.5 rounded-sm bg-white/90 px-2.5 text-xs text-ink-2 shadow-ring">
          <Icon name="lock" size={14} />
          Keeps recording when your phone is locked
        </span>
      </div>
    </AppScreen>
  );
}
