import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { profile } from "@/data/profile";

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--glass-border)] bg-[var(--glass-bg-strong)] backdrop-blur-2xl backdrop-saturate-150">
      <nav
        aria-label="Notes"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="group flex items-center gap-3 rounded-full" aria-label={`${profile.name} — home`}>
          <span className="grid size-9 place-items-center rounded-full bg-accent font-display text-sm font-semibold italic tracking-tight text-[var(--on-accent)] transition-transform duration-300 ease-out-expo group-hover:-rotate-8 group-hover:scale-105">
            {profile.initials}
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-fg">
            {profile.name} <span className="font-normal text-muted italic">/ Notes</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/"
            className="group/back hidden items-center gap-2 rounded-full px-4 py-2 text-sm text-muted transition-colors duration-200 ease-out-expo hover:text-fg sm:inline-flex"
          >
            <ArrowLeft
              size={16}
              aria-hidden
              className="transition-transform duration-200 ease-out-expo group-hover/back:-translate-x-1"
            />
            Portfolio
          </Link>
        </div>
      </nav>
    </header>
  );
}
