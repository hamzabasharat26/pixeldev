"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/**
 * Magnetic hover: the wrapped element leans toward the pointer while it's
 * nearby, then springs back. Pairs with the round cursor — the two together are
 * what make a control feel like it's reacting to you rather than just being
 * hovered.
 *
 * Motion that answers a person's action, so it earns its place; it is still
 * skipped entirely on coarse pointers (nothing to be magnetic toward) and under
 * prefers-reduced-motion.
 *
 * The transform lives on an inner wrapper, never on the child itself, so it
 * can't fight the button's own hover/active transforms.
 */
export function Magnetic({
  children,
  strength = 0.35,
  radius = 90,
  className,
}: {
  children: ReactNode;
  /** How far it follows, as a fraction of pointer distance. */
  strength?: number;
  /** Extra px around the element that still counts as "near". */
  radius?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = wrap.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Near = inside the box grown by `radius`, measured per-axis so wide
      // buttons don't get a circular hot-zone that misses their ends.
      const near =
        Math.abs(dx) < r.width / 2 + radius &&
        Math.abs(dy) < r.height / 2 + radius;

      if (near) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(el);
    };
  }, [strength, radius]);

  return (
    <span ref={wrap} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
