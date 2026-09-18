import { ArrowDown, Download } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { buttonClasses } from "@/components/ui/button";
import { Avatar } from "@/components/ui/profile-photo";
import { HeroShowcase } from "./hero-showcase";
import { profile } from "@/data/profile";

/** Stagger step for the load choreography: eyebrow → headline → subtext → CTA. */
const step = (i: number) => ({ animationDelay: `${i * 100}ms` });

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      <HeroBackdrop />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-7">
          <p
            className="animate-rise glass inline-flex items-center gap-3 rounded-full py-1 pr-4 pl-1"
            style={step(0)}
          >
            <Avatar size={32} />
            <span className="text-eyebrow text-fg">{profile.role}</span>
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
          </p>

          <h1 id="hero-title" className="text-display mt-8 text-balance text-fg">
            <span className="sr-only">
              {profile.headline.lead} {profile.headline.highlight}
            </span>
            <span aria-hidden>
              {profile.headline.lead.split(" ").map((word, i) => (
                <span key={`${word}-${i}`}>
                  <span className="animate-word whitespace-nowrap" style={{ animationDelay: `${80 + i * 55}ms` }}>
                    {word}
                  </span>{" "}
                </span>
              ))}
              <span
                className="animate-word whitespace-nowrap"
                style={{ animationDelay: `${80 + profile.headline.lead.split(" ").length * 55}ms` }}
              >
                <span className="text-shimmer font-medium italic">{profile.headline.highlight}</span>
              </span>
            </span>
          </h1>

          <p className="text-lede animate-rise mt-6 max-w-xl text-pretty text-muted" style={step(2)}>
            {profile.positioning}
          </p>

          <ul
            className="animate-rise mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-fg"
            style={step(3)}
            aria-label="At a glance"
          >
            {profile.heroFacts.map((fact, i) => (
              <li key={fact} className="flex items-center gap-3">
                {i > 0 ? <span aria-hidden className="size-1 rounded-full bg-accent-2" /> : null}
                {fact}
              </li>
            ))}
          </ul>

          <div className="animate-rise mt-12 flex flex-col gap-3 sm:flex-row sm:items-center" style={step(4)}>
            <Magnetic>
            <a href="#projects" className={buttonClasses({ className: "w-full sm:w-auto" })}>
              <span className="relative inline-flex items-center gap-2">
                View Projects
                <ArrowDown
                  size={18}
                  aria-hidden
                  className="transition-transform duration-200 ease-out-expo group-hover/btn:translate-y-0.5"
                />
              </span>
            </a>
            </Magnetic>
            <Magnetic>
            <a
              href={profile.resume.href}
              download={profile.resume.fileName}
              className={buttonClasses({ variant: "secondary", className: "w-full sm:w-auto" })}
            >
              <Download
                size={18}
                aria-hidden
                className="transition-transform duration-200 ease-out-expo group-hover/btn:translate-y-0.5"
              />
              Download Resume
            </a>
            </Magnetic>
          </div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
      <div className="animate-drift absolute -top-32 right-[-10%] size-[36rem] rounded-full bg-accent-2/15 blur-3xl" />
      <div
        className="animate-drift absolute top-48 -left-48 size-[28rem] rounded-full bg-accent-2/10 blur-3xl"
        style={{ animationDelay: "-9s" }}
      />
    </div>
  );
}
