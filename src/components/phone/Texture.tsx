import Image from "next/image";
import type { CSSProperties } from "react";

export type TextureName = "azure" | "lilac" | "coral" | "lime" | "iris";

type TextureProps = {
  name: TextureName;
  /** Rendered CSS width hint for the responsive srcset. */
  sizes: string;
  className?: string;
  style?: CSSProperties;
};

/** One of the five 1000×1000 silk textures. Always decorative. */
export function Texture({ name, sizes, className = "", style }: TextureProps) {
  return (
    <Image
      src={`/images/tex-${name}.webp`}
      alt=""
      width={1000}
      height={1000}
      sizes={sizes}
      className={`max-w-none object-cover ${className}`}
      style={style}
    />
  );
}

/** Small rounded texture swatch that identifies a project (e.g. next to "12 items"). */
export function TextureSwatch({
  name,
  size,
  radius,
}: {
  name: TextureName;
  size: number;
  radius: number;
}) {
  return (
    <Texture
      name={name}
      sizes={`${size * 2}px`}
      className="shrink-0 outline-1 -outline-offset-1 outline-ink/8"
      style={{ width: size, height: size, borderRadius: radius }}
    />
  );
}

/** Masks shared by textures across the page. */
export const masks = {
  fadeDown: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0) 100%)",
  fadeUp: "linear-gradient(0deg, #000 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0) 100%)",
  panel: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.15) 100%)",
  folder: "linear-gradient(200deg, #000 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 90%)",
  noteHeader: "linear-gradient(180deg, #000 40%, rgba(0,0,0,0) 100%)",
} as const;

export const maskStyle = (mask: string): CSSProperties => ({
  WebkitMaskImage: mask,
  maskImage: mask,
});
