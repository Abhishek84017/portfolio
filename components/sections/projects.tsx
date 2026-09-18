import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

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
          lede="Six apps across solar, wellness, healthcare, real estate, coaching and HR — all live on Google Play and the App Store. Each one opens into a short case study."
        />

        <Stagger as="ul" className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.filter((p) => p.inGrid !== false).map((project) => (
            <StaggerItem as="li" key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
