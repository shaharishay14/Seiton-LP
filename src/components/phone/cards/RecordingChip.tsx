import { WaveBars } from "../WaveBars";

const CHIP_BARS = [8, 20, 26, 25, 18, 9, 11, 11, 8, 11, 10, 12, 20, 26, 25, 16, 11, 22, 27, 23, 15, 8, 12, 10, 9, 12];

/** Small dark recording chip: live dot, project, timer, lime waveform. */
export function RecordingChip() {
  return (
    <div className="flex w-[260px] flex-col gap-3 rounded-[18px] bg-ink p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="size-2 animate-halo rounded-full bg-live" />
          <span className="mono-caps mono-10 text-white">Recording</span>
        </span>
        <span className="mono-caps mono-10 text-white/70">Acme Corp</span>
      </div>
      <span className="font-mono text-[40px] leading-[42px] font-medium tracking-[-0.04em] text-white">04:12</span>
      <WaveBars heights={CHIP_BARS} color="#C8F03C" animated className="h-7.5 justify-between" />
    </div>
  );
}
