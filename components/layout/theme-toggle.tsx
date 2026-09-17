"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/hooks";
import { EASE_OUT_EXPO } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-line text-muted transition-[color,border-color,background-color] duration-200 ease-out-expo hover:border-line-strong hover:bg-elevated hover:text-fg"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 16, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -16, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="grid place-items-center"
        >
          {theme === "dark" ? <Moon size={16} aria-hidden /> : <Sun size={16} aria-hidden />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
