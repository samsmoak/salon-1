"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/constants";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06 }}
      className="group relative flex flex-col gap-3 border-l-[3px] border-[var(--color-gold)] bg-[var(--color-surface-elevated)] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:bg-[var(--color-surface)] hover:shadow-[0_20px_60px_-20px_var(--color-gold-glow)]"
    >
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="font-serif text-[22px] font-bold leading-tight text-[var(--color-text-light)]">
          {service.name}
        </h3>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-light-muted)]">
        Starting from
      </p>
      <p className="font-mono text-3xl text-[var(--color-gold)]">{service.price}</p>
      {service.note && (
        <p className="mt-2 font-display text-sm italic text-[var(--color-text-light-muted)]">
          {service.note}
        </p>
      )}
    </motion.article>
  );
}
