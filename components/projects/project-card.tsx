"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { StoreLinks } from "@/components/ui/store-links";
import type { Project } from "@/data/projects";
import { CaseStudyDialog } from "./case-study-dialog";
import { ProjectVisual } from "./project-visual";

const MAX_CHIPS = 4;

export function ProjectCard({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openCaseStudy = () => dialogRef.current?.showModal();
  const hidden = project.stack.length - MAX_CHIPS;

  return (
    <article className="glass spotlight group flex h-full flex-col overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative">
        {project.caseStudy ? (
          <button
            type="button"
            onClick={openCaseStudy}
            className="focus-ring-inset block w-full text-left"
            aria-label={`Open ${project.name} case study`}
            data-cursor
          >
            <ProjectVisual project={project} />
          </button>
        ) : (
          <ProjectVisual project={project} />
        )}

        <div className="pointer-events-none absolute top-4 right-4 left-4 flex items-start justify-between gap-3">
          {project.icon ? (
            <Image
              src={project.icon.src}
              alt={project.icon.alt}
              width={40}
              height={40}
              className="size-10 rounded-xl shadow-card ring-1 ring-white/10"
            />
          ) : (
            <span />
          )}
          <span className="glass-strong inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs leading-4 text-fg">
            <span aria-hidden className="size-1.5 rounded-full bg-success" />
            {project.badge}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-eyebrow text-muted">{project.category}</p>
        <h3 className="text-h3 mt-2 text-fg">{project.name}</h3>
        <p className="mt-3 text-pretty text-muted">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.slice(0, MAX_CHIPS).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-elevated/60 px-3 py-1 font-mono text-xs leading-4 text-muted"
            >
              {tech}
            </li>
          ))}
          {hidden > 0 ? (
            <li className="rounded-full px-2 py-1 font-mono text-xs leading-4 text-muted">
              +{hidden}
              <span className="sr-only"> more: {project.stack.slice(MAX_CHIPS).join(", ")}</span>
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-8">
          {project.caseStudy ? (
            <button
              type="button"
              onClick={openCaseStudy}
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg"
            >
              <Maximize2
                size={14}
                aria-hidden
                className="text-accent-2-ink transition-transform duration-200 ease-out-expo group-hover/link:scale-110"
              />
              <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out-expo group-hover/link:bg-[length:100%_1px]">
                Case study
              </span>
            </button>
          ) : null}
          <StoreLinks project={project} variant="icons" className="ml-auto" />
        </div>
      </div>

      {project.caseStudy ? <CaseStudyDialog ref={dialogRef} project={project} /> : null}
    </article>
  );
}
