import type { CSSProperties, ReactNode } from "react";
import { AppScreen } from "../AppScreen";
import { TabBar } from "../TabBar";
import { PriorityBadge } from "../parts";

const DAYS: { day: string; date: number; dot?: "live" | "accent"; selected?: boolean }[] = [
  { day: "Mon", date: 21 },
  { day: "Tue", date: 22 },
  { day: "Wed", date: 23, dot: "live", selected: true },
  { day: "Thu", date: 24, dot: "accent" },
  { day: "Fri", date: 25, dot: "accent" },
  { day: "Sat", date: 26 },
  { day: "Sun", date: 27 },
];

const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

function Event({
  title,
  meta,
  badge,
  className,
  style,
}: {
  title: string;
  meta: string;
  badge?: ReactNode;
  className: string;
  style: CSSProperties;
}) {
  return (
    <span className={`absolute right-0 left-12 flex flex-col rounded-[10px] px-3 py-2 ${className}`} style={style}>
      <span className="flex items-center justify-between gap-1.5">
        <span className="text-sm font-semibold tracking-[-0.01em]">{title}</span>
        {badge}
      </span>
      <span className="font-mono text-[10px] tracking-[0.04em] uppercase opacity-85">{meta}</span>
    </span>
  );
}

function MeetingBadge({ tone }: { tone: "light" | "live" }) {
  return (
    <span
      className={`inline-flex h-5 shrink-0 items-center rounded-[5px] px-1.5 ${tone === "live" ? "bg-live" : "bg-white"}`}
    >
      <span className={`mono-caps mono-9 ${tone === "live" ? "text-ink" : "text-accent-ink"}`}>Meeting</span>
    </span>
  );
}

/** Calendar day view: week 39, Wednesday 23 selected, now-line at 10:40. */
export function CalendarScreen() {
  return (
    <AppScreen>
      <div className="flex items-end justify-between px-6 pt-14">
        <div className="flex flex-col gap-1.5">
          <span className="mono-caps text-ink-3">2026 · Week 39</span>
          <span className="text-[28px] leading-8 font-semibold tracking-[-0.04em]">September</span>
        </div>
        <div className="flex h-9 gap-[3px] rounded-[10px] bg-sunken p-[3px]">
          <span className="flex items-center rounded-[7px] bg-white px-3 text-[13px] font-medium shadow-ring">Day</span>
          <span className="flex items-center rounded-[7px] px-3 text-[13px] font-medium text-ink-2">Month</span>
        </div>
      </div>

      <div className="mx-4 mt-4.5 flex gap-0.5">
        {DAYS.map((d) => (
          <span
            key={d.day}
            className={`flex h-14.5 flex-1 flex-col items-center justify-center gap-[3px] rounded-md ${
              d.selected ? "bg-ink text-white" : "text-ink"
            }`}
          >
            <span
              className={`font-mono text-[10px] tracking-[0.04em] uppercase ${d.selected ? "text-white/70" : "text-ink-3"}`}
            >
              {d.day}
            </span>
            <span className="text-[17px] font-semibold">{d.date}</span>
            {d.dot ? (
              <span className={`size-1 rounded-[2px] ${d.dot === "live" ? "bg-live" : "bg-accent"}`} />
            ) : (
              <span className="h-1" />
            )}
          </span>
        ))}
      </div>

      <div className="relative mx-6 mt-6.5 h-110">
        {HOURS.map((h, i) => (
          <div key={h} className="absolute inset-x-0 flex items-start gap-2.5" style={{ top: i * 60 }}>
            <span className="-mt-1.5 w-9.5 font-mono text-[10px] text-ink-3">{h}</span>
            <div className="h-px grow bg-line" />
          </div>
        ))}

        <Event
          title="Weekly sync"
          meta="Acme Corp · 60 min"
          badge={<MeetingBadge tone="light" />}
          className="gap-[3px] bg-accent-soft text-accent-ink shadow-[inset_0_0_0_1px_rgba(10,108,255,0.25)]"
          style={{ top: 62, height: 56 }}
        />
        <div className="absolute right-0 left-11 z-2 flex items-center" style={{ top: 159 }}>
          <span className="-ml-1 size-2 rounded-full bg-accent" />
          <div className="h-[1.5px] grow bg-accent" />
          <span className="absolute -top-2 -left-11.5 rounded-[4px] bg-accent px-1 py-0.5 font-mono text-[10px] text-white">
            10:40
          </span>
        </div>
        <Event
          title="Send integration spec"
          meta="Task · due 11:00"
          badge={<PriorityBadge priority="High" />}
          className="justify-center gap-px bg-white text-ink shadow-[0_0_0_1px_var(--color-line-strong)]"
          style={{ top: 182, height: 40 }}
        />
        <Event
          title="Dentist"
          meta="Apple Calendar · 45 min"
          className="gap-[3px] bg-[repeating-linear-gradient(135deg,#F2F2F4_0_6px,#FFFFFF_6px_12px)] text-ink-2 shadow-ring-inset"
          style={{ top: 242, height: 41 }}
        />
        <Event
          title="Northwind kickoff"
          meta="Northwind · 90 min"
          badge={<MeetingBadge tone="live" />}
          className="gap-[3px] bg-ink text-white"
          style={{ top: 332, height: 86 }}
        />
      </div>
      <TabBar active="calendar" />
    </AppScreen>
  );
}
