import type { CSSProperties, ReactNode } from "react";
import type { FeatureId } from "@/config/site";
import { PhoneFrame, phoneTilt } from "@/components/phone/PhoneFrame";
import { NewProjectTile, ProjectFolder, FOLDERS } from "@/components/phone/ProjectFolder";
import { Texture, maskStyle, masks, type TextureName } from "@/components/phone/Texture";
import { RecordingScreen } from "@/components/phone/screens/RecordingScreen";
import { CalendarScreen } from "@/components/phone/screens/CalendarScreen";
import { NoteScreen } from "@/components/phone/screens/NoteScreen";
import { RecordingChip } from "@/components/phone/cards/RecordingChip";
import { SyncedCard } from "@/components/phone/cards/SyncedCard";
import { NoteCard } from "@/components/phone/cards/NoteCard";
import { TaskCard } from "@/components/phone/cards/TaskCard";

/** A card floating above the phone, positioned in 640 × 640 panel coordinates. */
function Floating({ children, style }: { children: ReactNode; style: CSSProperties }) {
  return (
    <div className="float-shadow absolute z-3 origin-top-left" style={style}>
      {children}
    </div>
  );
}

/**
 * 640 × 640 visual panel. The composition is authored at 640 and scaled to
 * the panel's rendered width with CSS (see `scale-to-container`).
 */
function Panel({ texture, children }: { texture: TextureName; children: ReactNode }) {
  return (
    <div className="pointer-events-none relative aspect-square w-full select-none @container" aria-hidden="true" inert>
      {/* Radius and ring live on the scaled stage so they scale with it (0.547 at 390). */}
      <div className="scale-to-container absolute top-0 left-0 size-160 origin-top-left overflow-hidden rounded-panel bg-canvas shadow-ring [--stage-w:640px]">
        <Texture
          name={texture}
          sizes="(min-width: 640px) 640px, 100vw"
          className="absolute inset-0 size-full"
          style={maskStyle(masks.panel)}
        />
        {children}
      </div>
    </div>
  );
}

function ProjectsVisual() {
  return (
    <Panel texture="azure">
      <div className="absolute top-27.5 left-1/2 -ml-62.5 grid scale-102 grid-cols-[repeat(3,158px)] gap-x-3.5 gap-y-4.5">
        {FOLDERS.map((f) => (
          <ProjectFolder key={f.name} folder={f} animated />
        ))}
        <NewProjectTile />
      </div>
    </Panel>
  );
}

function VoiceVisual() {
  return (
    <Panel texture="lime">
      <PhoneFrame size="feature" className="absolute z-1" style={{ left: 190, top: 80, ...phoneTilt(0, -4) }}>
        <RecordingScreen />
      </PhoneFrame>
      <Floating style={{ left: 360, top: 330, width: 260, transform: "rotate(5deg) scale(0.95)" }}>
        <RecordingChip />
      </Floating>
    </Panel>
  );
}

function CalendarVisual() {
  return (
    <Panel texture="lilac">
      <PhoneFrame size="feature" className="absolute z-1" style={{ left: 70, top: 80, ...phoneTilt(0, 4) }}>
        <CalendarScreen />
      </PhoneFrame>
      <Floating style={{ left: 290, top: 250, width: 300, transform: "rotate(-4deg) scale(1.05)" }}>
        <SyncedCard />
      </Floating>
    </Panel>
  );
}

function NotesVisual() {
  return (
    <Panel texture="coral">
      <PhoneFrame size="feature" className="absolute z-1" style={{ left: 190, top: 80, ...phoneTilt(0, -3) }}>
        <NoteScreen />
      </PhoneFrame>
      <Floating style={{ left: 40, top: 380, width: 320, transform: "rotate(-4deg)" }}>
        <NoteCard />
      </Floating>
      <Floating style={{ left: 250, top: 160, width: 342, transform: "rotate(4deg) scale(0.95)" }}>
        <TaskCard />
      </Floating>
    </Panel>
  );
}

export const featureVisuals: Record<FeatureId, () => ReactNode> = {
  projects: ProjectsVisual,
  voice: VoiceVisual,
  calendar: CalendarVisual,
  notes: NotesVisual,
};
