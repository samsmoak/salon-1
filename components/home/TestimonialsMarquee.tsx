"use client";

import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <article className="relative mx-3 flex w-[380px] shrink-0 flex-col gap-4 border-l border-[var(--color-gold)] bg-[var(--color-surface-elevated)] p-8 md:w-[440px]">
      <span className="absolute -top-3 left-6 font-display text-6xl leading-none text-[var(--color-gold)]">
        &ldquo;
      </span>
      <div className="flex gap-0.5 text-[var(--color-gold)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="font-display text-lg italic leading-relaxed text-[var(--color-text-light)]">
        {t.quote}
      </p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-4">
        <p className="font-serif text-base text-[var(--color-text-light)]">{t.name}</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-text-light-muted)]">
          {t.detail}
        </p>
      </div>
    </article>
  );
}

export function TestimonialsMarquee() {
  const rowA = [...TESTIMONIALS, ...TESTIMONIALS];
  const rowB = [...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()];

  return (
    <section
      data-section="dark"
      className="relative overflow-hidden bg-[var(--color-bg)] py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="text-center">
          <SectionEyebrow align="center">Client Words</SectionEyebrow>
          <h2 className="mt-5 font-display text-4xl italic md:text-6xl">
            Trusted <span className="text-[var(--color-gold)]">since 2010.</span>
          </h2>
        </div>
      </div>

      <div className="mt-16 space-y-6">
        <div className="overflow-hidden">
          <div className="marquee flex w-max">
            {rowA.map((t, i) => (
              <Card key={`a-${i}`} t={t} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-reverse flex w-max">
            {rowB.map((t, i) => (
              <Card key={`b-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
