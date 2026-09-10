"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/**
 * The page's single orchestrated moment: one load sequence for the whole hero,
 * rather than a fade-and-rise on every section (which is the generic default
 * and reads as machine-generated).
 *
 * Children stay server-rendered. Anything tagged `data-hero-step` joins the
 * timeline in DOM order.
 *
 * The hidden-start state is applied in JS and ONLY after we've confirmed
 * motion is allowed. Putting `opacity: 0` in the stylesheet would mean a JS
 * failure, or an unsupported browser, leaves the hero permanently blank — this
 * codebase has already shipped that bug once with a CSS-hidden reveal. Here
 * the markup renders visible and JS opts into animating it.
 */
export function HeroReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = scope.current;
    if (!root) return;

    const steps = root.querySelectorAll<HTMLElement>("[data-hero-step]");
    if (!steps.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.75 },
      });

      tl.from(steps, { y: 22, opacity: 0, stagger: 0.09 });

      const visual = root.querySelector<HTMLElement>("[data-hero-visual]");
      if (visual) {
        tl.from(
          visual,
          { y: 40, opacity: 0, scale: 0.97, duration: 1.0 },
          0.15, // overlaps the copy so it reads as one move, not two
        );
      }

      const panel = root.querySelector<HTMLElement>("[data-hero-panel]");
      if (panel) {
        tl.from(panel, { y: 26, opacity: 0, duration: 0.7 }, 0.72);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
