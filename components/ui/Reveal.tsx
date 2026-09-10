import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Opacity + rise as it scrolls into view. Pure CSS (globals.css `.reveal` +
 * scroll-driven animation) — no JS, no client boundary. Degrades to
 * "already visible" where unsupported or when motion is reduced.
 */
export function Reveal({
  as,
  children,
  className,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}
