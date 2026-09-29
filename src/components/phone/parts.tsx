import type { ReactNode } from "react";
import { Icon, type IconKey } from "@/components/ui/Icon";

/** Small shared pieces of the app UI. All render as non-interactive elements. */

export type Priority = "High" | "Medium" | "Low";

const PRIORITY = {
  High: "bg-danger-soft text-danger",
  Medium: "bg-accent-soft text-accent-ink",
  Low: "bg-sunken text-ink-2",
} as const;

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`inline-flex h-5 shrink-0 items-center rounded-[5px] px-1.5 ${PRIORITY[priority]}`}>
      <span className="mono-caps mono-9">{priority}</span>
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 shrink-0 items-center rounded-[5px] bg-sunken px-1.5">
      <span className="mono-caps mono-10 text-ink-2">{children}</span>
    </span>
  );
}

export function Checkbox({ done, size = 22 }: { done: boolean; size?: 16 | 22 }) {
  const small = size === 16;
  return done ? (
    <span
      className={`flex shrink-0 items-center justify-center bg-ink ${small ? "size-4 rounded-[5px]" : "size-5.5 rounded-[7px]"}`}
    >
      <Icon name="check" size={small ? 11 : 13} strokeWidth={2.6} color="#FFFFFF" />
    </span>
  ) : (
    <span
      className={`block shrink-0 shadow-[inset_0_0_0_1.5px_var(--color-line-strong)] ${small ? "size-4 rounded-[5px]" : "size-5.5 rounded-[7px]"}`}
    />
  );
}

export function BackButton() {
  return (
    <span className="-ml-2.5 flex size-11 shrink-0 items-center justify-center">
      <span className="flex rotate-180">
        <Icon name="arrow-right" size={22} strokeWidth={1.9} />
      </span>
    </span>
  );
}

export function SquareIconButton({ icon }: { icon: IconKey }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-ring-inset">
      <Icon name={icon} size={18} />
    </span>
  );
}

/** "Record" + "Take notes" pair on meeting cards. */
export function MeetingActions({ height }: { height: 40 | 42 }) {
  const h = height === 40 ? "h-10" : "h-10.5";
  return (
    <div className="relative flex gap-2">
      <span
        className={`flex ${h} flex-1 items-center justify-center gap-2 rounded-[10px] bg-ink text-sm font-medium text-white`}
      >
        <span className="size-2 rounded-full bg-live" />
        Record
      </span>
      <span
        className={`flex ${h} flex-1 items-center justify-center gap-2 rounded-[10px] bg-white text-sm font-medium shadow-ring-strong`}
      >
        <Icon name="file" size={16} />
        Take notes
      </span>
    </div>
  );
}
