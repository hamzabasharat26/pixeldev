import type { ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Small mono section label with an amber tick. Pass `as="h2"` when it's the
 * actual heading for a section (keeps the visual, fixes heading order).
 */
export function Eyebrow({
  children,
  className,
  tone = "dark",
  as,
}: {
  children: string;
  className?: string;
  /** "dark" = for light backgrounds, "light" = for dark backgrounds. */
  tone?: "dark" | "light";
  as?: ElementType;
}) {
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag
      className={cn(
        "text-eyebrow inline-flex items-center gap-2.5 font-medium",
        tone === "dark" ? "text-faint" : "text-d-muted",
        className,
      )}
    >
      <span className="h-px w-6 bg-amber" aria-hidden="true" />
      {children}
    </Tag>
  );
}
