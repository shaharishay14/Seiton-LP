import Image from "next/image";

/**
 * Logo mark. Decorative image; the wordmark next to it carries the name.
 * `size` sets the intrinsic size; pass `className` with size utilities to
 * make the rendered size responsive.
 */
export function Logo({ size = 38, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo.webp"
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`shrink-0 object-contain ${className ?? ""}`}
      style={className ? undefined : { width: size, height: size }}
    />
  );
}
