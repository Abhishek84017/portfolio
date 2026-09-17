"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { GooglePlayIcon } from "@/components/ui/brand-icons";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { type GallerySlide, projects } from "@/data/projects";
import { useMediaQuery } from "@/lib/hooks";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

// Only apps with real store screens appear — add a gallery in data/projects.ts to add a tab.
const apps = projects.filter((p) => p.gallery && p.gallery.slides.length > 0);

const SWIPE_THRESHOLD = 60;
const TOUR_STEP_MS = 2200;

/** Shortest signed distance from the active slide, so the gallery loops. */
function circularOffset(i: number, active: number, count: number) {
  let offset = i - active;
  const half = Math.floor(count / 2);
  if (offset > half) offset -= count;
  if (offset < -half) offset += count;
  return offset;
}

export function AppPreviews() {
  const [appIndex, setAppIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  // Tour runs automatically; a visitor can pause it. Reduced-motion users start paused.
  const [paused, setPaused] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [userStarted, setUserStarted] = useState(false);
  const playing = !paused && (!reducedMotion || userStarted);
  const [hovering, setHovering] = useState(false);
  const tabsId = useId();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const wheelLock = useRef(0);

  const app = apps[appIndex];
  const gallery = app?.gallery;
  const count = gallery?.slides.length ?? 0;
  const tourRunning = playing && inView && !hovering;

  const go = (next: number) => setSlide(((next % count) + count) % count);
  const selectApp = (i: number) => {
    setAppIndex(i);
    setSlide(0);
  };

  // Auto tour: steps through every screen, then on to the next app.
  useEffect(() => {
    if (!tourRunning || count === 0) return;
    const t = setTimeout(() => {
      if (slide === count - 1) {
        setAppIndex((a) => (a + 1) % apps.length);
        setSlide(0);
      } else {
        setSlide(slide + 1);
      }
    }, TOUR_STEP_MS);
    return () => clearTimeout(t);
  }, [tourRunning, slide, count, appIndex]);

  if (!app || !gallery) return null;

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < 30 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    const now = Date.now();
    if (now - wheelLock.current < 450) return;
    wheelLock.current = now;
    go(slide + (e.deltaX > 0 ? 1 : -1));
  };

  return (
    <Section id="previews" labelledBy="previews-title" className="overflow-hidden">
      <Container>
        <SectionHeading
          id="previews-title"
          eyebrow="App Previews"
          align="center"
          title={
            <>
              Take a closer look at <span className="text-shimmer font-medium italic">what shipped</span>.
            </>
          }
          lede="Real Play Store screens from apps I built end to end. The tour plays on its own — hover to pause, or swipe, drag and use the arrow keys."
        />

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Choose an app"
            className="glass flex max-w-full gap-1 overflow-x-auto rounded-full p-1 [scrollbar-width:none]"
          >
            {apps.map((a, i) => {
              const selected = i === appIndex;
              return (
                <button
                  key={a.slug}
                  role="tab"
                  id={`${tabsId}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${tabsId}-panel`}
                  onClick={() => selectApp(i)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 rounded-full py-2 pr-4 pl-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-out-expo",
                    selected ? "text-[var(--on-accent)]" : "text-muted hover:text-fg",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId={`${tabsId}-pill`}
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    />
                  ) : null}
                  {a.icon ? (
                    <Image src={a.icon.src} alt="" width={24} height={24} className="relative size-6 rounded-md" />
                  ) : null}
                  <span className="relative">{a.name}</span>
                  {selected && playing ? (
                    <span className="absolute inset-x-4 bottom-1 h-0.5 overflow-hidden rounded-full bg-white/20">
                      <motion.span
                        key={`${a.slug}-${slide}-${tourRunning}`}
                        className="block h-full rounded-full bg-[var(--on-accent)]"
                        initial={{ width: `${(slide / count) * 100}%` }}
                        animate={{ width: tourRunning ? `${((slide + 1) / count) * 100}%` : `${(slide / count) * 100}%` }}
                        transition={{ duration: tourRunning ? TOUR_STEP_MS / 1000 : 0.2, ease: "linear" }}
                      />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          ref={sectionRef}
          id={`${tabsId}-panel`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-${appIndex}`}
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(slide + 1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(slide - 1);
            }
          }}
          className="focus-ring-inset relative mt-8 rounded-3xl"
        >
          {/* App-tinted glow that morphs between apps */}
          <AnimatePresence initial={false}>
            <motion.div
              key={app.slug}
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[44rem] max-w-[140vw] -translate-x-1/2 -translate-y-[60%] rounded-full"
              style={{ background: `radial-gradient(circle, ${app.accent}55 0%, transparent 60%)` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            />
          </AnimatePresence>

          {/* Stage */}
          <div
            onWheel={onWheel}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            className="relative mx-auto h-[32rem] w-full [perspective:1600px] sm:h-[38rem]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={app.slug}
                className="absolute inset-0"
                exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              >
                {gallery.slides.map((s, i) => (
                  <StageCard
                    key={s.src}
                    slide={s}
                    offset={circularOffset(i, slide, count)}
                    aspect={gallery.aspect}
                    onSelect={() => go(i)}
                    onSwipe={(dir) => go(slide + dir)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Floor shadow */}
            <div
              aria-hidden
              className="absolute bottom-2 left-1/2 h-8 w-64 -translate-x-1/2 rounded-[50%] bg-black/15 blur-2xl sm:bottom-0"
            />
          </div>

          {/* Caption + controls */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-6">
            <div className="flex min-h-20 flex-col items-center text-center" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={`${app.slug}-${slide}`} className="flex flex-col items-center">
                  <p className="font-display text-2xl font-semibold tracking-tight text-balance text-fg">
                    {gallery.slides[slide].caption.split(" ").map((word, i) => (
                      <motion.span
                        key={`${word}-${i}`}
                        className="inline-block"
                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.15 } }}
                        transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: i * 0.035 }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                    exit={{ opacity: 0 }}
                    className="mt-2 font-mono text-xs text-muted"
                  >
                    {app.name} · {app.category}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <ControlButton label="Previous screen" onClick={() => go(slide - 1)}>
                <ChevronLeft size={18} aria-hidden />
              </ControlButton>

              <div className="flex items-center gap-1">
                {gallery.slides.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to screen ${i + 1}: ${s.caption}`}
                    aria-current={i === slide ? "true" : undefined}
                    className="grid h-8 place-items-center px-1"
                  >
                    <span
                      className={cn(
                        "relative block h-1.5 overflow-hidden rounded-full transition-all duration-500 ease-out-expo",
                        i === slide ? "w-10 bg-line-strong" : "w-1.5 bg-line-strong hover:bg-muted",
                      )}
                    >
                      {i === slide ? (
                        <motion.span
                          key={`${app.slug}-${slide}-${tourRunning}`}
                          className="absolute inset-y-0 left-0 rounded-full bg-accent"
                          initial={{ width: tourRunning ? "0%" : "100%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: tourRunning ? TOUR_STEP_MS / 1000 : 0, ease: "linear" }}
                        />
                      ) : null}
                    </span>
                  </button>
                ))}
              </div>

              <ControlButton label="Next screen" onClick={() => go(slide + 1)}>
                <ChevronRight size={18} aria-hidden />
              </ControlButton>

              <button
                type="button"
                onClick={() => {
                  if (playing) setPaused(true);
                  else {
                    setPaused(false);
                    setUserStarted(true);
                  }
                }}
                aria-pressed={playing}
                className={cn(
                  "ml-1 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-[transform,background-color,color] duration-200 ease-out-expo hover:-translate-y-0.5",
                  playing ? "bg-accent text-[var(--on-accent)]" : "glass text-fg",
                )}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={playing ? "pause" : "play"}
                    initial={{ scale: 0.4, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.4, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className="grid place-items-center"
                  >
                    {playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
                  </motion.span>
                </AnimatePresence>
                {playing ? "Pause tour" : "Play tour"}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="glass-strong inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-fg">
                <span aria-hidden className="size-1.5 rounded-full bg-success" />
                {app.badge}
              </span>
              <span className="font-mono text-xs text-muted tabular-nums">
                {String(slide + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              {app.playStoreUrl ? (
                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 font-medium text-muted transition-colors duration-200 ease-out-expo hover:text-fg"
                >
                  <GooglePlayIcon size={14} />
                  Get {app.name} on Google Play
                  <ArrowUpRight
                    size={14}
                    aria-hidden
                    className="transition-transform duration-200 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="glass grid size-11 place-items-center rounded-full text-fg"
    >
      {children}
    </motion.button>
  );
}

function StageCard({
  slide,
  offset,
  aspect,
  onSelect,
  onSwipe,
}: {
  slide: GallerySlide;
  offset: number;
  aspect: string;
  onSelect: () => void;
  onSwipe: (direction: 1 | -1) => void;
}) {
  const distance = Math.abs(offset);
  const isActive = offset === 0;
  const hidden = distance > 2;

  // Pointer-driven 3D tilt + glare on the front card.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const rotateX = useSpring(tiltX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(tiltY, { stiffness: 200, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.35), transparent 55%)`;

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      aria-hidden={!isActive}
      className="absolute top-1/2 left-1/2 w-52 [transform-style:preserve-3d] sm:w-64"
      style={{ zIndex: 10 - distance, aspectRatio: aspect }}
      initial={{ opacity: 0, x: "-50%", y: "-10%", scale: 0.7, rotateZ: offset * 10 }}
      animate={{
        x: `calc(-50% + ${offset * 70}%)`,
        y: "-50%",
        scale: isActive ? 1 : distance === 1 ? 0.82 : 0.68,
        rotateY: offset * -22,
        rotateZ: 0,
        opacity: hidden ? 0 : isActive ? 1 : distance === 1 ? 0.7 : 0.3,
        filter: isActive ? "blur(0px)" : `blur(${distance}px)`,
      }}
      transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: distance * 0.03 }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragStart={resetTilt}
      onDragEnd={(_, info) => {
        if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -500) onSwipe(1);
        else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 500) onSwipe(-1);
      }}
      onClick={() => !isActive && onSelect()}
      data-cursor={!isActive || undefined}
    >
      <motion.div
        className={cn(
          "glass relative size-full rounded-3xl p-1.5",
          isActive ? "cursor-grab shadow-card-hover active:cursor-grabbing" : "cursor-pointer",
          hidden && "pointer-events-none",
        )}
        style={isActive ? { rotateX, rotateY } : undefined}
        whileHover={isActive ? undefined : { scale: 1.04 }}
        onPointerMove={(e) => {
          if (!isActive || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          tiltY.set((px - 0.5) * 18);
          tiltX.set((0.5 - py) * 14);
          glareX.set(px * 100);
          glareY.set(py * 100);
        }}
        onPointerLeave={resetTilt}
      >
        <div className="relative size-full overflow-hidden rounded-[1.25rem]">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            draggable={false}
            sizes="(min-width: 640px) 256px, 208px"
            className="pointer-events-none object-cover select-none"
          />
          {isActive ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: glare }}
            />
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
