import { Mail } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { navLinks, profile } from "@/data/profile";

/** `onHome` false → section links point back to the homepage (e.g. from /blog). */
export function Footer({ onHome = true }: { onHome?: boolean }) {
  const resolve = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);
  const year = new Date().getFullYear();
  const socials = [
    { label: "GitHub", href: profile.socials.github, icon: GithubIcon },
    ...(profile.socials.linkedin ? [{ label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon }] : []),
  ];

  return (
    <footer className="relative border-t border-line">
      <div aria-hidden className="absolute inset-x-0 -top-px mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-accent-2 to-transparent" />
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Link href={onHome ? "#top" : "/"} className="w-fit font-display text-xl font-semibold tracking-tight text-fg">
            {profile.name}
          </Link>
          <p className="text-sm text-muted">
            © {year} · Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={resolve(l.href)} className="text-muted transition-colors duration-200 ease-out-expo hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2">
          <li>
            <a
              href={`mailto:${profile.contact.email}`}
              aria-label="Email"
              className="grid size-10 place-items-center rounded-full border border-line text-muted transition-[color,border-color,transform] duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
            >
              <Mail size={18} aria-hidden />
            </a>
          </li>
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                className="grid size-10 place-items-center rounded-full border border-line text-muted transition-[color,border-color,transform] duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
              >
                <s.icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
