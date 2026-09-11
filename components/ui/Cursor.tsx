"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Round trailing cursor.
 *
 * A ring that lags the pointer and a dot that tracks it exactly; the gap
 * between the two is the whole effect. GSAP's `quickTo` reuses one tween per
 * axis instead of allocating a new one on every mousemove.
 *
 * Three modes:
 *   - idle: the ring
 *   - over a control: the ring swells and fills
 *   - over project media (anything with `data-cursor="Label"`): the ring
 *     becomes the site's detection frame, with the label inside it
 *
 * It removes itself whenever it would be a liability: on coarse pointers
 * (touch has no cursor to decorate, and hiding the native one would be
 * harmful) and under `prefers-reduced-motion`. The native cursor is only hidden
 * (via `.cursor-ready` on <html>) once we know we've replaced it, so a JS
 * failure can never leave someone with no pointer at all.
 */
const INTERACTIVE = 'a,button,[role="button"],input,select,textarea,summary,label';
const LABELLED = "[data-cursor]";

type Mode = "idle" | "hit" | "view";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;

    const root = document.documentElement;
    root.classList.add("cursor-ready");

    // Park off-screen until the first real move, so it never flashes at 0,0.
    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

    let mode: Mode = "idle";
    let currentLabel = "";

    const setMode = (next: Mode, text = "") => {
      if (next === mode && text === currentLabel) return;
      mode = next;
      currentLabel = text;

      if (next === "view") {
        label.textContent = text;
        ring.classList.add("is-view");
        gsap.to(ring, {
          width: 78,
          height: 78,
          borderRadius: 12,
          scale: 1,
          borderColor: "rgb(79 195 232 / 0)",
          backgroundColor: "rgb(6 22 39 / 0.78)",
          duration: 0.32,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 1, duration: 0.2, delay: 0.08 });
        gsap.to(dot, { scale: 0, duration: 0.2 });
        return;
      }

      ring.classList.remove("is-view");
      gsap.to(label, { opacity: 0, duration: 0.12 });
      const hit = next === "hit";
      gsap.to(ring, {
        width: 34,
        height: 34,
        borderRadius: 17,
        scale: hit ? 1.75 : 1,
        borderColor: hit ? "var(--color-amber-600)" : "var(--color-amber)",
        backgroundColor: hit ? "rgb(200 138 46 / 0.14)" : "rgb(200 138 46 / 0)",
        duration: 0.28,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: hit ? 0 : 1, duration: 0.22, ease: "power3.out" });
    };

    const onMove = (e: PointerEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    // Delegated, so it keeps working for anything React renders later. Only
    // acts when the mode actually changes.
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const labelled = t?.closest?.<HTMLElement>(LABELLED);
      if (labelled) return setMode("view", labelled.dataset.cursor ?? "");
      setMode(t?.closest?.(INTERACTIVE) ? "hit" : "idle");
    };

    const restScale = () => (mode === "hit" ? 1.75 : 1);
    const onDown = () => gsap.to(ring, { scale: restScale() * 0.85, duration: 0.14 });
    const onUp = () => gsap.to(ring, { scale: restScale(), duration: 0.22 });
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
      gsap.killTweensOf([ring, dot, label]);
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-layer">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
