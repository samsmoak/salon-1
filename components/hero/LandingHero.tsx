"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HERO_SLIDES, HOURS_PILL, STUDIO } from "@/lib/constants";

const SLIDE_DURATION = 6000;

export function LandingHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      data-section="dark"
      className="relative h-[100svh] min-h-[700px] w-full overflow-hidden bg-[var(--color-bg)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide deck — full bleed, ken burns crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          {HERO_SLIDES.map((slide, i) =>
            i === active ? (
              <motion.div
                key={`${slide.image}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="ken-burns absolute inset-0 will-change-transform">
                  <Image
                    src={slide.image}
                    alt={slide.label}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
        {/* gradient veil — velvet, not void */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,8,5,0.55)] via-[rgba(10,8,5,0.45)] to-[rgba(10,8,5,0.92)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,8,5,0.7)] via-[rgba(10,8,5,0.15)] to-transparent" />
      </div>

      {/* Top frame — badge + hours pill */}
      <div className="absolute inset-x-0 top-0 z-10 pt-28">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]"
          >
            {STUDIO.name} — Est. {STUDIO.established}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="rounded-full border border-[var(--color-border-dark)] bg-[rgba(10,8,5,0.55)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-light)] backdrop-blur-md"
          >
            {HOURS_PILL}
          </motion.span>
        </div>
      </div>

      {/* Main composition */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-start justify-end px-6 pb-32 md:px-10 md:pb-40">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[64px] font-light leading-[0.95] tracking-tight text-[var(--color-text-light)] md:text-[96px] lg:text-[120px]"
        >
          Your hair.
          <br />
          <span className="italic text-[var(--color-gold)]">Reimagined.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-8 max-w-md font-display text-lg italic text-[var(--color-text-light-muted)] md:text-xl"
        >
          {STUDIO.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/book"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-light)]"
          >
            Book Now
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-dark)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-light)] transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            Our Services
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* Card deck — bottom right thumbs with progress */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 px-6 md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="h-[1px] w-10 bg-[var(--color-gold)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-light-muted)]">
                {String(HERO_SLIDES.length).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-3 font-display text-2xl italic text-[var(--color-text-light)]">
              {HERO_SLIDES[active].label}
            </p>
          </div>

          <div className="pointer-events-auto hidden gap-3 md:flex">
            {HERO_SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.image}
                  onClick={() => setActive(i)}
                  className={`group relative h-24 w-32 overflow-hidden rounded-sm transition-all ${
                    isActive ? "ring-1 ring-[var(--color-gold)] opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View slide ${s.label}`}
                >
                  <Image
                    src={s.image}
                    alt={s.label}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[rgba(10,8,5,0.3)]" />
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[rgba(255,255,255,0.15)]">
                    {isActive && !paused && (
                      <motion.div
                        key={`p-${active}`}
                        className="h-full bg-[var(--color-gold)]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                      />
                    )}
                  </div>
                  <span className="absolute left-2 top-2 font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--color-text-light)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom hairline gold */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
    </section>
  );
}
