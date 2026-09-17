"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { navLinks, profile } from "@/data/profile";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  // Highlight the section currently occupying the middle of the viewport.
  useEffect(() => {
    const sections = navLinks
      .filter((l) => l.href.startsWith("#"))
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((s): s is HTMLElement => Boolean(s));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out-expo",
        scrolled || open
          ? "border-[var(--glass-border)] bg-[var(--glass-bg-strong)] backdrop-blur-2xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-full"
          aria-label={`${profile.name} — back to top`}
          onClick={() => setOpen(false)}
        >
          <span className="bg-accent relative grid size-9 place-items-center rounded-full font-display text-sm font-semibold italic tracking-tight text-[var(--on-accent)] transition-transform duration-300 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-105">
            {profile.initials}
          </span>
          <span className="hidden font-display text-base font-semibold tracking-tight whitespace-nowrap text-fg lg:block">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm transition-colors duration-200 ease-out-expo",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="glass absolute inset-0 rounded-full"
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    />
                  ) : null}
                  <span className="relative">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resume.href}
            download={profile.resume.fileName}
            className={buttonClasses({ variant: "secondary", size: "sm", className: "hidden sm:inline-flex" })}
          >
            <Download size={16} aria-hidden className="transition-transform duration-200 ease-out-expo group-hover/btn:translate-y-0.5" />
            Resume
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
      />

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pt-4 pb-8 sm:px-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.04 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl font-medium tracking-tight text-fg hover:bg-elevated"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-4 px-4">
                <a
                  href={profile.resume.href}
                  download={profile.resume.fileName}
                  className={buttonClasses({ className: "w-full" })}
                >
                  <span className="relative inline-flex items-center gap-2">
                    <Download size={16} aria-hidden />
                    Download Resume
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
