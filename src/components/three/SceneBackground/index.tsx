"use client";

import { useRef } from "react";
import { GlitchOverlay } from "@/components/three/SceneBackground/GlitchOverlay";
import { NetworkScene } from "@/components/three/SceneBackground/NetworkScene";
import { usePointerParallax } from "@/components/three/SceneBackground/usePointerParallax";
import { useSceneQuality } from "@/components/three/SceneBackground/useSceneQuality";
import { useScrollProgress } from "@/components/three/SceneBackground/useScrollProgress";
import { useSectionGlitch } from "@/components/three/SceneBackground/useSectionGlitch";
import { Canvas } from "@react-three/fiber";

export function SceneBackground() {
  const quality = useSceneQuality();
  const scrollProgressRef = useScrollProgress();
  const pointerRef = usePointerParallax();
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const glitchPulseRef = useSectionGlitch(scrollProgressRef, glitchOverlayRef);
  const dpr: [number, number] = quality === "full" ? [1, 1.5] : [1, 1];

  return (
    <>
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
          <NetworkScene
            quality={quality}
            scrollProgressRef={scrollProgressRef}
            pointerRef={pointerRef}
            glitchPulseRef={glitchPulseRef}
          />
        </Canvas>
      </div>
      <GlitchOverlay ref={glitchOverlayRef} />
    </>
  );
}
