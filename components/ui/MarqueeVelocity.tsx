"use client";

import { useEffect } from "react";

/**
 * Couples the running strips to scroll velocity: scroll fast and they surge,
 * stop and they ease back to their base speed. It makes the page feel like one
 * connected surface rather than a stack of independent widgets, and it's driven
 * entirely by the reader's own action.
 *
 * Implemented as a single CSS variable on <html> that every `.marquee-track`
 * divides its duration by — one listener and one rAF for all marquees on the
 * page, rather than per-component state. Nothing here touches layout, so it
 * can't thrash: `animation-duration` only affects the compositor's timing.
 *
 * Mount once per page that has marquees. No-op under reduced motion, which
 * leaves the strips frozen exactly as globals.css already sets them.
 */
const MAX_BOOST = 3.2;
const DECAY = 0.9;

export function MarqueeVelocity() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let lastY = window.scrollY;
    let boost = 1;
    let raf = 0;

    const tick = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - lastY);
      lastY = y;

      // Target boost from this frame's travel, then ease toward it. Easing on
      // both edges keeps it from strobing on a trackpad's jittery deltas.
      const target = Math.min(1 + delta / 26, MAX_BOOST);
      boost = boost * DECAY + target * (1 - DECAY);

      // Settled: write the resting value and STOP the loop. A rAF that never
      // exits would keep waking the main thread (and draining battery) for the
      // entire time the page is open, long after the strips are back to base
      // speed. `onScroll` restarts it the moment it's needed again.
      //
      // `delta < 0.5` rather than `=== 0`: smooth-scroll momentum and trackpad
      // inertia leave sub-pixel deltas that never quite reach zero, which would
      // keep the loop alive forever — the exact thing this branch exists to
      // prevent.
      if (delta < 0.5 && boost < 1.01) {
        boost = 1;
        raf = 0;
        root.style.setProperty("--marquee-boost", "1");
        return;
      }

      root.style.setProperty("--marquee-boost", boost.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty("--marquee-boost");
    };
  }, []);

  return null;
}
