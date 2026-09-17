"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import type { Experience } from "@/data/experience";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

const VISIBLE = 4;

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative mt-12 md:mt-16">
      {/* rail + scroll-linked fill */}
      <div aria-hidden className="absolute top-2 bottom-2 left-2 w-px bg-line md:left-[calc(25%+0.5rem)]" />
      <motion.div
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute top-2 bottom-2 left-2 w-px origin-top bg-accent md:left-[calc(25%+0.5rem)]"
      />

      {items.map((item) => (
        <li key={`${item.company}-${item.start}`} className="relative pb-12 pl-12 last:pb-0 md:grid md:grid-cols-4 md:gap-8 md:pl-0">
          {/* dot */}
          <span
            aria-hidden
            className="absolute top-2 left-2 -translate-x-1/2 md:left-[calc(25%+0.5rem)]"
          >
            <span className="relative flex size-4 items-center justify-center">
              {item.current ? (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/40" />
              ) : null}
              <span
                className={cn(
                  "relative size-3 rounded-full border-2 border-bg ring-1",
                  item.current ? "bg-accent ring-accent/40" : "bg-line-strong ring-line",
                )}
              />
            </span>
          </span>

          <Reveal className="md:pr-8 md:text-right">
            <p className="font-mono text-sm text-fg">
              {item.start} — {item.end}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">{item.duration}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-4 md:col-span-3 md:mt-0 md:pl-8">
            <article className="glass spotlight group rounded-2xl p-6 transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card-hover md:p-8">
              <header>
                <h3 className="text-h3 text-fg">{item.role}</h3>
                <p className="mt-1 font-medium text-accent-2-ink">
                  {item.company}
                  {item.current ? (
                    <span className="ml-3 inline-flex items-center rounded-full border border-success/30 bg-success/10 px-2 py-0.5 align-middle font-mono text-[0.6875rem] text-success-ink">
                      Current
                    </span>
                  ) : null}
                </p>
                {item.summary ? <p className="mt-4 text-pretty text-muted italic">{item.summary}</p> : null}
              </header>
              <Highlights items={item.highlights} />
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

function Highlights({ items }: { items: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const extra = items.length - VISIBLE;
  const shown = expanded ? items : items.slice(0, VISIBLE);

  return (
    <>
      <ul id={listId} className="mt-6 flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {shown.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto", transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: i >= VISIBLE ? (i - VISIBLE) * 0.05 : 0 } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.3, ease: EASE_OUT_EXPO } }}
              className="flex gap-3 overflow-hidden text-pretty text-muted"
            >
              <span
                aria-hidden
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent transition-transform duration-200 ease-out-expo group-hover:scale-125"
              />
              <span>{h}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {extra > 0 ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((e) => !e)}
          className="glass mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-fg transition-transform duration-200 ease-out-expo hover:-translate-y-0.5"
        >
          {expanded ? "Show fewer" : `Show all ${items.length} highlights`}
          <ChevronDown
            size={16}
            aria-hidden
            className={cn("transition-transform duration-300 ease-out-expo", expanded && "rotate-180")}
          />
        </button>
      ) : null}
    </>
  );
}
