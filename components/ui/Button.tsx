import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghostLight" | "ghostDark";
type Size = "md" | "lg";

// Focus ring comes from the global :focus-visible rule in globals.css.
const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Amber fill takes navy text, never white (brief §4.1).
  primary: "bg-amber text-navy hover:bg-amber-600",
  secondary: "bg-navy text-white hover:bg-navy-600",
  ghostLight: "border border-navy text-navy hover:bg-navy/5",
  ghostDark: "border border-surface-border text-grey-50 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
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
