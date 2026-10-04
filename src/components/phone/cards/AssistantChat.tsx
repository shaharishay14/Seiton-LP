import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

const MOVES = [
  { title: "Review SSO logs", project: "Acme Corp" },
  { title: "Prepare kickoff agenda", project: "Northwind" },
  { title: "Send staging URL", project: "Globex" },
];

/**
 * Assistant exchange: the user's request, Seiton's reply and the approval
 * card listing the tasks it wants to move. 460px wide (640 panel coordinates).
 */
export function AssistantChat() {
  return (
    <div className="flex w-[460px] flex-col gap-4">
      <div className="max-w-[330px] self-end rounded-[18px_18px_4px_18px] bg-ink px-4.5 py-[13px] text-[17px] leading-6 text-white">
        Push tomorrow&apos;s tasks to Friday
      </div>
      <div className="flex flex-col gap-3">
        <span className="flex items-center gap-2">
          <Logo size={28} />
          <span className="mono-caps [--mono-size:12px] text-ink">Seiton</span>
        </span>
        <p className="text-[17px] leading-[25px]">
          3 tasks are due tomorrow, across 3 projects. Move them all to Friday?
        </p>
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_var(--color-line),0_18px_36px_-22px_rgba(11,11,15,0.35)]">
          <div className="flex h-11 items-center justify-between border-b border-line px-4.5">
            <span className="mono-caps [--mono-size:12px] text-ink">Move to Fri 25 Sep</span>
            <span className="flex h-5.5 items-center rounded-xs bg-accent-soft px-2">
              <span className="mono-caps mono-10 text-accent-ink">Needs approval</span>
            </span>
          </div>
          {MOVES.map((move) => (
            <div key={move.title} className="flex h-16 items-center gap-3 border-b border-line px-4.5 last:border-b-0">
              <span className="flex grow flex-col gap-1">
                <span className="text-base font-medium tracking-[-0.015em]">{move.title}</span>
                <span className="mono-caps leading-3 text-ink-3">{move.project}</span>
              </span>
              <span className="mono-caps text-ink-3 line-through">Thu 24</span>
              <Icon name="arrow-right" size={14} strokeWidth={1.8} className="text-ink-3" />
              <span className="mono-caps text-accent-ink">Fri 25</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2.5">
          <span className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-ink text-base font-medium text-white">
            <span className="size-2 rounded-full bg-live" />
            Move 3 tasks
          </span>
          <span className="flex h-12 flex-1 items-center justify-center rounded-md bg-white text-base font-medium shadow-ring-strong">
            Cancel
          </span>
        </div>
      </div>
    </div>
  );
}

/** "Ask Seiton to do something" input pinned to the bottom of the panel. */
export function AssistantInput() {
  return (
    <div className="flex h-13.5 items-center rounded-xl bg-white px-4.5 text-base text-ink-3 shadow-[0_0_0_1px_var(--color-line-strong),0_14px_30px_-14px_rgba(11,11,15,0.4)]">
      Ask Seiton to do something
    </div>
  );
}
