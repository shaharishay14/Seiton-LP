import { MeetingActions } from "../parts";

/** "Up next" meeting card (Home screen, and floating over the hero). */
export function UpNextCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex flex-col gap-3.5 overflow-hidden rounded-lg bg-white p-4 shadow-raised ${className}`}
    >
      <div
        className="absolute top-0 right-0 h-full w-[150px] bg-[radial-gradient(#D4D4DA_1px,transparent_1.2px)] bg-size-[14px_14px]"
        style={{
          WebkitMaskImage: "linear-gradient(270deg, #000 10%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(270deg, #000 10%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <span className="mono-caps text-ink">Up next</span>
        <span className="flex h-5.5 items-center gap-1.5 rounded-xs bg-accent-soft px-2">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="mono-caps mono-10 text-accent-ink">In 25 min</span>
        </span>
      </div>
      <div className="relative flex flex-col gap-1">
        <span className="text-xl leading-6 font-semibold tracking-[-0.03em]">Weekly sync</span>
        <span className="mono-caps mono-10 text-ink-2">Acme Corp · 16:00 – 17:00 · In Calendar</span>
      </div>
      <MeetingActions height={42} />
    </div>
  );
}
