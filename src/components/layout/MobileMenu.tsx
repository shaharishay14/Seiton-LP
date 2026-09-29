"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

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
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-[11px] bg-white/82 shadow-ring backdrop-blur-[14px]"
      >
        {open ? <X size={20} strokeWidth={1.6} aria-hidden="true" /> : <Icon name="menu" size={20} />}
      </button>
      <nav
        id={panelId}
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-(--gutter) top-(--header-h) flex-col rounded-lg bg-white p-1.5 shadow-[0_0_0_1px_var(--color-line),0_20px_40px_-20px_rgba(11,11,15,0.3)] not-[[hidden]]:flex"
      >
        <ul className="flex flex-col">
          {siteConfig.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center rounded-[9px] px-3.5 text-base font-medium text-ink hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
