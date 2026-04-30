"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { GALLERY_IMAGES, STUDIO } from "@/lib/constants";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

function TiltCard({ src, alt, span = false }: { src: string; alt: string; span?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotX = useTransform(sy, [-1, 1], [5, -5]);
  const rotY = useTransform(sx, [-1, 1], [-5, 5]);

  function handle(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={reset}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      className={`group relative overflow-hidden ${span ? "row-span-2" : ""}`}
      data-cursor="image"
    >
      <div className={`relative ${span ? "aspect-[3/4]" : "aspect-[4/5]"} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,5,0.8)] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-display text-lg italic text-[var(--color-text-light)]">
            {STUDIO.shortName} Hair Studio
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            View Gallery →
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 ring-0 ring-[var(--color-gold)] transition-all duration-500 group-hover:ring-1" />
      </div>
    </motion.div>
  );
}

export function GalleryPreview() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const items = GALLERY_IMAGES.slice(0, 6);

  return (
    <section
      ref={ref}
      data-section="dark"
      className="relative bg-[var(--color-bg)] px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow>The Gallery</SectionEyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-4xl italic leading-[1.05] md:text-6xl">
              Results that <span className="text-[var(--color-gold)]">speak.</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold)]"
          >
            See Full Gallery
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="mt-16 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[260px] md:grid-cols-3 md:gap-6"
        >
          {items.map((img, i) => (
            <TiltCard key={img.src} src={img.src} alt={img.alt} span={i === 0 || i === 4} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
