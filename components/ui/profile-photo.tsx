"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";
import { profile } from "@/data/profile";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

/**
 * Next/Image with a designed fallback: if /images/profile.png is missing or
 * fails to load, render a monogram instead of the browser's broken-image icon.
 */
function usePhotoStatus() {
  const [failed, setFailed] = useState(false);
  // Catches errors that fired before hydration attached onError.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return { failed, ref, onError: () => setFailed(true) };
}

function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-gradient-accent grid size-full place-items-center font-display font-semibold tracking-tight text-[var(--on-accent)]",
        className,
      )}
    >
      {profile.initials}
    </span>
  );
}

export function Avatar({ size = 32, className }: { size?: number; className?: string }) {
  const { failed, ref, onError } = usePhotoStatus();
  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden rounded-full ring-1 ring-line", className)}
      style={{ width: size, height: size }}
    >
      {failed ? (
        <Monogram className="text-xs" />
      ) : (
        <Image
          ref={ref}
          src={profile.photo.src}
          alt=""
          width={size}
          height={size}
          priority
          onError={onError}
          className="size-full object-cover object-top"
        />
      )}
    </span>
  );
}

export function PortraitPhoto() {
  const { failed, ref, onError } = usePhotoStatus();
  // Observe the unclipped wrapper; a fully clipped element never counts as "in view".
  return (
    <motion.div
      className="relative aspect-[4/5] overflow-hidden rounded-2xl"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: EASE_OUT_EXPO } },
        }}
      >
        {failed ? (
          <div className="relative grid size-full place-items-center bg-elevated">
            <div className="bg-gradient-accent absolute inset-0 opacity-10" />
            <span className="text-gradient font-display text-8xl font-semibold tracking-tighter italic">
              {profile.initials}
            </span>
          </div>
        ) : (
          <motion.div
            className="absolute inset-0"
            variants={{
              hidden: { scale: 1.35 },
              show: { scale: 1.15, transition: { duration: 1.6, ease: EASE_OUT_EXPO } },
            }}
          >
            <Image
              ref={ref}
              src={profile.photo.src}
              alt={profile.photo.alt}
              fill
              onError={onError}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 384px, 100vw"
              className="object-cover object-[50%_18%] transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
