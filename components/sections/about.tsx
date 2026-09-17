import { GraduationCap, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/ui/chip";
import { Container, Section } from "@/components/ui/container";
import { PortraitPhoto } from "@/components/ui/profile-photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/data/education";
import { profile } from "@/data/profile";

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:sticky lg:top-24 lg:col-span-5">
          <figure className="group relative mx-auto max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-3xl bg-accent-2/20 opacity-60 blur-3xl transition-opacity duration-700 ease-out-expo group-hover:opacity-100"
            />
            <div className="glass relative rounded-3xl p-2 shadow-card transition-transform duration-500 ease-out-expo group-hover:-rotate-1">
              <PortraitPhoto />
            </div>
            <figcaption className="absolute right-6 bottom-6 left-6 flex items-center justify-between gap-3 glass-strong rounded-xl px-4 py-3 text-sm text-fg">
              <span className="font-display font-medium">{profile.name}</span>
              <span className="flex items-center gap-1 text-muted">
                <MapPin size={14} aria-hidden />
                Surat, India
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            id="about-title"
            eyebrow="About"
            title="From first commit to store release — and everything in between."
          />

          <Reveal delay={0.1} className="mt-8 flex flex-col gap-4 text-lg leading-relaxed text-muted">
            {profile.summary.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="glass spotlight rounded-2xl p-6">
              <p className="text-eyebrow text-muted">Domains shipped</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.domains.map((d) => (
                  <li key={d}>
                    <Chip>{d}</Chip>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass spotlight rounded-2xl p-6">
              <p className="text-eyebrow flex items-center gap-2 text-muted">
                <GraduationCap size={14} aria-hidden />
                Education
              </p>
              <p className="mt-4 font-display font-medium text-fg">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">
                {education.school} · {education.start} – {education.end}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
