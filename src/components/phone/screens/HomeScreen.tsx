import { PlayIcon } from "@/components/ui/Icon";
import { AppScreen } from "../AppScreen";
import { NewProjectTile, ProjectFolder, FOLDERS } from "../ProjectFolder";
import { TabBar } from "../TabBar";
import { Texture, maskStyle, masks } from "../Texture";
import { WaveBars } from "../WaveBars";
import { Checkbox, PriorityBadge } from "../parts";
import { UpNextCard } from "../cards/UpNextCard";

const FILTERS = ["All", "Notes", "Voice", "Tasks"];
const VOICE_NOTE = [6, 22, 23, 11, 9, 6, 10, 6, 19, 26, 15, 15, 24, 16, 6, 7, 11, 10, 13, 25];
const CHECKLIST = [
  { label: "Review API keys", done: true },
  { label: "Send staging URL" },
  { label: "Book demo call" },
  { label: "Update invoice" },
];

/** Home: greeting, Up next, pinned project folders and recent items. */
export function HomeScreen() {
  return (
    <AppScreen>
      <div className="flex items-end justify-between px-6 pt-14">
        <div className="flex flex-col gap-1.5">
          <span className="mono-caps text-ink-3">Wed · 23 Sep</span>
          <span className="text-[28px] leading-8 font-semibold tracking-[-0.04em]">Good morning, Shahar</span>
        </div>
      </div>

      <UpNextCard className="mx-6 mt-5" />

      <div className="mx-6 mt-6 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[17px] font-semibold tracking-[-0.02em]">My projects</span>
          <span className="mono-caps mono-10 text-ink-3">Hold a folder to pin it to Home</span>
        </div>
        <span className="text-[13px] font-medium text-ink-2">See all</span>
      </div>
      <div className="flex items-end gap-3.5 overflow-hidden px-6 pt-3.5 pb-5">
        {FOLDERS.slice(0, 3).map((f) => (
          <ProjectFolder key={f.name} folder={f} />
        ))}
        <NewProjectTile />
      </div>

      <div className="mx-6 mt-1 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[17px] font-semibold tracking-[-0.02em]">Recent</span>
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map((f, i) => (
            <span
              key={f}
              className={`flex h-7.5 items-center rounded-sm px-3 text-[13px] font-medium ${
                i === 0 ? "bg-ink text-white" : "bg-white text-ink-2 shadow-ring-inset"
              }`}
            >
              {f}
            </span>
          ))}
        </div>
        <div className="flex items-start gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-col gap-3.5 rounded-lg bg-live p-3.5 shadow-[0_0_0_1px_rgba(11,11,15,0.06)]">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold tracking-[-0.02em] text-ink">Voice note</span>
                <span className="font-mono text-[11px] text-ink">12:40</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex size-7.5 shrink-0 items-center justify-center rounded-sm bg-ink">
                  <PlayIcon size={12} />
                </span>
                <WaveBars
                  heights={VOICE_NOTE}
                  color="#0B0B0F"
                  activeCount={9}
                  mutedColor="rgba(11,11,15,0.28)"
                  radius={1}
                  className="h-7.5 gap-0.5 overflow-hidden"
                />
              </div>
              <span className="mono-caps mono-10 text-ink">Acme Corp · Weekly sync</span>
            </div>

            <div className="flex flex-col gap-2.5 rounded-lg bg-white p-3.5 shadow-card">
              <span className="mono-caps mono-10 text-ink-3">Globex · Today</span>
              <span className="-mt-1 text-[15px] font-semibold tracking-[-0.02em]">Launch checklist</span>
              {CHECKLIST.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <Checkbox done={!!item.done} size={16} />
                  <span className={`text-[13px] ${item.done ? "text-ink-3 line-through" : "text-ink"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
              <div className="mt-0.5 flex items-center gap-2">
                <span className="block h-0.5 grow bg-line">
                  <span className="block h-full w-1/5 bg-ink" />
                </span>
                <span className="font-mono text-[11px] text-ink-2">1/5</span>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-card">
              <Texture
                name="lilac"
                sizes="400px"
                className="block h-14 w-full"
                style={maskStyle(masks.noteHeader)}
              />
              <div className="-mt-2 flex flex-col gap-2 px-3.5 pb-3.5">
                <span className="mono-caps mono-10 text-ink-3">Northwind · Note</span>
                <span className="text-[15px] font-semibold tracking-[-0.02em]">Workshop notes</span>
                <span className="text-[13px] leading-[19px] text-ink-2">
                  Team wants weekly exports and a shared dashboard. Follow up on data retention before Friday.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 rounded-lg bg-white p-3.5 shadow-card">
              <div className="flex gap-1">
                <PriorityBadge priority="Medium" />
              </div>
              <span className="text-[15px] font-semibold tracking-[-0.02em]">Review SSO logs</span>
              <span className="mono-caps mono-10 text-ink-3">Acme Corp · Tomorrow, 10:00</span>
            </div>
          </div>
        </div>
      </div>
      <TabBar active="home" />
    </AppScreen>
  );
}
