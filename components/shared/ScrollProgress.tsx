"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-[150] h-[1.5px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "var(--color-gold)",
        width: "100%",
      }}
    />
  );
}
