import { AppScreen } from "../AppScreen";
import { TabBar } from "../TabBar";
import { Texture, TextureSwatch, maskStyle, masks } from "../Texture";
import { BackButton, Checkbox, MeetingActions, PriorityBadge, SquareIconButton, type Priority } from "../parts";

const SECTIONS = [
  { label: "Tasks", count: 4 },
  { label: "Meetings", count: 2 },
  { label: "Notes", count: 5 },
  { label: "Audio", count: 3 },
];

const TASKS: { title: string; due: string; dueSoon?: boolean; priority?: Priority; done?: boolean }[] = [
  { title: "Send integration spec", due: "Today, 16:00", dueSoon: true, priority: "High" },
  { title: "Review SSO logs", due: "Tomorrow, 10:00", priority: "Medium" },
  { title: "Prepare demo data", due: "Fri 26 Sep", priority: "Low" },
  { title: "Update API tokens", due: "Done yesterday", done: true },
];

/** Project screen: "Acme Corp" with next meeting and tasks. */
export function ProjectScreen() {
  return (
    <AppScreen>
      <Texture
        name="azure"
        sizes="900px"
        className="pointer-events-none absolute top-0 left-0 h-[250px] w-[390px]"
        style={maskStyle(masks.fadeDown)}
      />
      <div className="relative flex items-center justify-between px-6 pt-14">
        <BackButton />
        <SquareIconButton icon="more" />
      </div>
      <div className="relative mx-6 mt-27 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <TextureSwatch name="azure" size={18} radius={5} />
          <span className="mono-caps text-ink-2">12 items</span>
        </div>
        <span className="text-[34px] leading-[38px] font-semibold tracking-[-0.045em]">Acme Corp</span>
      </div>

      <div className="relative mx-6 mt-5 flex flex-col gap-3 rounded-lg bg-white p-3.5 shadow-card">
        <div className="flex items-center justify-between">
          <span className="mono-caps text-ink">Next meeting</span>
          <span className="mono-caps text-ink-3">In Calendar</span>
        </div>
        <div className="flex flex-col gap-[3px]">
          <span className="text-[17px] font-semibold tracking-[-0.025em]">Weekly sync</span>
          <span className="mono-caps mono-10 text-accent-ink">Today · 16:00 – 17:00</span>
        </div>
        <MeetingActions height={40} />
      </div>

      <div className="mx-6 mt-5 flex h-10 gap-[3px] rounded-[11px] bg-sunken p-[3px]">
        {SECTIONS.map((s, i) => (
          <span
            key={s.label}
            className={`flex flex-1 items-center justify-center gap-1.25 rounded-sm text-[13px] font-medium ${
              i === 0 ? "bg-white text-ink shadow-segment" : "text-ink-2"
            }`}
          >
            {s.label}
            <span className="font-mono text-[10px] text-ink-3">{s.count}</span>
          </span>
        ))}
      </div>

      <div className="mx-6 mt-3 overflow-hidden rounded-lg bg-white shadow-card">
        {TASKS.map((t, i) => (
          <div
            key={t.title}
            className={`flex h-15 items-center gap-3 px-3.5 ${i > 0 ? "border-t border-line" : ""}`}
          >
            <Checkbox done={!!t.done} />
            <span className="flex min-w-0 grow flex-col gap-[3px]">
              <span
                className={`text-[15px] font-medium tracking-[-0.015em] ${t.done ? "text-ink-3 line-through" : ""}`}
              >
                {t.title}
              </span>
              <span className={`mono-caps mono-10 ${t.dueSoon ? "text-accent-ink" : "text-ink-3"}`}>{t.due}</span>
            </span>
            {t.priority && <PriorityBadge priority={t.priority} />}
          </div>
        ))}
      </div>
      <TabBar active="home" />
    </AppScreen>
  );
}
