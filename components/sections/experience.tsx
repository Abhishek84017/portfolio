import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";
import { ExperienceTimeline } from "./experience-timeline";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <Container>
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Four years of shipping, mostly as the only Flutter engineer in the room."
        />
        <ExperienceTimeline items={experience} />
      </Container>
    </Section>
  );
}
