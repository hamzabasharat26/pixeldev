"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Opacity + 18px rise on first scroll-in. Uses the `.reveal` CSS rule, so it
 * degrades to "already visible" under prefers-reduced-motion and never traps
 * content hidden when JS/observer don't fire.
 */
export function Reveal({
  as,
  children,
  className,
  delayMs = 0,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const [ref, shown] = useReveal<HTMLElement>();
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      ref={ref}
      data-shown={shown ? "true" : "false"}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
