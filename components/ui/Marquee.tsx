import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MarqueeDriver } from "./MarqueeDriver";

/**
 * Infinite marquee. The CSS animation sets base speed and direction, so it
 * runs with no JS; MarqueeDriver then eases its playbackRate for scroll surge,
 * hover brake, the pause button and offscreen pausing. Content is rendered
 * twice for a seamless loop. Frozen entirely under prefers-reduced-motion.
 *
 * Deliberately NOT a Tailwind `group`: `group-hover:` matches any hovered
 * ancestor, so a group on the root made hovering one card restyle every card
 * in the strip at once.
 */
export function Marquee({
  children,
  id,
  direction = "left",
  durationSeconds = 38,
  gapClassName = "gap-10 pe-10",
  className,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  /** Needed to be targeted by a MarqueeToggle. */
  id?: string;
  direction?: "left" | "right";
  durationSeconds?: number;
  /** Spacing between items and the trailing gap — must match, or the loop jumps. */
  gapClassName?: string;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "marquee-root overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]",
        className,
      )}
    >
      <MarqueeDriver />
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
