import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { openSource, projects } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title" className="isolate">
      {/* soft surface band that bleeds into neighbours instead of a hard edge */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-surface/60 to-transparent"
      />
      <Container>
        <SectionHeading
          id="projects-title"
          eyebrow="Featured Projects"
          title="Production apps, not side projects."
          lede="Six apps across solar, wellness, healthcare and education. The first three open into short case studies."
        />

        <Stagger as="ul" className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.filter((p) => p.inGrid !== false).map((project) => (
            <StaggerItem as="li" key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 flex flex-col gap-6 rounded-2xl border border-dashed border-line-strong bg-elevated/30 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-elevated text-fg">
              <GithubIcon size={22} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-fg">Prefer reading code?</p>
              <p className="text-sm text-muted">Most client work is closed-source — here&apos;s what&apos;s public.</p>
            </div>
          </div>
          <ul className="flex flex-wrap items-center gap-2">
            {openSource.repos.map((repo) => (
              <li key={repo.name}>
                <a
                  href={`${openSource.profileUrl}/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group/repo inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm text-fg transition-transform duration-200 ease-out-expo hover:-translate-y-0.5"
                >
                  <span aria-hidden className="size-2 rounded-full bg-accent-2" />
                  {repo.name}
                  <span className="sr-only">({repo.language}, opens in a new tab)</span>
                  <ArrowUpRight
                    size={14}
                    aria-hidden
                    className="text-muted transition-transform duration-200 ease-out-expo group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href={openSource.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-2 text-sm font-medium text-accent-ink hover:underline"
              >
                All repositories
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
