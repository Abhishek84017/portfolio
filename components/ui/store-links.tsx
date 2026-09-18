import { ArrowUpRight } from "lucide-react";
import { AppleIcon, GooglePlayIcon } from "@/components/ui/brand-icons";
import { buttonClasses } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const stores = (p: Project) =>
  [
    p.playStoreUrl ? { key: "play", label: "Google Play", href: p.playStoreUrl, Icon: GooglePlayIcon } : null,
    p.appStoreUrl ? { key: "apple", label: "App Store", href: p.appStoreUrl, Icon: AppleIcon } : null,
  ].filter((s) => s !== null);

/**
 * Store links for a project.
 * - "icons": compact round buttons (project cards)
 * - "buttons": labelled secondary buttons (case-study dialog)
 * - "inline": text links (app previews)
 */
export function StoreLinks({
  project,
  variant,
  className,
}: {
  project: Project;
  variant: "icons" | "buttons" | "inline";
  className?: string;
}) {
  const links = stores(project);
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", variant === "inline" && "gap-x-6", className)}>
      {links.map(({ key, label, href, Icon }) => (
        <li key={key}>
          {variant === "icons" ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on ${label} (opens in a new tab)`}
              title={label}
              className="glass grid size-9 place-items-center rounded-full text-muted transition-[transform,color] duration-200 ease-out-expo hover:-translate-y-0.5 hover:text-fg"
            >
              <Icon size={15} />
            </a>
          ) : variant === "buttons" ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: "secondary", size: "sm" })}
            >
              <Icon size={14} />
              {label}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 ease-out-expo hover:text-fg"
            >
              <Icon size={14} />
              {label}
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform duration-200 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
