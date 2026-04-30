"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, STUDIO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Detect if a [data-section='light'] is intersecting near the top of the viewport
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section='light']");
    if (sections.length === 0) {
      setLight(false);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        const navHeight = 80;
        const intersecting = entries.some((e) => {
          const rect = e.boundingClientRect;
          return rect.top <= navHeight && rect.bottom >= navHeight;
        });
        setLight(intersecting);
      },
      { rootMargin: "-80px 0px -90% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [pathname]);

  const textColor = light ? "text-[var(--color-text-dark)]" : "text-[var(--color-text-light)]";
  const bg = scrolled
    ? light
      ? "bg-[rgba(245,240,232,0.94)] backdrop-blur-md border-b border-[var(--color-border-light)]"
      : "bg-[rgba(10,8,5,0.92)] backdrop-blur-md border-b border-[var(--color-border-dark)]"
    : "bg-transparent";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-colors duration-500",
          bg,
        )}
      >
        <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10">
          <Link href="/" className={cn("font-display text-[22px] font-normal", textColor)}>
            {STUDIO.shortName}
            <span className="text-[var(--color-gold)]">.</span>
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-[0.25em] transition-opacity hover:opacity-100",
                      textColor,
                      active ? "opacity-100" : "opacity-70",
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-[var(--color-gold)]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="hidden rounded-full bg-[var(--color-gold)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-light)] md:inline-flex"
            >
              Book Now
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className={cn("md:hidden", textColor)}
            >
              <div className="flex flex-col gap-1.5">
                <span className="block h-px w-6 bg-current" />
                <span className="block h-px w-6 bg-current" />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-[var(--color-bg)] md:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <Link href="/" className="font-display text-[22px] text-[var(--color-text-light)]">
                {STUDIO.shortName}
                <span className="text-[var(--color-gold)]">.</span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-[var(--color-text-light)]"
              >
                <div className="relative h-6 w-6">
                  <span className="absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 -rotate-45 bg-current" />
                </div>
              </button>
            </div>
            <ul className="flex flex-col px-6 pt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6 }}
                  className="border-b border-[var(--color-border-dark)]"
                >
                  <Link
                    href={link.href}
                    className="block py-6 font-display text-5xl italic text-[var(--color-text-light)]"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="pt-10"
              >
                <Link
                  href="/book"
                  className="inline-block rounded-full bg-[var(--color-gold)] px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-bg)]"
                >
                  Book Now
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
