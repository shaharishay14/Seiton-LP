import type { CSSProperties } from "react";

type WaveBarsProps = {
  heights: readonly number[];
  color: string;
  /** Bars at index >= `activeCount` use `mutedColor` (played vs. remaining). */
  activeCount?: number;
  mutedColor?: string;
  barWidth?: number;
  radius?: number;
  /** Animate bars with the `pulse` keyframe (off under reduced motion). */
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Audio level bars used by the recording UI and voice-note tiles. */
export function WaveBars({
  heights,
  color,
  activeCount = heights.length,
  mutedColor,
  barWidth = 3,
  radius = 2,
  animated = false,
  className = "",
  style,
}: WaveBarsProps) {
  return (
    <div className={`flex items-center ${className}`} style={style}>
      {heights.map((h, i) => (
        <span
          key={i}
          className={`block shrink-0 ${animated ? "animate-pulse-bar" : ""}`}
          style={{
            width: barWidth,
            height: h,
            borderRadius: radius,
            background: i < activeCount ? color : mutedColor,
            // Deterministic stagger so neighbouring bars never move in sync.
            animationDelay: animated ? `${-((i * 137) % 1100)}ms` : undefined,
            animationDuration: animated ? `${900 + ((i * 53) % 500)}ms` : undefined,
          }}
        />
      ))}
    </div>
  );
}
