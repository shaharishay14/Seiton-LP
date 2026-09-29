import type { ReactNode } from "react";

/**
 * Stroke icons copied from the design reference (Lucide-style, 24px grid,
 * round caps). Where an exact Lucide equivalent exists (Plus, X,
 * ChevronRight, Menu) the components import it from `lucide-react` instead.
 */
const paths = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  folder: (
    <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
  ),
  "check-square": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  file: (
    <>
      <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20z" />
      <path d="M14 3.5V8h4M9 12.5h6M9 16h4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5h4" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  home: <path d="M4 10.5L12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  more: (
    <>
      <circle cx="6" cy="12" r="1.2" />
      <circle cx="12" cy="12" r="1.2" />
      <circle cx="18" cy="12" r="1.2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  pause: <path d="M8 5v14M16 5v14" />,
  undo: (
    <>
      <path d="M9 7L5 11l4 4" />
      <path d="M5 11h9a5 5 0 0 1 0 10h-2" />
    </>
  ),
  redo: (
    <>
      <path d="M15 7l4 4-4 4" />
      <path d="M19 11h-9a5 5 0 0 0 0 10h2" />
    </>
  ),
  pin: (
    <>
      <path d="M9 4h6l-1 6 3 3H7l3-3z" />
      <path d="M12 13v7" />
    </>
  ),
  tag: (
    <>
      <path d="M4 4h7l9 9-7 7-9-9z" />
      <circle cx="8.5" cy="8.5" r="1.2" />
    </>
  ),
  share: (
    <>
      <path d="M12 4v11M8 8l4-4 4 4" />
      <path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
    </>
  ),
  heading: <path d="M6 5v14M18 5v14M6 12h12" />,
  bold: <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" />,
  italic: <path d="M10 5h8M6 19h8M14 5l-4 14" />,
  underline: <path d="M7 5v6a5 5 0 0 0 10 0V5M5 20h14" />,
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="0.8" />
      <circle cx="4.5" cy="12" r="0.8" />
      <circle cx="4.5" cy="18" r="0.8" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconKey = keyof typeof paths;

type IconProps = {
  name: IconKey;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
};

export function Icon({
  name,
  size = 18,
  strokeWidth = 1.6,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

/** Filled play triangle used on voice-note tiles. */
export function PlayIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 4.5v15l12.5-7.5z" fill="#FFFFFF" />
    </svg>
  );
}
