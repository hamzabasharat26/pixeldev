import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghostLight" | "ghostDark";
type Size = "sm" | "md" | "lg";

// Focus ring comes from the global :focus-visible rule in globals.css.
const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-[transform,background-color,box-shadow,border-color] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Rust fill takes near-white text (the old navy-on-yellow rule doesn't
  // survive the accent change — navy on rust is 2.4:1). Every stop of the
  // gradient is measured against --color-surface: the lightest one, #b04a30,
  // is 5.2:1 and still clears 4.76:1 under the hover brightness lift. axe
  // cannot evaluate contrast over a gradient, so this is checked by hand —
  // do not lighten a stop without redoing the maths.
  primary:
    "bg-[linear-gradient(180deg,#b04a30,var(--color-amber-600)_52%,var(--color-amber-700))] text-surface shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_8px_22px_-8px_rgb(194_85_58/0.7)] hover:brightness-[1.05] hover:shadow-[0_1px_0_rgb(255_255_255/0.24)_inset,0_12px_30px_-8px_rgb(194_85_58/0.85)]",
  secondary:
    "bg-[linear-gradient(180deg,var(--color-navy-600),var(--color-navy))] text-d-text shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_6px_20px_-8px_rgb(6_11_20/0.6)] hover:brightness-110",
  ghostLight:
    "border border-line-2 bg-surface/70 text-ink backdrop-blur-sm hover:border-amber-600/60 hover:bg-surface",
  ghostDark:
    "glass text-d-text hover:border-amber-300/50 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.82rem]",
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-[3.25rem] px-7 text-[0.98rem]",
};

function styles(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  const newTab = /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      className={styles(variant, size, className)}
      {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={styles(variant, size, className)} {...rest}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
