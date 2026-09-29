"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; number: string; title: string };

/**
 * "On this page" navigation. Sticky list at ≥1024px, a horizontally
 * scrollable pill row below. The section in view is highlighted via
 * IntersectionObserver; without JS the first item stays highlighted and the
 * anchors still work.
 */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const update = () => {
      // The active section is the last one whose top has passed 30% of the viewport.
      const line = window.innerHeight * 0.3;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;
      setActive(current);
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: "0px 0px -70% 0px",
      threshold: [0, 1],
    });
    sections.forEach((section) => observer.observe(section));
    // Catches the last sections, whose tops may never reach the 30% line.
    window.addEventListener("scrollend", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", update);
    };
  }, [items]);

  return (
    <nav aria-label="On this page" className="flex min-w-0 flex-col gap-1 lg:sticky lg:top-6 lg:self-start">
      <span className="mono-caps px-2.5 pb-2.5 text-ink-2 max-lg:px-0">On this page</span>
      <ol className="-mx-(--gutter) flex gap-1.5 overflow-x-auto px-(--gutter) pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:p-0">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActive(item.id)}
                className={`flex h-9 items-center gap-2.5 rounded-sm px-2.5 text-sm font-medium whitespace-nowrap text-ink max-lg:shadow-ring-inset ${
                  isActive ? "bg-sunken max-lg:shadow-none" : "hover:text-accent"
                }`}
              >
                {/* #71717A is only AA on white; the active row's grey needs the darker ink. */}
                <span className={`font-mono text-[11px] ${isActive ? "text-ink-2" : "text-ink-3"}`}>{item.number}</span>
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
