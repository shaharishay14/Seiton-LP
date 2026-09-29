import { Icon, type IconKey } from "@/components/ui/Icon";
import { Texture, maskStyle, masks, type TextureName } from "./Texture";

export type FolderData = {
  name: string;
  count: number;
  texture: TextureName;
  status: string;
  /** Upcoming sync: blue status with a live dot. */
  live?: boolean;
  /** Tasks, notes, recordings. */
  counts: [number, number, number];
};

const COUNTER_ICONS: IconKey[] = ["check-square", "file", "mic"];

/**
 * Project folder card: neutral folder with a white front. The project texture
 * blends into the front at 42% and fades out toward the counts.
 */
export function ProjectFolder({
  folder,
  animated = false,
}: {
  folder: FolderData;
  animated?: boolean;
}) {
  return (
    <span
      className={`relative block h-44 w-[158px] shrink-0 drop-shadow-[0_14px_16px_rgba(11,11,15,0.12)] ${
        animated ? "animate-rise" : ""
      }`}
    >
      {/* Folder tab and back */}
      <span className="absolute top-0 left-0 block h-7 w-17.5 rounded-[10px_12px_0_0] bg-folder" />
      <span className="absolute inset-x-0 top-4.5 bottom-0 block rounded-[4px_16px_16px_16px] bg-folder shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]" />
      <span className="absolute top-1.25 left-2 flex h-4.5 items-center rounded-[5px] bg-white px-1.5 font-mono text-[10px] font-medium text-ink">
        {folder.count}
      </span>
      {/* Two sheets of paper peeking out */}
      <span className="absolute top-8 left-3.5 flex h-15 w-[118px] -rotate-4 flex-col gap-1.5 rounded-sm bg-white px-3 py-2.5 shadow-[0_0_0_1px_var(--color-line),0_2px_6px_rgba(11,11,15,0.05)]">
        <span className="block h-1 w-[44%] rounded-[1px] bg-line-strong" />
        <span className="block h-[3px] w-[76%] rounded-[1px] bg-line" />
        <span className="block h-[3px] w-[60%] rounded-[1px] bg-line" />
      </span>
      <span className="absolute top-7 left-6.5 block h-15 w-[118px] rotate-3 rounded-sm bg-white shadow-[0_0_0_1px_var(--color-line),0_2px_6px_rgba(11,11,15,0.05)]" />
      {/* Front */}
      <span className="absolute inset-x-0 top-15.5 bottom-0 block overflow-hidden rounded-lg bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(11,11,15,0.06)]">
        <Texture
          name={folder.texture}
          sizes="320px"
          className="absolute inset-0 size-full opacity-42"
          style={maskStyle(masks.folder)}
        />
        <span className="absolute inset-0 flex flex-col justify-between px-3 pt-3 pb-2.75">
          <span className="flex flex-col gap-1">
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-ink">{folder.name}</span>
            <span className="flex items-center gap-1.5">
              {folder.live && (
                <span className={`size-1.5 shrink-0 rounded-full bg-accent ${animated ? "animate-blink" : ""}`} />
              )}
              <span
                className={`font-mono text-[10px] leading-[13px] font-medium tracking-[0.05em] whitespace-nowrap uppercase ${
                  folder.live ? "text-accent-ink" : "text-ink-2"
                }`}
              >
                {folder.status}
              </span>
            </span>
          </span>
          <span className="flex gap-2.5">
            {folder.counts.map((n, i) => (
              <span key={i} className="flex items-center gap-1 font-mono text-[11px] text-ink-2">
                <Icon name={COUNTER_ICONS[i]} size={13} strokeWidth={1.8} />
                {n}
              </span>
            ))}
          </span>
        </span>
      </span>
    </span>
  );
}

/** Dashed "New project" tile that ends the folder rows. */
export function NewProjectTile({ width = 120 }: { width?: number }) {
  return (
    <span
      className="relative flex h-44 shrink-0 flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-line-strong text-ink-2"
      style={{ width }}
    >
      <span className="flex size-9 items-center justify-center rounded-[10px] bg-white text-ink shadow-ring">
        <Icon name="plus" size={18} />
      </span>
      <span className="text-[13px] font-medium">New project</span>
    </span>
  );
}

export const FOLDERS: FolderData[] = [
  { name: "Acme Corp", count: 12, texture: "azure", status: "Sync today · 16:00", live: true, counts: [4, 5, 3] },
  { name: "Northwind", count: 8, texture: "lilac", status: "Kickoff tomorrow", counts: [2, 4, 1] },
  { name: "Globex", count: 21, texture: "coral", status: "Launch in 3 days", counts: [9, 8, 4] },
  { name: "Studio rebrand", count: 6, texture: "lime", status: "3 tasks", counts: [3, 2, 1] },
  { name: "Dana · therapy", count: 14, texture: "iris", status: "Session Thu · 10:00", counts: [1, 11, 2] },
];
