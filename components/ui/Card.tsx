import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Surface container.
 *   tone="paper" — white card on the warm paper ground: subtle top-to-bottom
 *     tint, hairline border, inner highlight line at the top edge.
 *   tone="navy"  — raised panel inside a dark section.
 * `interactive` adds lift + glow + amber border on hover.
 */
export function Card({
  children,
  tone = "paper",
  interactive = false,
  className,
}: {
  children: ReactNode;
  tone?: "paper" | "navy";
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-card)] p-6 md:p-7",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:rounded-t-[var(--radius-card)]",
        tone === "paper"
          ? "border border-line bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-2))] before:bg-white/70"
          : "border border-d-line bg-[linear-gradient(180deg,var(--color-d-surface-2),var(--color-d-surface))] before:bg-white/8",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1",
        interactive &&
          tone === "paper" &&
          "hover:border-amber-600/60 hover:shadow-e2",
        interactive &&
          tone === "navy" &&
          "hover:border-amber/50 hover:shadow-[0_18px_50px_-16px_rgb(233_161_60/0.25)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
