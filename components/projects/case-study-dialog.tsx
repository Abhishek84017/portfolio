"use client";

import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StoreLinks } from "@/components/ui/store-links";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./project-visual";

/**
 * Native <dialog> + showModal(): focus trapping, Esc-to-close, inert
 * background and top-layer stacking come from the platform. Enter/exit
 * motion is CSS (@starting-style + transition-behavior: allow-discrete).
 */
export function CaseStudyDialog({
  project,
  ref,
}: {
  project: Project;
  ref: React.RefObject<HTMLDialogElement | null>;
}) {
  const study = project.caseStudy!;
  const titleId = `${project.slug}-case-study-title`;
  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className={[
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-2xl glass-strong p-0 text-fg shadow-card-hover",
        "opacity-0 translate-y-6 scale-[0.98] transition-[opacity,translate,scale,display,overlay] transition-discrete duration-500 ease-out-expo",
        "open:opacity-100 open:translate-y-0 open:scale-100",
        "starting:open:opacity-0 starting:open:translate-y-6 starting:open:scale-[0.98]",
        "backdrop:bg-black/0 backdrop:backdrop-blur-none backdrop:transition-[background-color,backdrop-filter,display,overlay] backdrop:transition-discrete backdrop:duration-500",
        "open:backdrop:bg-black/40 open:backdrop:backdrop-blur-sm",
        "starting:open:backdrop:bg-black/0 starting:open:backdrop:backdrop-blur-none",
      ].join(" ")}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-[var(--glass-bg-strong)] px-6 py-4 backdrop-blur-xl md:px-8">
        <div className="flex items-center gap-3">
          {project.icon ? (
            <Image src={project.icon.src} alt="" width={40} height={40} className="size-10 rounded-xl ring-1 ring-line" />
          ) : null}
          <div>
            <p className="text-eyebrow text-muted">Case study</p>
            <h2 id={titleId} className="font-display text-xl font-semibold tracking-tight text-fg">
              {project.name} <span className="font-normal text-muted">— {project.category}</span>
            </h2>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close case study"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-[color,border-color,transform] duration-200 ease-out-expo hover:rotate-90 hover:border-line-strong hover:text-fg"
        >
          <X size={18} aria-hidden />
        </button>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-5 md:p-8">
        <div className="md:col-span-2">
          <ProjectVisual project={project} variant="dialog" />
        </div>

        <div className="flex flex-col gap-8 md:col-span-3">
          <section aria-labelledby={`${titleId}-problem`}>
            <h3 id={`${titleId}-problem`} className="text-eyebrow text-accent-2-ink">
              01 · Problem
            </h3>
            <p className="mt-3 text-lg text-pretty text-fg">{study.problem}</p>
          </section>

          <section aria-labelledby={`${titleId}-approach`}>
            <h3 id={`${titleId}-approach`} className="text-eyebrow text-accent-2-ink">
              02 · Approach
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {study.approach.map((step) => (
                <li key={step} className="flex gap-3 text-pretty text-muted">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-2" />
                  {step}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby={`${titleId}-result`}>
            <h3 id={`${titleId}-result`} className="text-eyebrow text-accent-2-ink">
              03 · Result
            </h3>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              {study.result.map((r) => (
                <div key={r.label} className="glass rounded-2xl p-4">
                  <dt className="sr-only">{r.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-semibold tracking-tight text-fg italic">
                      {r.metric}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{r.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            {study.resultNote ? <p className="mt-4 text-sm text-pretty text-muted">{study.resultNote}</p> : null}
          </section>

          {project.notes ? (
            <Link
              href={`/blog/${project.notes}`}
              className="glass spotlight group flex items-center justify-between gap-4 rounded-2xl p-4 transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
            >
              <span>
                <span className="text-eyebrow block text-muted">Engineering notes</span>
                <span className="mt-1 block font-display text-lg font-semibold tracking-tight text-fg">
                  Read the full write-up
                </span>
              </span>
              <ArrowRight
                size={18}
                aria-hidden
                className="shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              />
            </Link>
          ) : null}

          <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-elevated/60 px-3 py-1 font-mono text-xs leading-4 text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <StoreLinks project={project} variant="buttons" className="shrink-0" />
          </div>
        </div>
      </div>
    </dialog>
  );
}
