import { useEffect, useRef } from "react";

export function usePointerParallax() {
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!isFinePointer) return;

    function handlePointerMove(event: PointerEvent) {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
        active: true,
      };
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return pointerRef;
}
