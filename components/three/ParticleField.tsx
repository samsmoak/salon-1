"use client";

import { useMemo } from "react";

export function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 8,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold animate-particle-drift"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particle-drift {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.4;
          }
          50% {
            transform: translate(20px, -30px);
            opacity: 1;
          }
        }
        .animate-particle-drift {
          animation: particle-drift ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
