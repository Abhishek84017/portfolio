"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Inbox, Mail, MonitorSmartphone, type LucideIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { profile } from "@/data/profile";
import { EASE_OUT_EXPO } from "@/lib/utils";

const email = profile.contact.email;
const subject = encodeURIComponent("Hello from your portfolio");

/**
 * mailto: silently does nothing when no desktop mail app is set up (very common
 * for Gmail-in-the-browser users), so offer web composers and a copy option too.
 */
const options: { label: string; href: string; icon: LucideIcon; external: boolean }[] = [
  {
    label: "Gmail",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`,
    icon: Mail,
    external: true,
  },
  {
    label: "Outlook",
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${subject}`,
    icon: Inbox,
    external: true,
  },
  { label: "Mail app", href: `mailto:${email}?subject=${subject}`, icon: MonitorSmartphone, external: false },
];

const optionClass =
  "flex items-center justify-center gap-2 rounded-xl border border-line bg-elevated/70 px-3 py-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:bg-elevated";

export function EmailChooser({
  triggerClassName,
  children,
}: {
  triggerClassName: string;
  /** Trigger content. Style open state with `group-aria-expanded/email:` variants. */
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.prompt("Copy my email address:", email);
    }
  };

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`group/email ${triggerClassName}`}
      >
        {children}
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              <p className="mb-2 px-1 text-xs text-muted">Write to {email} with:</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {options.map((o, i) => (
                  <motion.a
                    key={o.label}
                    href={o.href}
                    {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={optionClass}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE_OUT_EXPO, delay: 0.05 * i }}
                  >
                    <o.icon size={15} aria-hidden />
                    {o.label}
                    {o.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                  </motion.a>
                ))}
                <motion.button
                  type="button"
                  onClick={copy}
                  className={optionClass}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO, delay: 0.15 }}
                >
                  {copied ? (
                    <Check size={15} aria-hidden className="text-success-ink" />
                  ) : (
                    <Copy size={15} aria-hidden />
                  )}
                  {copied ? "Copied!" : "Copy address"}
                </motion.button>
              </div>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
