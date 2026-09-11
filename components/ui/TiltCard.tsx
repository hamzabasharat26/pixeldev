"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/**
 * Tilts toward the pointer while hovered, like a card held up to the light.
 * Motion that answers the reader, not motion that plays at them.
 *
 * The card's rect is read once on enter, not on every move: the tilt itself
 * changes the rect, and re-measuring each frame would feed that back into the
 * angle and make it jitter. Fine pointers only, and off under reduced motion.
 * The transform lives on this wrapper so it can't fight the child's own
 * hover lift.
 */
export function TiltCard({
  children,
  className,
  max = 4.5,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees at the card's edge. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { transformPerspective: 1000, transformOrigin: "50% 50%" });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.55, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.55, ease: "power3.out" });
    let rect: DOMRect | null = null;

    const onEnter = () => {
      rect = el.getBoundingClientRect();
    };
    const onMove = (e: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      ry(nx * max * 2);
      rx(-ny * max * 2);
    };
    const onLeave = () => {
      rect = null;
      rx(0);
      ry(0);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [max]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
