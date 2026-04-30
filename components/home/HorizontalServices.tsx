"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

const cards = [
  {
    title: "The Cut",
    image:
      "/images/1522337360788-8b13dee7a37e.jpg",
    line: "Women's from $85 · Men's from $60",
  },
  {
    title: "The Color",
    image:
      "/images/1492106087820-71f1a00d2b11.jpg",
    line: "Highlights from $140 · Balayage from $270",
    badge: "New clients: 20% off",
  },
  {
    title: "The Style",
    image:
      "/images/1487412947147-5cebf100ffc2.jpg",
    line: "Blowout from $65 · Up-do from $160",
  },
  {
    title: "The Treatment",
    image:
      "/images/1607701703246-e4a9c9b29b60.jpg",
    line: "Brazilian Keratin from $420 · Includes Olaplex No.1",
  },
];

export function HorizontalServices() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="dark"
      className="relative bg-[var(--color-bg)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow>Our Services</SectionEyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-4xl italic leading-[1.05] md:text-6xl">
              Every visit. <span className="text-[var(--color-gold)]">Every detail.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold)]"
          >
            View Full Services
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div
        ref={trackRef}
        className="scroll-track mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-10"
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.12 }}
            className="group relative flex h-[520px] w-[78vw] shrink-0 snap-start flex-col overflow-hidden border-t border-[var(--color-border-dark)] bg-[var(--color-surface-elevated)] sm:w-[420px]"
            data-cursor="image"
          >
            <div className="relative h-[60%] overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 640px) 420px, 78vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              {card.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-[var(--color-gold)] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-bg)]">
                  {card.badge}
                </span>
              )}
            </div>
            <div className="relative flex flex-1 flex-col justify-between p-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--color-gold)]">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-serif text-3xl italic text-[var(--color-text-light)]">
                  {card.title}
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-light-muted)]">
                  {card.line}
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 origin-left bg-[var(--color-gold)] transition-transform duration-700 group-hover:scale-x-100" />
            </div>
          </motion.div>
        ))}
        <div className="w-6 shrink-0 md:w-10" />
      </div>

      <div className="mx-auto mt-8 max-w-[1440px] px-6 md:px-10">
        <div className="relative h-px w-full max-w-sm bg-[var(--color-border-dark)]">
          <div
            className="absolute left-0 top-0 h-full bg-[var(--color-gold)] transition-[width] duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
