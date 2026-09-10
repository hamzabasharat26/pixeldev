"use client";

/**
 * Shared motion primitives. Pure hooks + constants — no JSX, no components.
 * The rendering wrappers (<Reveal>, <ScrollProgress>) live in components/ui.
 *
 * `motion` (not framer-motion) is the animation lib; it re-exports from
 * `motion/react`.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Expo-out "rise" easing + duration, matched to the CSS `.reveal` rule. */
export const EASE_RISE = [0.22, 1, 0.36, 1] as const;
export const REVEAL_DURATION = 0.7;
export const REVEAL_RISE_PX = 18;

/**
 * `motion`'s useReducedMotion returns `boolean | null` (null before hydration).
 * Coerce null → "motion allowed" so SSR / first paint never suppresses motion
 * for users who haven't expressed a preference.
 */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() === true;
}

/**
 * IntersectionObserver "has this entered the viewport once" flag.
 * Returns [ref, shown]. `shown` starts true when motion is reduced or when
 * IntersectionObserver is unavailable, so content is never trapped hidden.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  /** viewport bottom margin before firing, e.g. "-10%" */
  rootMargin?: string;
  /** fraction visible before firing */
  threshold?: number;
}): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const reduce = usePrefersReducedMotion();
  const [shown, setShown] = useState(reduce);

  useEffect(() => {
    if (reduce || shown) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      {
        rootMargin: options?.rootMargin ?? "0px 0px -12% 0px",
        threshold: options?.threshold ?? 0,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, shown, options?.rootMargin, options?.threshold]);

  return [ref, shown];
}
