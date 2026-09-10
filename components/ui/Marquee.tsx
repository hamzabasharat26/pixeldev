import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-only infinite marquee. Content is rendered twice for a seamless loop;
 * pauses on hover; frozen entirely under prefers-reduced-motion (globals.css).
 */
export function Marquee({
  children,
  direction = "left",
  durationSeconds = 38,
  gapClassName = "gap-10 pe-10",
  className,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  durationSeconds?: number;
  /** Spacing between items and the trailing gap — must match, or the loop jumps. */
  gapClassName?: string;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      className={cn(
        "marquee-root group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]",
        className,
      )}
    >
      <ul
        className="marquee-track m-0 list-none p-0"
        data-direction={direction}
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
        aria-label={ariaLabel}
      >
        {/* Two identical copies, each carrying its own trailing gap, so the
            -50% translate wraps seamlessly. */}
        <li className={cn("flex shrink-0 items-center", gapClassName)}>
          {children}
        </li>
        <li
          className={cn("flex shrink-0 items-center", gapClassName)}
          aria-hidden="true"
        >
          {children}
        </li>
      </ul>
    </div>
  );
}
