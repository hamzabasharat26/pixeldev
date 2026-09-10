import { cn } from "@/lib/utils";

/**
 * The mark: a forward chevron with the accent node at its tip — the signal
 * reaching its target. Traced from the studio logo.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 40"
      fill="none"
      role="img"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <path
        d="M9 8 L24 20 L9 32"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="27"
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
  /** "dark" wordmark for light grounds, "light" for dark grounds. */
  variant?: "dark" | "light";
  /** Show the SOLUTIONS line under the wordmark (the full lockup). */
  withSolutions?: boolean;
  className?: string;
};

/**
 * Full lockup: PIXELDEV over SOLUTIONS, matching the supplied logo —
 * geometric caps, tight on the wordmark, wide on the descriptor.
 */
export function Logo({
  variant = "dark",
  withSolutions = false,
  className,
}: LogoProps) {
  const word = variant === "dark" ? "text-ink" : "text-d-text";
  // The brand accent fails small-text contrast on paper; step down there.
  const accent = variant === "dark" ? "text-amber-600" : "text-amber-300";
  const sub = variant === "dark" ? "text-faint" : "text-d-muted";

  return (
    <span className={cn("inline-flex items-center gap-2.5", word, className)}>
      <LogoMark className="h-7 w-7 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.16rem] font-bold uppercase tracking-[-0.01em]">
          Pixel<span className={accent}>Dev</span>
        </span>
        {withSolutions && (
          <span
            className={cn(
              "mt-[3px] font-display text-[0.5rem] font-medium uppercase tracking-[0.42em]",
              sub,
            )}
          >
            Solutions
          </span>
        )}
      </span>
    </span>
  );
}
