import type { ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Small section label. Sentence case, mono — quiet enough to sit above a
 * heading without competing with it. Pass `as="h2"` when it *is* the section's
 * heading, so heading order stays intact.
 */
export function Eyebrow({
  children,
  className,
  tone = "dark",
  as,
}: {
  children: string;
  className?: string;
  /** "dark" = for light grounds, "light" = for dark grounds. */
  tone?: "dark" | "light";
  as?: ElementType;
}) {
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag
      className={cn(
        "text-eyebrow inline-block",
        tone === "dark" ? "text-faint" : "text-d-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
