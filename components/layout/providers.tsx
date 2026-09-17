"use client";

import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import { CustomCursor } from "./custom-cursor";

/** One delegated listener drives the spotlight on every `.spotlight` card. */
function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = e.target instanceof Element ? e.target.closest<HTMLElement>(".spotlight") : null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useSpotlight();
  return (
    // "user": transform/layout animations are skipped for prefers-reduced-motion,
    // leaving gentle opacity fades only.
    <MotionConfig reducedMotion="user">
      {children}
      <CustomCursor />
    </MotionConfig>
  );
}
