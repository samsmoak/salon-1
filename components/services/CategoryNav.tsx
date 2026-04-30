"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export function CategoryNav() {
  const [active, setActive] = useState<string>(SERVICE_CATEGORIES[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible[0]) {
          const id = visible[0].target.getAttribute("data-category");
          if (id) setActive(id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    SERVICE_CATEGORIES.forEach((c) => {
      const el = document.querySelector(`[data-category="${c}"]`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-20 z-30 -mx-6 mb-12 border-y border-[var(--color-border-dark)] bg-[rgba(10,8,5,0.92)] backdrop-blur-md md:-mx-10">
      <div className="scroll-track mx-auto flex max-w-[1280px] gap-8 overflow-x-auto px-6 py-5 md:px-10">
        {SERVICE_CATEGORIES.map((c) => {
          const isActive = active === c;
          return (
            <a
              key={c}
              href={`#${c}`}
              className="relative shrink-0 font-mono text-[11px] uppercase tracking-[0.3em]"
              style={{ color: isActive ? "var(--color-gold)" : "var(--color-text-light-muted)" }}
            >
              {c}
              {isActive && (
                <motion.span
                  layoutId="catUnderline"
                  className="absolute -bottom-1.5 left-0 right-0 h-px bg-[var(--color-gold)]"
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
