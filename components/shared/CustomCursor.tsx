"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState<"default" | "link" | "image" | "button">("default");
  const [light, setLight] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 600, damping: 35 });
  const dotY = useSpring(y, { stiffness: 600, damping: 35 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("button, [data-cursor='button']")) setHover("button");
      else if (t.closest("img, [data-cursor='image']")) setHover("image");
      else if (t.closest("a, [data-cursor='link']")) setHover("link");
      else setHover("default");

      const lightSection = t.closest("[data-section='light']");
      setLight(Boolean(lightSection));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = hover === "link" || hover === "image" ? 52 : hover === "button" ? 0 : 34;
  const ringColor = light ? "#1A1714" : "#C9A96E";
  const ringFill = hover === "link" || hover === "image" ? "rgba(201,169,110,0.08)" : "transparent";

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden lg:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ width: ringSize, height: ringSize, backgroundColor: ringFill, borderColor: ringColor }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="rounded-full border flex items-center justify-center"
          style={{ borderWidth: 1 }}
        >
          {hover === "image" && (
            <span
              className="font-mono text-[8px] uppercase tracking-[0.3em]"
              style={{ color: ringColor }}
            >
              View
            </span>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[201] hidden lg:block"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className="w-[5px] h-[5px] rounded-full"
          style={{ background: light ? "#1A1714" : "#F4F0E8" }}
        />
      </motion.div>
    </>
  );
}
