"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

function ScrollResetOnRouteChange() {
  const lenis = useLenis();
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    // Don't fight the initial load, a #hash target, or scroll restoration.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (typeof window !== "undefined" && window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

/**
 * Lenis smooth scroll. Skipped entirely when the visitor prefers reduced
 * motion — native scrolling takes over and nothing hijacks the wheel.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.12, wheelMultiplier: 1, touchMultiplier: 1.6 }}
    >
      <ScrollResetOnRouteChange />
      {children}
    </ReactLenis>
  );
}
