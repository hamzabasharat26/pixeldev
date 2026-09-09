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
  className,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  durationSeconds?: number;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      className={cn(
        "marquee-root group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]",
        className,
      )}
      role="marquee"
      aria-label={ariaLabel}
    >
      <div
        className="marquee-track gap-12"
        data-direction={direction}
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
      >
        <div className="flex shrink-0 items-center gap-12" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
