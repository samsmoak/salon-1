"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { STUDIO } from "@/lib/constants";

const AbstractGem = dynamic(() => import("@/components/three/AbstractGem").then((m) => m.AbstractGem), {
  ssr: false,
  loading: () => null,
});

export function CTABanner() {
  return (
    <section
      data-section="dark"
      className="relative overflow-hidden bg-[var(--color-bg)] py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <Suspense fallback={null}>
          <AbstractGem />
        </Suspense>
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-[var(--color-bg)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="font-display text-5xl italic leading-[1.05] md:text-7xl lg:text-[80px]"
        >
          Ready for your <br />
          <span className="text-[var(--color-gold)]">best hair yet?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/book"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-light)]"
          >
            Book Your Appointment
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a
            href={`tel:${STUDIO.phoneRaw}`}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border-dark)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-light)] transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <Phone size={13} />
            Call Us
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-light-muted)]"
        >
          {STUDIO.phone} · Mon–Fri 10am–7pm · Sat 9am–6pm
        </motion.p>
      </div>
    </section>
  );
}
