import { useEffect, useRef, type RefObject } from "react";

const SECTION_BOUNDARIES = [0.18, 0.42, 0.68];

function bucketFor(t: number): number {
  let bucket = 0;
  for (const boundary of SECTION_BOUNDARIES) {
    if (t >= boundary) bucket++;
  }
  return bucket;
}

export function useSectionGlitch(
  progressRef: RefObject<number>,
  overlayRef: RefObject<HTMLDivElement | null>,
) {
  const glitchPulseRef = useRef({ timestamp: 0 });
  const lastBucketRef = useRef<number | null>(null);

  useEffect(() => {
    function checkBoundary() {
      const bucket = bucketFor(progressRef.current);
      if (lastBucketRef.current !== null && bucket !== lastBucketRef.current) {
        glitchPulseRef.current = { timestamp: performance.now() };

        const overlay = overlayRef.current;
        if (overlay) {
          overlay.classList.remove("is-glitching");
          void overlay.offsetWidth;
          overlay.classList.add("is-glitching");
        }
      }
      lastBucketRef.current = bucket;
    }

    checkBoundary();
    window.addEventListener("scroll", checkBoundary, { passive: true });
    return () => window.removeEventListener("scroll", checkBoundary);
  }, [progressRef, overlayRef]);

  return glitchPulseRef;
}
