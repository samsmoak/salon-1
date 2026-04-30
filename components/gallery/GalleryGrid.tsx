"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "@/lib/constants";

function TiltImage({
  src,
  alt,
  onClick,
  className,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 22 });
  const sy = useSpring(y, { stiffness: 250, damping: 22 });
  const rotX = useTransform(sy, [-1, 1], [4, -4]);
  const rotY = useTransform(sx, [-1, 1], [-4, 4]);

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
      className={`group relative overflow-hidden ${className ?? ""}`}
      data-cursor="image"
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, 50vw"
        className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 ring-0 ring-[var(--color-gold)] transition-all duration-500 group-hover:ring-1" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,5,0.7)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.button>
  );
}

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = filter === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((g) => g.category === filter);

  function close() {
    setActive(null);
  }
  function next() {
    setActive((a) => (a === null ? 0 : (a + 1) % filtered.length));
  }
  function prev() {
    setActive((a) => (a === null ? 0 : (a - 1 + filtered.length) % filtered.length));
  }

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-6">
        {GALLERY_CATEGORIES.map((c) => {
          const on = c === filter;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className="relative font-mono text-[11px] uppercase tracking-[0.3em]"
              style={{ color: on ? "var(--color-gold)" : "var(--color-text-light-muted)" }}
            >
              {c}
              {on && (
                <motion.span
                  layoutId="galFilter"
                  className="absolute -bottom-1.5 left-0 right-0 h-px bg-[var(--color-gold)]"
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="grid auto-rows-[280px] grid-cols-2 gap-4 md:auto-rows-[360px] md:grid-cols-3 md:gap-6"
      >
        <AnimatePresence>
          {filtered.map((img, i) => {
            const span = i % 5 === 0;
            return (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={span ? "row-span-2" : ""}
              >
                <TiltImage
                  src={img.src}
                  alt={img.alt}
                  onClick={() => setActive(i)}
                  className="h-full w-full"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active !== null && filtered[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(10,8,5,0.96)] p-4 md:p-12"
            onClick={close}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 z-10 rounded-full border border-[var(--color-gold)] p-3 text-[var(--color-gold)] md:right-8 md:top-8"
            >
              <X size={18} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 z-10 rounded-full border border-[var(--color-gold)] p-3 text-[var(--color-gold)] md:left-8"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 z-10 rounded-full border border-[var(--color-gold)] p-3 text-[var(--color-gold)] md:right-8"
            >
              <ChevronRight size={20} />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[active].src}
                alt={filtered[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[rgba(10,8,5,0.85)] to-transparent p-6 pt-16">
                <span className="rounded-full border border-[var(--color-gold)] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                  {filtered[active].category}
                </span>
                <Link
                  href="/book"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-bg)]"
                >
                  Book This Look
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
