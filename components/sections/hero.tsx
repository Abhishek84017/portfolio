import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import { Magnetic } from "@/components/motion/magnetic";
import { buttonClasses } from "@/components/ui/button";
import { PhoneFrame } from "@/components/ui/device-frames";
import { Avatar } from "@/components/ui/profile-photo";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const solnce = projects.find((p) => p.slug === "solnce")!;
const bestill = projects.find((p) => p.slug === "bestill")!;

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
                  <span className="animate-word" style={{ animationDelay: `${80 + i * 55}ms` }}>
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

        <HeroDevices />
      </div>
    </section>
  );
}

function HeroDevices() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none" aria-hidden>
      <div className="relative mx-auto flex h-96 w-full max-w-sm items-center justify-center sm:h-[32rem]">
        <div
          className="animate-float-in absolute top-12 left-0 w-40 -rotate-6 opacity-80 sm:w-48"
          style={{ animationDelay: "350ms" }}
        >
          <div className="animate-bob" style={{ animationDelay: "-3s" }}>
            <PhoneFrame screenshot={bestill.screenshots[0]} sizes="200px" />
          </div>
        </div>
        <div
          className="animate-float-in relative z-10 ml-16 w-48 rotate-3 sm:w-60"
          style={{ animationDelay: "200ms" }}
        >
          <div className="animate-bob">
            <PhoneFrame screenshot={solnce.screenshots[0]} sizes="(min-width: 640px) 240px, 192px" priority />
          </div>
        </div>

        <div
          className="animate-rise glass-strong absolute right-0 bottom-8 z-20 flex items-center gap-3 rounded-2xl p-3 pr-4 shadow-card-hover sm:bottom-12"
          style={{ animationDelay: "700ms" }}
        >
          {solnce.icon ? (
            <Image src={solnce.icon.src} alt="" width={40} height={40} className="size-10 rounded-xl" />
          ) : null}
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold text-fg">10,000+</p>
            <p className="text-xs text-muted">installs · Solnce</p>
          </div>
        </div>
      </div>
    </div>
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
