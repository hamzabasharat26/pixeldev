import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghostLight" | "ghostDark";
type Size = "sm" | "md" | "lg";

// Focus ring comes from the global :focus-visible rule in globals.css.
const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-[transform,background-color,box-shadow,border-color] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Mustard-brown fill, white text. Every gradient stop is measured against
  // white: the lightest, #9d6c20, is 4.57:1 and the darkest is 6.66:1.
  // axe cannot evaluate contrast over a gradient, so this is checked by hand.
  // The hover state DARKENS rather than brightening — a brightness lift on
  // #9d6c20 drops it under 4.5:1. Do not swap it back for `brightness-*`.
  primary:
    "bg-[linear-gradient(180deg,#9d6c20,#8a5f1f_54%,#7d5418)] text-white shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_8px_22px_-8px_rgb(125_84_24/0.55)] hover:bg-[linear-gradient(180deg,#8a5f1f,#7d5418_54%,#6b4917)] hover:shadow-[0_1px_0_rgb(255_255_255/0.24)_inset,0_12px_30px_-8px_rgb(125_84_24/0.7)]",
  secondary:
    "bg-[linear-gradient(180deg,var(--color-navy-600),var(--color-navy))] text-d-text shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_6px_20px_-8px_rgb(6_22_39/0.55)] hover:brightness-110",
  ghostLight:
    "border border-line-2 bg-white/70 text-ink backdrop-blur-sm hover:border-amber-600/60 hover:bg-white",
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
