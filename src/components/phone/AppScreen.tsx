import type { ReactNode } from "react";

/** A 390 × 844 app screen (iPhone logical size). */
export function AppScreen({
  children,
  background = "canvas",
}: {
  children: ReactNode;
  background?: "canvas" | "white";
}) {
  return (
    <div
      className={`relative h-211 w-[390px] overflow-hidden font-sans text-ink ${
        background === "white" ? "bg-white" : "bg-canvas"
      }`}
    >
      {children}
    </div>
  );
}
