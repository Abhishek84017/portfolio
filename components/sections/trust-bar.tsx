import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/profile";

export function TrustBar() {
  return (
    <section aria-label="Career at a glance" className="relative">
      <Container>
        <Reveal>
          <dl className="glass spotlight grid grid-cols-2 overflow-hidden rounded-2xl lg:grid-cols-4">
            {profile.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "flex flex-col gap-2 p-6 md:p-8",
                  i % 2 === 1 ? "border-l border-line" : "",
                  i >= 2 ? "border-t border-line lg:border-t-0" : "",
                  i === 2 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <dt className="order-2 text-sm text-muted">{stat.label}</dt>
                <dd className="order-1 font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
