import { cn } from "@/lib/utils";

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs leading-4 text-muted",
        "transition-colors duration-200 ease-out-expo",
        className,
      )}
    >
      {children}
    </span>
  );
}
