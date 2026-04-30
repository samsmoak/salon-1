"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}

export function NewClientPromo() {
  return (
    <section
      data-section="light"
      className="relative bg-[var(--color-surface-light)] px-6 py-28 text-[var(--color-text-dark)] md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow align="center">Welcome Offer</SectionEyebrow>
        <h2 className="mt-6 font-display text-5xl italic leading-[1.05] md:text-7xl">
          New to Selin Hair Studio?
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="mx-auto mt-14 max-w-md border border-[var(--color-gold)] bg-[var(--color-bg)] p-10 text-[var(--color-text-light)]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold)]">
            First Visit
          </p>
          <p className="mt-6 font-mono text-[96px] font-medium leading-none text-[var(--color-gold)]">
            <CountUp to={20} />%
          </p>
          <p className="mt-4 font-display text-2xl italic">Off your first service.</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-light-muted)]">
            Mention this offer when booking. Valid for all new clients on any service.
          </p>
          <Link
            href="/book"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-light)]"
          >
            Book Your First Visit
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
