import {
  Cloud,
  Database,
  FlaskConical,
  Layers,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups, type SkillIcon } from "@/data/skills";

const icons: Record<SkillIcon, LucideIcon> = {
  smartphone: Smartphone,
  layers: Layers,
  database: Database,
  users: Users,
  server: Server,
  cloud: Cloud,
  shield: ShieldCheck,
  sparkles: Sparkles,
  flask: FlaskConical,
};

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <Container>
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="A senior mobile engineer who owns the whole stack."
          lede="Flutter first — plus the architecture, data layer, backend, pipelines, payments, security and team practices it takes to ship and keep shipping."
        />

        <Stagger as="ul" className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = icons[group.icon];
            return (
              <StaggerItem as="li" key={group.title}>
                <article className="glass spotlight group h-full overflow-hidden rounded-2xl p-6 transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card-hover md:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-accent-2/0 blur-3xl transition-colors duration-500 ease-out-expo group-hover:bg-accent-2/20"
                  />
                  <div className="flex items-center gap-4">
                    <span className="grid size-10 place-items-center rounded-xl border border-line bg-elevated text-fg transition-[transform,color,background-color] duration-300 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-[var(--on-accent)]">
                      <Icon size={20} aria-hidden />
                    </span>
                    <h3 className="text-h3 text-fg">{group.title}</h3>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-line bg-elevated/60 px-3 py-1 font-mono text-xs leading-4 text-muted transition-colors duration-200 ease-out-expo group-hover:border-line-strong group-hover:text-fg"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
