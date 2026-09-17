import Image from "next/image";
import type { Screenshot } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * One device treatment for every app image on the site (§3 imagery):
 * same bezel, radius, aspect ratio, and shadow — so the grid reads as a set.
 */
export function PhoneFrame({
  screenshot,
  sizes = "(min-width: 1024px) 240px, 45vw",
  priority,
  className,
  children,
}: {
  screenshot?: Screenshot;
  sizes?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/17] w-full rounded-[2rem] bg-[#141413] p-2 shadow-[0_32px_64px_-24px_rgb(0_0_0/0.55)] ring-1 ring-white/10",
        className,
      )}
    >
      {/* side buttons */}
      <span aria-hidden className="absolute top-24 -left-0.5 h-8 w-0.5 rounded-l bg-white/10" />
      <span aria-hidden className="absolute top-16 -right-0.5 h-12 w-0.5 rounded-r bg-white/10" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-surface">
        {screenshot ? (
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={{ objectPosition: screenshot.position ?? "center top" }}
          />
        ) : (
          children
        )}
        <span
          aria-hidden
          className="absolute top-2 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full bg-[#141413]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent"
        />
      </div>
    </div>
  );
}

export function BrowserFrame({
  url,
  className,
  children,
}: {
  url: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-[#141413] shadow-[0_32px_64px_-24px_rgb(0_0_0/0.55)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="flex h-8 items-center gap-2 border-b border-white/5 px-3">
        <span aria-hidden className="size-2 rounded-full bg-white/15" />
        <span aria-hidden className="size-2 rounded-full bg-white/15" />
        <span aria-hidden className="size-2 rounded-full bg-white/15" />
        <span className="ml-2 truncate rounded-full bg-white/5 px-3 py-0.5 font-mono text-[0.625rem] text-white/40">
          {url}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Abstract, clearly-not-a-screenshot UI sketch for apps without supplied visuals. */
export function PhoneSketch({ accent }: { accent: string }) {
  return (
    <div aria-hidden className="flex h-full flex-col gap-3 px-4 pt-8 pb-4">
      <div className="h-2 w-16 rounded-full bg-white/15" />
      <div
        className="h-24 rounded-xl"
        style={{ background: `linear-gradient(135deg, ${accent}55, ${accent}11)` }}
      />
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-white/5 ring-1 ring-white/5" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-white/10" />
            <div className="h-2 flex-1 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
      <div className="mt-auto h-8 rounded-full" style={{ background: `${accent}66` }} />
    </div>
  );
}

export function DashboardSketch({ accent }: { accent: string }) {
  return (
    <div aria-hidden className="grid aspect-[16/10] grid-cols-[3rem_1fr] gap-3 p-3">
      <div className="flex flex-col gap-2 rounded-lg bg-white/5 p-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-2 rounded-full"
            style={{ background: i === 1 ? `${accent}aa` : "rgb(255 255 255 / 0.1)" }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex h-12 flex-col justify-end gap-1 rounded-lg bg-white/5 p-2 ring-1 ring-white/5">
              <div className="h-1.5 w-8 rounded-full bg-white/10" />
              <div className="h-2 w-12 rounded-full" style={{ background: `${accent}88` }} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-lg bg-white/5 p-3 ring-1 ring-white/5">
          {[40, 65, 50, 80, 55, 90, 70, 60, 85, 75].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: `linear-gradient(to top, ${accent}33, ${accent}aa)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
