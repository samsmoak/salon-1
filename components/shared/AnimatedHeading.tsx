"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function AnimatedHeading({ children, className, as = "h2" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const Tag = as;

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
