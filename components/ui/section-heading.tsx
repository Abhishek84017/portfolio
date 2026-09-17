import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="text-eyebrow flex items-center gap-3 text-muted">
        <span
          aria-hidden
          className={cn("h-px w-8 bg-accent-2", align === "center" && "hidden")}
        />
        {eyebrow}
      </p>
      <h2 id={id} className="text-h2 mt-4 text-balance text-fg">
        {title}
      </h2>
      {lede ? <p className="text-lede mt-4 text-pretty text-muted">{lede}</p> : null}
    </Reveal>
  );
}
