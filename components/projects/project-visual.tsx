import { BrowserFrame, DashboardSketch, PhoneFrame, PhoneSketch } from "@/components/ui/device-frames";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Tinted stage + device(s). Shared by the card and the case-study dialog. */
export function ProjectVisual({ project, variant = "card" }: { project: Project; variant?: "card" | "dialog" }) {
  const [primary, secondary] = project.screenshots;
  const isCard = variant === "card";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        isCard ? "h-80 border-b border-line" : "h-full min-h-96 rounded-2xl border border-line",
      )}
      style={{
        background: `radial-gradient(120% 80% at 50% 0%, ${project.accent}40 0%, transparent 65%), color-mix(in srgb, var(--bg-secondary) 60%, transparent)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:1rem_1rem] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />

      {project.frame === "browser" ? (
        <div
          className={cn(
            "absolute left-1/2 w-[88%] -translate-x-1/2 transition-transform duration-500 ease-out-expo",
            isCard ? "top-20 group-hover:-translate-y-2" : "top-1/2 -translate-y-1/2",
          )}
        >
          <BrowserFrame url="nextgen · admin">
            <DashboardSketch accent={project.accent} />
          </BrowserFrame>
        </div>
      ) : (
        <div
          className={cn(
            "absolute left-1/2 flex -translate-x-1/2 justify-center",
            isCard ? "top-20 w-40" : "top-1/2 w-44 -translate-y-1/2 sm:w-48",
          )}
        >
          {secondary ? (
            <div
              className={cn(
                "absolute top-4 left-0 w-full transition-transform duration-500 ease-out-expo",
                isCard
                  ? "translate-x-4 rotate-6 opacity-70 group-hover:translate-x-16 group-hover:rotate-12 group-hover:opacity-100"
                  : "translate-x-16 rotate-6",
              )}
            >
              <PhoneFrame screenshot={secondary} sizes="176px" />
            </div>
          ) : null}
          <div
            className={cn(
              "relative w-full transition-transform duration-500 ease-out-expo",
              isCard && "group-hover:-translate-y-2",
              !isCard && secondary && "-translate-x-8 -rotate-3",
            )}
          >
            <PhoneFrame screenshot={primary} sizes="176px">
              <PhoneSketch accent={project.accent} />
            </PhoneFrame>
          </div>
        </div>
      )}
    </div>
  );
}
