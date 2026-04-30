"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GoldRule } from "@/components/shared/GoldRule";

export function PageHero({
  title,
  image,
  eyebrow,
}: {
  title: string;
  image: string;
  eyebrow?: string;
}) {
  return (
    <section
      data-section="dark"
      className="relative h-[80svh] min-h-[520px] w-full overflow-hidden bg-[var(--color-bg)]"
    >
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,8,5,0.5)] via-[rgba(10,8,5,0.4)] to-[rgba(10,8,5,0.85)]" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-start justify-end px-6 pb-24 md:px-10 md:pb-32">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold)]"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-6xl italic leading-[0.95] text-[var(--color-text-light)] md:text-8xl lg:text-[120px]"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-6 origin-left"
        >
          <GoldRule width={120} />
        </motion.div>
      </div>
    </section>
  );
}
