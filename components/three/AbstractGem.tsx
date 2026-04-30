"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Gem() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.4, 1]} />
      <meshStandardMaterial
        color="#C9A96E"
        roughness={0.25}
        metalness={0.9}
        flatShading
      />
    </mesh>
  );
}

export function AbstractGem() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#EDD07A" />
      <directionalLight position={[-3, -2, -3]} intensity={0.6} color="#9A6E30" />
      <Gem />
    </Canvas>
  );
}
