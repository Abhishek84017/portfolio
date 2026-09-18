import { ArrowUpRight, Mail, Phone, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { Reveal } from "@/components/motion/reveal";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/brand-icons";
import { Container, Section } from "@/components/ui/container";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Method = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon | typeof GithubIcon;
  external?: boolean;
};

const methods: Method[] = [
  { label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}`, icon: Mail },
  {
    label: "WhatsApp",
    value: "Message me on WhatsApp",
    href: profile.contact.whatsapp.href,
    icon: WhatsappIcon,
    external: true,
  },
  { label: "Phone", value: profile.contact.phone, href: profile.contact.phoneHref, icon: Phone },
  ...(profile.socials.linkedin
    ? [{ label: "LinkedIn", value: "Connect on LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon, external: true }]
    : []),
  {
    label: "GitHub",
    value: profile.socials.github.replace("https://", ""),
    href: profile.socials.github,
    icon: GithubIcon,
    external: true,
  },
];

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" className="isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 size-[48rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-2/20 blur-3xl" />
      </div>
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-eyebrow flex items-center gap-3 text-muted">
              <span aria-hidden className="h-px w-8 bg-accent-2" />
              Contact
            </p>
            <h2 id="contact-title" className="text-h2 mt-4 text-balance text-fg">
              Let&apos;s build something people <span className="text-shimmer font-medium italic">actually use</span>.
            </h2>
            <p className="text-lede mt-4 text-pretty text-muted">
              Hiring for a Flutter role, or need someone to take an app from idea to store? Send a note — or
              reach me directly.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <ul className="flex flex-col gap-3">
              {methods.map((m) => (
                <li key={m.label} className="relative">
                  <a
                    href={m.href}
                    {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "glass spotlight group/method flex min-w-0 items-center gap-4 rounded-2xl p-4 transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card-hover",
                      m.label === "Email" && "pr-16",
                    )}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-bg text-fg transition-colors duration-200 ease-out-expo group-hover/method:border-accent group-hover/method:bg-accent group-hover/method:text-[var(--on-accent)]">
                      <m.icon size={18} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted">{m.label}</span>
                      <span className="block truncate font-medium text-fg">{m.value}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className={cn(
                        "shrink-0 text-muted transition-transform duration-200 ease-out-expo group-hover/method:translate-x-0.5 group-hover/method:-translate-y-0.5 group-hover/method:text-fg",
                        m.label === "Email" && "hidden",
                      )}
                    />
                    {m.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                  </a>
                  {m.label === "Email" ? (
                    <span className="absolute top-1/2 right-3 -translate-y-1/2">
                      <CopyEmail email={profile.contact.email} />
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </Container>
    </Section>
  );
}
