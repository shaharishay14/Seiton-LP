import Image from "next/image";

/** Logo mark + optional wordmark. Decorative image; the wordmark carries the name. */
export function Logo({ size = 38, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo.webp"
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
