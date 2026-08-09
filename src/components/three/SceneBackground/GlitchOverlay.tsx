import { forwardRef } from "react";

export const GlitchOverlay = forwardRef<HTMLDivElement>(
  function GlitchOverlay(_props, ref) {
    return (
      <div ref={ref} className="scene-glitch-overlay" aria-hidden="true">
        <style>{`
        .scene-glitch-overlay {
          position: fixed;
          inset: 0;
          z-index: 40;
          pointer-events: none;
          opacity: 0;
        }
        .scene-glitch-overlay.is-glitching {
          animation: scene-glitch-flash 0.35s steps(2, end);
        }
        .scene-glitch-overlay.is-glitching::before,
        .scene-glitch-overlay.is-glitching::after {
          content: "";
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
        }
        .scene-glitch-overlay.is-glitching::before {
          background: repeating-linear-gradient(rgba(0, 200, 150, 0.5) 0 1px, transparent 1px 3px);
          animation: scene-glitch-split-left 0.35s steps(2, end);
        }
        .scene-glitch-overlay.is-glitching::after {
          background: repeating-linear-gradient(rgba(255, 0, 120, 0.4) 0 1px, transparent 1px 3px);
          animation: scene-glitch-split-right 0.35s steps(2, end);
        }
        @keyframes scene-glitch-flash {
          0% { opacity: 0; }
          30% { opacity: 0.9; }
          60% { opacity: 0.25; }
          100% { opacity: 0; }
        }
        @keyframes scene-glitch-split-left {
          0% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(3px); }
          75% { transform: translateX(-3px); }
          100% { transform: translateX(0); }
        }
        @keyframes scene-glitch-split-right {
          0% { transform: translateX(0); }
          25% { transform: translateX(8px); }
          50% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }
      `}</style>
      </div>
    );
  },
);
