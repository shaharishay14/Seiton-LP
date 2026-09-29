import { Checkbox, PriorityBadge } from "../parts";

/** Completed high-priority task row, floating over the Notes panel. */
export function TaskCard() {
  return (
    <div className="flex h-16.5 w-[342px] items-center gap-3 rounded-lg bg-white px-3.5 shadow-ring">
      <Checkbox done />
      <div className="flex grow flex-col gap-[3px]">
        <span className="text-[15px] font-medium tracking-[-0.015em]">Send integration spec</span>
        <span className="mono-caps mono-10 text-accent-ink">Today, 16:00</span>
      </div>
      <PriorityBadge priority="High" />
    </div>
  );
}
