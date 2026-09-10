import { cn } from "@/lib/utils";

/**
 * The chevron mark: a forward `>` in currentColor with the amber node at its
 * tip — the "signal" reaching its target. Recreated from the studio logo.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <path
        d="M9 8 L25 20 L9 32"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="26.5"
        y="15.5"
        width="9"
        height="9"
        rx="2.25"
        fill="var(--color-amber)"
      />
    </svg>
  );
}

type LogoProps = {
  /** "dark" wordmark for light backgrounds, "light" for dark backgrounds. */
  variant?: "dark" | "light";
  withSolutions?: boolean;
  className?: string;
};

export function Logo({
  variant = "dark",
  withSolutions = false,
  className,
}: LogoProps) {
  const wordColor = variant === "dark" ? "text-ink" : "text-d-text";
  // Brand amber fails contrast as small text on paper; use the text-safe amber
  // for the light-background lockup.
  const accent = variant === "dark" ? "text-amber-600" : "text-amber";

  return (
    <span className={cn("inline-flex items-center gap-2.5", wordColor, className)}>
      <LogoMark className="h-7 w-7 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-bold tracking-tight">
          Pixel<span className={accent}>Dev</span>
        </span>
        {withSolutions && (
          <span className="text-eyebrow mt-1 text-[0.6rem] tracking-[0.3em] opacity-70">
            Solutions
          </span>
        )}
      </span>
    </span>
  );
}
