import type { CSSProperties, ReactNode } from "react";

/**
 * iPhone bezel. Screens are authored at 390 × 844 and scaled into the frame
 * with `transform: scale()`, so the same screen component renders at every
 * phone size on the page.
 */
const FRAMES = {
  /** Hero left/right phones. */
  side: { width: 415, height: 878, pad: 9, radius: 57, screenRadius: 47, scale: 1.02, island: [11, 122, 34] },
  /** Hero centre phone. */
  center: { width: 456, height: 965, pad: 10, radius: 62, screenRadius: 52, scale: 1.12, island: [12, 134, 38] },
  /** Phones inside the 640 × 640 feature panels. */
  feature: { width: 296, height: 623, pad: 8, radius: 40, screenRadius: 33, scale: 0.72, island: [7, 86, 24] },
} as const;

export type PhoneSize = keyof typeof FRAMES;

type PhoneFrameProps = {
  size: PhoneSize;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function PhoneFrame({ size, children, className = "", style }: PhoneFrameProps) {
  const f = FRAMES[size];
  const [islandTop, islandWidth, islandHeight] = f.island;
  return (
    <div className={className} style={{ width: f.width, height: f.height, ...style }}>
      <div className="size-full bg-ink shadow-bezel" style={{ padding: f.pad, borderRadius: f.radius }}>
        <div
          className="relative overflow-hidden bg-canvas"
          style={{
            width: f.width - f.pad * 2,
            height: f.height - f.pad * 2,
            borderRadius: f.screenRadius,
          }}
        >
          <div
            className="absolute top-0 left-0 h-211 w-[390px] origin-top-left"
            style={{ transform: `scale(${f.scale})` }}
          >
            {children}
          </div>
          <div
            className="absolute left-1/2 rounded-full bg-black"
            style={{
              top: islandTop,
              width: islandWidth,
              height: islandHeight,
              marginLeft: -islandWidth / 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** Tilt used by every phone: a slight 3D turn plus an in-plane rotation. */
export const phoneTilt = (rotateY: number, rotate: number): CSSProperties => ({
  transform: `perspective(2600px) rotateY(${rotateY}deg) rotate(${rotate}deg)`,
  transformOrigin: "50% 40%",
});
