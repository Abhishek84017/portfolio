import { Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { mentorship, testimonials } from "@/data/testimonials";

/**
 * §5.8 — renders real testimonials when data/testimonials.ts has any;
 * otherwise falls back to the mentorship credibility strip.
 */
export function Mentorship() {
  return (
    <Section id="mentorship" labelledBy="mentorship-title">
      <Container>
        {testimonials.length > 0 ? <Testimonials /> : <MentorshipStrip />}
      </Container>
    </Section>
  );
}

function MentorshipStrip() {
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 size-72 rounded-full bg-accent-2/25 blur-3xl"
      />
      <Reveal className="relative max-w-3xl">
        <p className="text-eyebrow flex items-center gap-3 text-muted">
          <Users size={14} aria-hidden />
          Beyond the code
        </p>
        <h2 id="mentorship-title" className="text-h2 mt-4 text-balance text-fg">
          {mentorship.heading}
        </h2>
        <p className="text-lede mt-4 text-pretty text-muted">
          {mentorship.body}
        </p>
      </Reveal>

      <Stagger as="ul" className="relative mt-12 grid gap-4 md:grid-cols-3">
        {mentorship.practices.map((practice, i) => (
          <StaggerItem as="li" key={practice.title}>
            <div className="glass spotlight h-full rounded-2xl p-6 transition-transform duration-300 ease-out-expo hover:-translate-y-1">
              <p className="font-display text-2xl text-accent-2-ink italic">0{i + 1}</p>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-fg">{practice.title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted">{practice.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function Testimonials() {
  return (
    <>
      <h2 id="mentorship-title" className="text-h2 text-fg">
        What people say
      </h2>
      <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem as="li" key={t.name}>
            <figure className="h-full rounded-2xl border border-line bg-surface p-6 md:p-8">
              <blockquote className="text-pretty text-fg">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium text-fg">{t.name}</span>
                <span className="text-muted"> · {t.role}</span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}
