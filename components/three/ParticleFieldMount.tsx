"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ParticleField = dynamic(() => import("./ParticleField").then((m) => m.ParticleField), {
  ssr: false,
  loading: () => null,
});

export function ParticleFieldMount() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.12]" aria-hidden>
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </div>
  );
}
