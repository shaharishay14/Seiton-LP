"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

/** Menu button + dropdown shown below 1024px, where the nav pill is hidden. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-[11px] bg-white/82 shadow-ring backdrop-blur-[14px]"
      >
        {open ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
      </button>
      <nav
        id={panelId}
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-(--gutter) top-21 rounded-xl bg-white/95 p-1.5 shadow-raised backdrop-blur-[14px]"
      >
        <ul className="flex flex-col">
          {siteConfig.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center rounded-sm px-3.5 text-base font-medium text-ink hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={siteConfig.appStoreUrl}
          onClick={() => setOpen(false)}
          className="mt-1.5 flex h-12 items-center justify-center rounded-md bg-ink text-base font-medium text-white shadow-button"
        >
          Get the app
        </a>
      </nav>
    </div>
  );
}
