import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out-expo " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[var(--on-accent)] shadow-card hover:-translate-y-0.5 hover:shadow-card-hover " +
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full before:transition-transform before:duration-700 before:ease-out-expo hover:before:translate-x-full",
  secondary:
    "glass text-fg hover:-translate-y-0.5 hover:shadow-card-hover",
  ghost: "text-muted hover:bg-elevated hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-base",
  sm: "h-10 px-4 text-sm",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size }) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...props}>
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </a>
  );
}
