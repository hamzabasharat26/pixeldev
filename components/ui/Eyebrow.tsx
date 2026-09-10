import { cn } from "@/lib/utils";

/**
 * Small mono section label. Carries a real name for the section — an amber
 * tick anchors it as a structural marker rather than floating caps.
 */
export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: string;
  className?: string;
  /** "dark" = for light backgrounds, "light" = for dark backgrounds. */
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-2.5",
        tone === "dark" ? "text-faint" : "text-d-muted",
        className,
      )}
    >
      <span className="h-px w-6 bg-amber" aria-hidden="true" />
      {children}
    </span>
  );
}
