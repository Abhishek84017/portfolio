"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/ui/device-frames";
import { type Project, projects } from "@/data/projects";
import { openCaseStudy } from "@/lib/case-study-events";
import { useMediaQuery } from "@/lib/hooks";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

const apps = projects.filter((p) => p.inGrid !== false && p.screenshots.length > 0 && p.icon);

const SCREEN_MS = 1700; // time on each screen inside the phone
const MAX_SCREENS = 4; // per app, keeps a full tour around 30s
const TOUCH_PAUSE_MS = 6000;
const SWIPE_PX = 50;

type Screen = { src: string; alt: string };

/** Real app UI to play inside the phone: raw store galleries, else the cleaned-up screenshots. */
function screensFor(p: Project): Screen[] {
  const list = p.gallery?.ui ? p.gallery.slides : p.screenshots;
  return list.slice(0, MAX_SCREENS).map(({ src, alt }) => ({ src, alt }));
}

const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));

type OrientationPermission = { requestPermission?: () => Promise<"granted" | "denied"> };

/**
 * Hero visual: every shipped app orbits the phone, which plays through that
 * app's real screens before moving on. Click the phone (or the card) for the
 * case study; swipe it to switch apps. Mouse or device tilt drives a 3D parallax.
 */
export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [screen, setScreen] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)", true);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tiltAttached = useRef(false);

  const paused = hovering || touchPaused || reducedMotion;
  const autoplay = !paused;
  const app = apps[index];
  const screens = app ? screensFor(app) : [];

  const selectApp = (i: number) => {
    setIndex(((i % apps.length) + apps.length) % apps.length);
    setScreen(0);
  };

  // Tour: step through this app's screens, then on to the next app.
  useEffect(() => {
    if (!autoplay || screens.length === 0) return;
    const t = setTimeout(() => {
      if (screen < screens.length - 1) setScreen(screen + 1);
      else {
        setIndex((i) => (i + 1) % apps.length);
        setScreen(0);
      }
    }, SCREEN_MS);
    return () => clearTimeout(t);
  }, [autoplay, screen, screens.length, index]);

  useEffect(() => () => clearTimeout(touchTimer.current), []);

  // Parallax values (-0.5 … 0.5), fed by the mouse or by device orientation.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const ringX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const ringY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const backX = useTransform(sx, [-0.5, 0.5], [-14, 14]);

  // Device tilt → parallax. Stable listener so it can be removed on unmount.
  const orientationHandler = useRef<((e: DeviceOrientationEvent) => void) | null>(null);
  useEffect(() => {
    orientationHandler.current = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      px.set(clamp(e.gamma / 50));
      py.set(clamp((e.beta - 40) / 50));
    };
    return () => {
      if (orientationHandler.current) window.removeEventListener("deviceorientation", orientationHandler.current);
    };
  }, [px, py]);

  const attachTilt = () => {
    if (tiltAttached.current || reducedMotion || !orientationHandler.current) return;
    tiltAttached.current = true;
    window.addEventListener("deviceorientation", orientationHandler.current);
  };

  // Android & others: tilt works without a prompt. iOS asks on first touch (onTouchStart).
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const DOE = window.DeviceOrientationEvent as unknown as OrientationPermission | undefined;
    if (coarse && DOE && typeof DOE.requestPermission !== "function" && !reducedMotion && orientationHandler.current) {
      tiltAttached.current = true;
      window.addEventListener("deviceorientation", orientationHandler.current);
    }
  }, [reducedMotion]);

  const pauseForTouch = () => {
    setTouchPaused(true);
    clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setTouchPaused(false), TOUCH_PAUSE_MS);
  };

  const onTouchStart = () => {
    pauseForTouch();
    const DOE = window.DeviceOrientationEvent as unknown as OrientationPermission | undefined;
    if (!tiltAttached.current && typeof DOE?.requestPermission === "function") {
      DOE.requestPermission()
        .then((state) => state === "granted" && attachTilt())
        .catch(() => {});
    }
  };

  if (!app) return null;
  const current = screens[screen] ?? screens[0];
  const next = screens.length > 1 ? screens[(screen + 1) % screens.length] : undefined;
  const shortName = app.name.split(" — ")[0];

  return (
    <div
      className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        setHovering(false);
        px.set(0);
        py.set(0);
      }}
      onPointerDown={(e) => e.pointerType !== "mouse" && onTouchStart()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") selectApp(index + 1);
        else if (e.key === "ArrowLeft") selectApp(index - 1);
      }}
    >
      <div
        className="animate-float-in relative mx-auto size-[calc(var(--r)*2+3.5rem)] [--r:9rem] [perspective:1400px] sm:[--r:12.5rem]"
        style={{ animationDelay: "200ms" }}
      >
        {/* App-tinted glow */}
        <AnimatePresence initial={false}>
          <motion.div
            key={app.slug}
            aria-hidden
            className="absolute inset-[10%] rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${app.accent}66, transparent 65%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          />
        </AnimatePresence>

        {/* Orbit layer — drifts against the phone tilt for depth */}
        <motion.div className="pointer-events-none absolute inset-0 z-30" style={{ x: ringX, y: ringY }}>
          <div
            className="absolute inset-0 m-auto size-[calc(var(--r)*2)] animate-[spin_60s_linear_infinite]"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {apps.map((a, i) => {
              const angle = (360 / apps.length) * i - 90;
              const active = i === index;
              return (
                <div
                  key={a.slug}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `rotate(${angle}deg) translate(var(--r)) rotate(${-angle}deg)` }}
                >
                  <div
                    className="-translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite] [animation-direction:reverse]"
                    style={{ animationPlayState: paused ? "paused" : "running" }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => selectApp(i)}
                      aria-label={`Show ${a.name}`}
                      aria-pressed={active}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.92 }}
                      animate={{ scale: active ? 1.12 : 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className={cn(
                        "glass-strong pointer-events-auto relative grid size-12 place-items-center rounded-2xl p-1 sm:size-14",
                        active && "shadow-card-hover ring-2 ring-accent",
                      )}
                    >
                      <Image
                        src={a.icon!.src}
                        alt=""
                        width={48}
                        height={48}
                        className="size-full rounded-xl object-cover"
                      />
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Phones */}
        <motion.div
          className="absolute inset-0 m-auto h-fit w-36 [transform-style:preserve-3d] sm:w-44"
          style={{ rotateX, rotateY }}
        >
          {next ? (
            <motion.div className="absolute inset-0" style={{ x: backX }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`${app.slug}-back`}
                  className="w-full"
                  initial={{ opacity: 0, x: 0, rotate: 0, scale: 0.9 }}
                  animate={{ opacity: 0.9, x: "32%", rotate: 8, scale: 0.9 }}
                  exit={{ opacity: 0, x: "10%", rotate: 2, scale: 0.85 }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 }}
                >
                  <PhoneFrame>
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={next.src}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                      >
                        <ScreenImage screen={next} sizes="176px" />
                      </motion.div>
                    </AnimatePresence>
                  </PhoneFrame>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : null}

          <div className="animate-bob relative">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={app.slug}
                initial={{ opacity: 0, y: 40, rotate: -4, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, rotate: -3, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, rotate: 2, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              >
                <motion.button
                  type="button"
                  aria-label={`Open the ${shortName} case study`}
                  className="block w-full cursor-grab touch-pan-y active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.35}
                  onDragStart={pauseForTouch}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_PX || info.velocity.x < -400) selectApp(index + 1);
                    else if (info.offset.x > SWIPE_PX || info.velocity.x > 400) selectApp(index - 1);
                  }}
                  onTap={() => app.caseStudy && openCaseStudy(app.slug)}
                  whileHover={{ scale: 1.02 }}
                  data-cursor
                >
                  <PhoneFrame>
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={current.src}
                        className="absolute inset-0"
                        initial={{ opacity: 0, y: "6%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-4%" }}
                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                      >
                        <ScreenImage
                          screen={current}
                          sizes="(min-width: 640px) 176px, 144px"
                          priority={index === 0 && screen === 0}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </PhoneFrame>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Now-showing card + progress */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <motion.div
          layout
          className="glass-strong flex items-center gap-3 rounded-2xl p-2 pr-3 shadow-card"
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={app.slug}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            >
              <Image src={app.icon!.src} alt="" width={36} height={36} className="size-9 rounded-xl" />
              <div className="leading-tight">
                <p className="font-display text-base font-semibold text-fg">
                  <span className="sr-only">Now showing </span>
                  {shortName}
                </p>
                <p className="text-xs text-muted">
                  {app.category} · {app.badge}
                </p>
              </div>
              {app.caseStudy ? (
                <button
                  type="button"
                  onClick={() => openCaseStudy(app.slug)}
                  className="group/cs ml-1 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-medium whitespace-nowrap text-[var(--on-accent)] transition-transform duration-200 ease-out-expo hover:-translate-y-0.5"
                >
                  Case study
                  <ArrowRight
                    size={12}
                    aria-hidden
                    className="transition-transform duration-200 ease-out-expo group-hover/cs:translate-x-0.5"
                  />
                </button>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center gap-1.5" aria-hidden>
          {apps.map((a, i) => (
            <span key={a.slug} className="relative h-1 w-6 overflow-hidden rounded-full bg-line-strong/60">
              {i === index ? (
                <motion.span
                  key={`${a.slug}-${screen}-${autoplay}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  initial={{ width: `${(screen / screens.length) * 100}%` }}
                  animate={{ width: `${((screen + 1) / screens.length) * 100}%` }}
                  transition={{ duration: autoplay ? SCREEN_MS / 1000 : 0, ease: "linear" }}
                />
              ) : i < index ? (
                <span className="absolute inset-0 rounded-full bg-accent/40" />
              ) : null}
            </span>
          ))}
        </div>

        <p className="font-mono text-[0.6875rem] text-muted">
          {canHover
            ? "Click the phone for the case study · hover to pause"
            : "Tap the phone for the case study · swipe to switch"}
        </p>
      </div>
    </div>
  );
}

function ScreenImage({ screen, sizes, priority }: { screen: Screen; sizes: string; priority?: boolean }) {
  return (
    <Image
      src={screen.src}
      alt={screen.alt}
      fill
      sizes={sizes}
      priority={priority}
      draggable={false}
      className="pointer-events-none object-cover object-top select-none"
    />
  );
}
