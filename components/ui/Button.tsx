import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghostLight" | "ghostDark";
type Size = "sm" | "md" | "lg";

// Focus ring comes from the global :focus-visible rule in globals.css.
const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[transform,background-color,box-shadow,border-color] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Amber fill takes navy text, never white. Vertical gradient + soft amber glow.
  primary:
    "bg-[linear-gradient(180deg,var(--color-amber-300),var(--color-amber)_55%,var(--color-amber-600))] text-navy shadow-[0_1px_0_rgb(255_255_255/0.35)_inset,0_6px_20px_-6px_rgb(233_161_60/0.6)] hover:shadow-[0_1px_0_rgb(255_255_255/0.4)_inset,0_10px_28px_-6px_rgb(233_161_60/0.75)] hover:brightness-[1.03]",
  secondary:
    "bg-[linear-gradient(180deg,var(--color-navy-600),var(--color-navy))] text-white shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_6px_20px_-8px_rgb(7_14_28/0.5)] hover:brightness-110",
  ghostLight:
    "border border-line-2 bg-surface/60 text-ink hover:border-amber-600 hover:bg-surface",
  ghostDark:
    "border border-white/15 bg-white/5 text-d-text hover:border-amber/60 hover:bg-white/10",
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
      {children}
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
      {children}
    </button>
  );
}
