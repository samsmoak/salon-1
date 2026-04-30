"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GoldRule } from "@/components/shared/GoldRule";

export function PhilosophyTeaser() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const lines = ["We don't just cut hair.", "We craft confidence."];

  return (
    <section
      ref={ref}
      data-section="light"
      className="relative bg-[var(--color-surface-light)] px-6 py-32 text-[var(--color-text-dark)] md:px-10 md:py-44"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold-deep)]"
        >
          Old Town Alexandria · Est. 2010
        </motion.span>

        <h2 className="mt-10 font-display text-4xl italic leading-[1.05] md:text-6xl lg:text-[64px]">
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.split(" ").map((word, wi) => (
                <span key={wi} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={inView ? { y: "0%" } : {}}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + (li * 4 + wi) * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block pr-3"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-10 max-w-md text-lg leading-relaxed text-[var(--color-text-dark-muted)]"
        >
          Since 2010, our master stylists have built lasting relationships with clients in the heart
          of Old Town Alexandria — learning the unique story of every head of hair that walks
          through our door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="origin-center mt-12"
          style={{ width: 80 }}
        >
          <GoldRule width={80} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mt-8 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-text-dark-muted)]"
        >
          Master Stylists · Custom Color · Precision Cuts
        </motion.p>
      </div>
    </section>
  );
}
