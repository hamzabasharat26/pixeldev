"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { clamp01, watchScroll } from "@/lib/scroll-watch";

/**
 * Draws the process line as you scroll through the four steps, and lights
 * each step's dot as the line reaches it. The steps really are a sequence, so
 * progress motion carries meaning here rather than decorating.
 *
 * Follows the scroll while the steps' top travels from 78% to 30% of the
 * viewport, wide screens only (the line is hidden when the steps stack).
 * Without JS, or under reduced motion, the line is simply drawn in full: the
 * start state is applied by GSAP, never by CSS.
 */
export function ProcessMotion() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = probe.current?.closest<HTMLElement>("[data-process]");
    const line = wrap?.querySelector<HTMLElement>("[data-process-line]");
    if (!wrap || !line) return;
    const dots = Array.from(wrap.querySelectorAll<HTMLElement>("[data-process-dot]"));

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", (context) => {
      let draw: ((value: number) => void) | undefined;
      const stop = watchScroll(wrap, (r, vh) => {
        const p = clamp01((0.78 * vh - r.top) / (0.48 * vh));
        // Set up on first approach, not at load: the steps sit far below the
        // fold, and a GSAP set reads computed style. Added to the context so
        // it still reverts; nothing is returned, or GSAP would treat it as a
        // cleanup function.
        if (!draw) {
          context.add(() => {
            gsap.set(line, { scaleX: p });
            draw = gsap.quickTo(line, "scaleX", { duration: 0.5, ease: "power3.out" });
          });
        }
        draw?.(p);
        dots.forEach((d, i) => d.classList.toggle("is-lit", p >= i / dots.length + 0.02));
      });
      return () => {
        stop();
        dots.forEach((d) => d.classList.remove("is-lit"));
      };
    });

    return () => mm.revert();
  }, []);

  return <span ref={probe} hidden />;
}
