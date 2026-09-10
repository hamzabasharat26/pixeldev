"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Round trailing cursor.
 *
 * A ring that lags the pointer and a dot that tracks it exactly — the gap
 * between the two is the whole effect. GSAP's `quickTo` is used rather than a
 * rAF loop because it reuses one tween per axis instead of allocating a new
 * one on every mousemove.
 *
 * It is strictly an enhancement and removes itself whenever it would be a
 * liability:
 *   - coarse pointers (touch) — there is no cursor to decorate, and hiding the
 *     native one there would be actively harmful
 *   - `prefers-reduced-motion` — a lagging element is exactly the kind of
 *     motion that setting is asking us to stop
 * In both cases the native cursor is left completely alone. The native cursor
 * is only hidden (via `.cursor-ready` on <html>) once we know we've replaced
 * it, so a JS failure can never leave someone with no pointer at all.
 */
const INTERACTIVE = 'a,button,[role="button"],input,select,textarea,summary,label';

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const root = document.documentElement;
    root.classList.add("cursor-ready");

    // Park off-screen until the first real move, so it never flashes at 0,0.
    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    // Delegated so it keeps working for anything React renders later.
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const hit = t?.closest?.(INTERACTIVE);
      gsap.to(ring, {
        scale: hit ? 1.75 : 1,
        borderColor: hit
          ? "var(--color-amber-600)"
          : "var(--color-amber)",
        backgroundColor: hit
          ? "rgb(200 138 46 / 0.14)"
          : "rgb(200 138 46 / 0)",
        duration: 0.28,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: hit ? 0 : 1, duration: 0.22, ease: "power3.out" });
    };

    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.14 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.22 });
    const onLeave = () => gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([ring, dot], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      root.classList.remove("cursor-ready");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      gsap.killTweensOf([ring, dot]);
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-layer">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
