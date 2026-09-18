import { ArrowUp, ArrowUpRight, ChevronDown, Mail } from "lucide-react";
import Link from "next/link";
import { EmailChooser } from "@/components/contact/email-chooser";
import { Reveal } from "@/components/motion/reveal";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { navLinks, profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Channel = {
  label: string;
  detail: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  external: boolean;
  primary?: boolean;
  chooser?: boolean;
};

const channels: Channel[] = [
  {
    label: "Chat on WhatsApp",
    detail: profile.contact.whatsapp.display,
    href: profile.contact.whatsapp.href,
    icon: WhatsappIcon,
    external: true,
    primary: true,
  },
  {
    label: "Email me",
    detail: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
    icon: Mail,
    external: false,
    chooser: true,
  },
  ...(profile.socials.linkedin
    ? [
        {
          label: "Connect on LinkedIn",
          detail: "abhishek-patel-flutter",
          href: profile.socials.linkedin,
          icon: LinkedinIcon,
          external: true,
        },
      ]
    : []),
];

/** `onHome` false → section links point back to the homepage (e.g. from /blog). */
export function Footer({ onHome = true }: { onHome?: boolean }) {
  const resolve = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-accent-2 to-transparent"
      />
      <Container className="py-16 md:py-24">
        {/* Let's talk */}
        <Reveal className="glass relative overflow-hidden rounded-3xl p-6 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 size-72 rounded-full bg-accent-2/20 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="min-w-0 lg:col-span-5">
              <p className="text-eyebrow flex items-center gap-2 text-muted">
                <span aria-hidden className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Open to new opportunities
              </p>
              <h2 className="text-h2 mt-4 text-balance text-fg">
                Let&apos;s <span className="font-medium italic">talk</span>.
              </h2>
              <p className="mt-4 text-pretty text-muted">
                The fastest way to reach me is WhatsApp — or drop an email, or connect on LinkedIn.
              </p>
            </div>

            <ul className="flex min-w-0 flex-col gap-3 lg:col-span-7">
              {channels.map((c) => {
                const classes = cn(
                  "group/ch flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-[transform,box-shadow,background-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card-hover",
                  c.primary ? "bg-accent text-[var(--on-accent)]" : "glass-strong text-fg",
                );
                const body = (trailing: React.ReactNode) => (
                  <>
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 ease-out-expo group-hover/ch:-rotate-6 group-hover/ch:scale-110",
                        c.primary ? "bg-[#25d366] text-white" : "border border-line bg-elevated",
                      )}
                    >
                      <c.icon size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-semibold tracking-tight">{c.label}</span>
                      <span className={cn("block truncate text-sm", c.primary ? "opacity-70" : "text-muted")}>
                        {c.detail}
                      </span>
                    </span>
                    {trailing}
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.chooser ? (
                      <EmailChooser triggerClassName={classes}>
                        {body(
                          <ChevronDown
                            size={20}
                            aria-hidden
                            className="shrink-0 transition-transform duration-300 ease-out-expo group-aria-expanded/email:rotate-180"
                          />,
                        )}
                      </EmailChooser>
                    ) : (
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={classes}
                      >
                        {body(
                          <ArrowUpRight
                            size={20}
                            aria-hidden
                            className="shrink-0 transition-transform duration-300 ease-out-expo group-hover/ch:translate-x-1 group-hover/ch:-translate-y-1"
                          />,
                        )}
                        {c.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <Link
              href={onHome ? "#top" : "/"}
              className="w-fit font-display text-xl font-semibold tracking-tight text-fg"
            >
              {profile.name}
            </Link>
            <p className="text-sm text-muted">© {year} · Built with Next.js, Tailwind CSS & Framer Motion</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={resolve(l.href)}
                    className="text-muted transition-colors duration-200 ease-out-expo hover:text-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="glass grid size-10 place-items-center rounded-full text-muted transition-[color,transform] duration-200 ease-out-expo hover:-translate-y-0.5 hover:text-fg"
            >
              <GithubIcon size={18} />
            </a>
            <Link
              href={onHome ? "#top" : "/"}
              aria-label="Back to top"
              className="glass group/top grid size-10 place-items-center rounded-full text-muted transition-[color,transform] duration-200 ease-out-expo hover:-translate-y-0.5 hover:text-fg"
            >
              <ArrowUp
                size={18}
                aria-hidden
                className="transition-transform duration-300 ease-out-expo group-hover/top:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
