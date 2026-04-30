"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { GoldRule } from "@/components/shared/GoldRule";

const stats = [
  { num: "15", label: "Years" },
  { num: "5+", label: "Master Stylists" },
  { num: "01", label: "Old Town's Own" },
];

export function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      data-section="light"
      className="relative bg-[var(--color-surface-light)] px-6 py-28 text-[var(--color-text-dark)] md:px-10 md:py-36"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full max-w-[460px]">
            <div className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-[var(--color-gold)]" />
            <Image
              src="/images/1633681926022-84c23e8cb2d6.jpg"
              alt="Selin Hair Studio interior"
              fill
              sizes="(min-width: 768px) 460px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="float-bob absolute -bottom-6 -right-2 z-10 max-w-[260px] border border-[var(--color-gold)] bg-[var(--color-bg)] p-5 text-[var(--color-text-light)] shadow-2xl md:-bottom-10 md:right-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
              Find Us
            </p>
            <p className="mt-2 font-display text-base italic">
              619 S. Washington St
              <br />
              Old Town Alexandria
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <SectionEyebrow>Our Story</SectionEyebrow>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl lg:text-[52px]">
            Fifteen years of <span className="italic text-[var(--color-gold-deep)]">artistry.</span>
            <br />
            One neighborhood at a time.
          </h2>
          <p className="mt-8 max-w-md text-[17px] leading-relaxed text-[var(--color-text-dark-muted)]">
            Since opening our doors in 2010, Selin Hair Studio has been a quiet cornerstone of Old
            Town Alexandria. We built this studio around one belief: that great hair begins with a
            great relationship. Our master stylists don&rsquo;t just learn your hair — they learn you.
          </p>

          <div className="mt-10">
            <GoldRule width={60} />
          </div>

          <div className="mt-10 flex flex-wrap gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-mono text-3xl text-[var(--color-gold-deep)]">{s.num}</p>
                <p className="mt-2 font-display text-sm italic text-[var(--color-text-dark-muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="group mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold-deep)]"
          >
            Meet Our Team
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
