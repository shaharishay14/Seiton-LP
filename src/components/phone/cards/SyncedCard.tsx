import { Icon } from "@/components/ui/Icon";

/** Calendar event card confirming the Apple Calendar sync. */
export function SyncedCard() {
  return (
    <div className="w-[300px] rounded-xl bg-white p-1.5 shadow-ring">
      <div className="flex flex-col gap-1.5 rounded-md bg-accent-soft px-3.5 py-3 text-accent-ink shadow-[inset_0_0_0_1px_rgba(10,108,255,0.25)]">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold tracking-[-0.02em]">Weekly sync</span>
          <span className="inline-flex items-center gap-[3px]">
            <Icon name="check" size={11} strokeWidth={2.6} color="#14855A" />
            <span className="font-mono text-[9px] font-medium tracking-[0.05em] text-success">SYNCED</span>
          </span>
        </div>
        <span className="mono-caps mono-10 text-accent-ink">Acme Corp · 09:00 – 10:00</span>
        <div className="mt-0.5 flex items-center gap-1.5">
          <Icon name="bell" size={13} strokeWidth={1.8} />
          <span className="text-xs">Apple Calendar · reminder 15 min before</span>
        </div>
      </div>
    </div>
  );
}
