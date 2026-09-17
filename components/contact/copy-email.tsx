"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/utils";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      className="relative grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-[color,border-color,background-color] duration-200 ease-out-expo hover:border-line-strong hover:bg-elevated hover:text-fg"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          className="grid place-items-center"
        >
          {copied ? <Check size={16} className="text-success-ink" aria-hidden /> : <Copy size={16} aria-hidden />}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
