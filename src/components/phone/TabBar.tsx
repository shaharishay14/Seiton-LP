import { Icon, type IconKey } from "@/components/ui/Icon";

type Tab = "home" | "tasks" | "calendar" | "profile";

const TABS: { id: Tab; label: string; icon: IconKey }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "tasks", label: "Tasks", icon: "check-square" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "profile", label: "Profile", icon: "user" },
];

function TabItem({ tab, active }: { tab: (typeof TABS)[number]; active: boolean }) {
  return (
    <span
      className={`flex h-13 flex-1 flex-col items-center justify-center gap-1 ${
        active ? "text-ink" : "text-ink-3"
      }`}
    >
      <Icon name={tab.icon} size={22} strokeWidth={active ? 1.7 : 1.5} />
      <span className="text-[10px] font-medium">{tab.label}</span>
    </span>
  );
}

/** Bottom tab bar: Home, Tasks, centre "+" button, Calendar, Profile. */
export function TabBar({ active }: { active: Tab }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-21.5 items-center border-t border-line bg-canvas/86 px-3 pt-1.5 pb-7 backdrop-blur-[16px]">
      {TABS.slice(0, 2).map((t) => (
        <TabItem key={t.id} tab={t} active={t.id === active} />
      ))}
      <span className="flex flex-1 justify-center">
        <span className="flex size-12 items-center justify-center rounded-lg bg-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_6px_16px_-6px_rgba(11,11,15,0.5)]">
          <Icon name="plus" size={22} strokeWidth={2} color="#FFFFFF" />
        </span>
      </span>
      {TABS.slice(2).map((t) => (
        <TabItem key={t.id} tab={t} active={t.id === active} />
      ))}
    </div>
  );
}
