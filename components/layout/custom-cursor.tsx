"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor]";

/**
 * A soft ring that trails the native cursor and swells over interactive
 * elements. Additive only — the native cursor is never hidden. Disabled on
 * touch devices and for prefers-reduced-motion.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      setHovering(Boolean(target));
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const scale = pressed ? 0.8 : hovering ? 1.75 : 1;

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed top-0 left-0 z-[100] size-8 rounded-full border transition-colors duration-200 ${hovering ? "border-accent/40 bg-accent/5" : "border-accent/25"}`}
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        scale,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
    />
  );
}
