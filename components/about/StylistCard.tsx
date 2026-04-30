"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  name: string;
  role: string;
  specialty: string;
  image: string;
};

export function StylistCard({ name, role, specialty, image }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rotX = useTransform(sy, [-1, 1], [6, -6]);
  const rotY = useTransform(sx, [-1, 1], [-6, 6]);

  function move(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-gold)]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold-deep)]">
          {role}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-[var(--color-text-dark)]">
          {name}
        </h3>
        <p className="mt-2 font-display text-base italic text-[var(--color-text-dark-muted)]">
          {specialty}
        </p>
      </div>
    </motion.article>
  );
}
