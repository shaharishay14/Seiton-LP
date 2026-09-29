import { ChevronRight } from "lucide-react";
import { Icon, PlayIcon, type IconKey } from "@/components/ui/Icon";
import { AppScreen } from "../AppScreen";
import { TextureSwatch } from "../Texture";
import { BackButton, SquareIconButton, Tag } from "../parts";

const QUICK_ACTIONS: { label: string; icon: IconKey }[] = [
  { label: "Remind", icon: "bell" },
  { label: "Tags", icon: "tag" },
  { label: "Share", icon: "share" },
];

function ToolButton({ icon, active = false }: { icon: IconKey; active?: boolean }) {
  return (
    <span className={`flex size-9.5 items-center justify-center rounded-[9px] ${active ? "bg-ink" : ""}`}>
      <Icon name={icon} size={18} color={active ? "#FFFFFF" : "#0B0B0F"} />
    </span>
  );
}

/** Note editor: "Onboarding plan for Acme." with formatting toolbar. */
export function NoteScreen() {
  return (
    <AppScreen background="white">
      <div className="flex items-center gap-2 px-5 pt-14">
        <BackButton />
        <div className="grow" />
        <SquareIconButton icon="undo" />
        <SquareIconButton icon="redo" />
        <SquareIconButton icon="pin" />
        <SquareIconButton icon="more" />
      </div>

      <div className="flex flex-col gap-4 px-6 pt-6">
        <div className="flex items-center gap-2">
          <TextureSwatch name="azure" size={16} radius={4} />
          <span className="mono-caps text-ink-2">Acme Corp · Note</span>
          <span className="mono-caps text-ink-3">· Edited 2 min ago</span>
        </div>
        <span className="text-[28px] leading-8 font-semibold tracking-[-0.04em]">Onboarding plan for Acme.</span>
        <div className="flex flex-col gap-2.5 text-[15px] leading-[23px] text-ink">
          <div className="flex gap-2.5">
            <span className="pt-px font-mono text-xs text-ink-3">01</span>
            <span>Map their current deploy flow and pain points with the platform team.</span>
          </div>
          <div className="flex gap-2.5">
            <span className="pt-px font-mono text-xs text-ink-3">02</span>
            <span>
              Set up <span className="rounded-[3px] bg-live px-[3px] py-px">SSO and a sandbox workspace</span> before
              Thursday.
            </span>
          </div>
          <div className="flex gap-2.5">
            <span className="pt-px font-mono text-xs text-ink-3">03</span>
            <span>Run a 45-minute training for the support leads.</span>
          </div>
        </div>
        <span className="mt-1.5 text-lg leading-6 font-semibold tracking-[-0.025em]">Open questions</span>
        <p className="text-[15px] leading-[23px]">
          Who owns the data retention policy on their side?
          <span className="ml-0.5 inline-block h-4.5 w-0.5 animate-[caret_1.1s_steps(1)_infinite] bg-accent align-[-3px]" />
        </p>
        <div className="flex gap-1.5">
          <Tag>#onboarding</Tag>
          <Tag>#q4</Tag>
        </div>
        <div className="flex items-center gap-3 rounded-md bg-live p-3">
          <span className="flex size-8.5 items-center justify-center rounded-[9px] bg-ink">
            <PlayIcon size={12} />
          </span>
          <div className="flex grow flex-col gap-0.5">
            <span className="text-sm font-semibold">Weekly sync recording</span>
            <span className="mono-caps mono-10 text-ink">12:40 · Transcript ready</span>
          </div>
          <ChevronRight size={16} strokeWidth={1.6} aria-hidden="true" />
        </div>
      </div>

      <div className="absolute inset-x-3 bottom-7.5 flex flex-col gap-2">
        <div className="flex gap-1.5 px-1">
          {QUICK_ACTIONS.map((a) => (
            <span
              key={a.label}
              className="flex h-7.5 items-center gap-1.5 rounded-sm bg-white px-2.5 text-xs font-medium shadow-ring"
            >
              <Icon name={a.icon} size={14} />
              {a.label}
            </span>
          ))}
        </div>
        <div className="flex h-13.5 items-center gap-0.5 rounded-xl bg-white/92 px-2 shadow-[0_0_0_1px_var(--color-line),0_16px_32px_-16px_rgba(11,11,15,0.35)] backdrop-blur-[16px]">
          <ToolButton icon="heading" />
          <ToolButton icon="bold" active />
          <ToolButton icon="italic" />
          <ToolButton icon="underline" />
          <div className="mx-1 h-5.5 w-px bg-line" />
          <ToolButton icon="list" />
          <ToolButton icon="check-square" />
          <div className="grow" />
          <span className="flex size-10 items-center justify-center rounded-[11px] bg-live">
            <Icon name="mic" size={18} strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </AppScreen>
  );
}
