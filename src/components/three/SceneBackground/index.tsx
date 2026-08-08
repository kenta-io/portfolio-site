"use client";

import { NetworkScene } from "@/components/three/SceneBackground/NetworkScene";
import { useSceneQuality } from "@/components/three/SceneBackground/useSceneQuality";
import { Canvas } from "@react-three/fiber";

export function SceneBackground() {
  const quality = useSceneQuality();
  const dpr: [number, number] = quality === "full" ? [1, 1.5] : [1, 1];

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [1.6, 0.2, 5.4], fov: 50 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#060a12"]} />
        <NetworkScene />
      </Canvas>
    </div>
  );
}
