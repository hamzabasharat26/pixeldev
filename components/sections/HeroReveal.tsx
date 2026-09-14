"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { clamp01, watchScroll } from "@/lib/scroll-watch";

/**
 * The hero's pointer- and scroll-driven behaviour:
 *
 *   1. Pointer parallax: the robot, the panel and the aurora track the pointer
 *      by different amounts, so they separate in depth as you move.
 *   2. Scrolling away lifts and softens the robot while the aurora parallaxes,
 *      so the hero hands off to the page instead of just scrolling out.
 *
 * The load sequence is NOT here any more. It was a GSAP timeline that ran on
 * hydration, behind a guard that skipped it if more than 1.2s had passed (so a
 * late replay could not flash). Hydration measured about 1.8s on a fast machine
 * over localhost, so the guard always won and the intro never played for
 * anyone. It now runs in CSS from first paint: see the hero intro block in
 * globals.css, and the server-rendered word spans in Hero.tsx.
 *
 * Each motion owns its own element, so none fight over a transform: pointer
 * parallax on [data-hero-visual], scroll on the [data-hero-stage] inside it,
 * and on the aurora the pointer and scroll share GSAP's transform cache while
 * its idle drift runs in CSS on the blobs inside.
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

    const section = root.closest("section");
    const visual = root.querySelector<HTMLElement>("[data-hero-visual]");
    const stage = root.querySelector<HTMLElement>("[data-hero-stage]");
    const panel = root.querySelector<HTMLElement>("[data-hero-panel]");
    const aurora = section?.querySelector<HTMLElement>("[data-hero-aurora]") ?? null;
    let detachParallax: (() => void) | undefined;
    let detachScroll: (() => void) | undefined;

    const ctx = gsap.context(() => {
      detachScroll = attachScroll(section, stage, aurora);
      detachParallax = attachParallax(root, visual, panel, aurora);
    }, root);

    return () => {
      detachParallax?.();
      detachScroll?.();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}

/**
 * Scroll hand-off, from the hero's top at the top of the viewport to its bottom
 * there. One `quickTo` glides the scroll progress (a plain object, so no DOM
 * reads), and `quickSetter`s write the values. Tweens on the elements
 * themselves read computed style to find their start values, and each of those
 * reads forced a full-page style recalculation during load. Transform and
 * opacity only.
 */
function attachScroll(
  section: HTMLElement | null,
  stage: HTMLElement | null,
  aurora: HTMLElement | null,
) {
  if (!section) return undefined;

  // Made on the first scroll, not at load: creating a transform setter reads
  // the element's computed transform once.
  let write: ((p: number) => void) | undefined;
  const makeWriter = () => {
    const y = stage ? gsap.quickSetter(stage, "yPercent") : null;
    const sx = stage ? gsap.quickSetter(stage, "scaleX") : null;
    const sy = stage ? gsap.quickSetter(stage, "scaleY") : null;
    const fade = stage ? gsap.quickSetter(stage, "opacity") : null;
    const glow = aurora ? gsap.quickSetter(aurora, "yPercent") : null;
    return (p: number) => {
      y?.(-8 * p);
      sx?.(1 - 0.06 * p);
      sy?.(1 - 0.06 * p);
      fade?.(1 - 0.5 * p);
      glow?.(16 * p);
    };
  };

  const progress = { p: 0 };
  const glide = gsap.quickTo(progress, "p", {
    duration: 0.6,
    ease: "power3.out",
    onUpdate: () => {
      write ??= makeWriter();
      write(progress.p);
    },
  });

  // At rest every value is already its default, so a page load does nothing.
  let last = 0;
  const stopWatching = watchScroll(section, (r) => {
    const p = clamp01(-r.top / r.height);
    if (p === last) return;
    last = p;
    glide(p);
  });

  // Pause the aurora's CSS drift while the hero is off screen.
  const io = new IntersectionObserver(([entry]) =>
    section.classList.toggle("hero-offscreen", !entry.isIntersecting),
  );
  io.observe(section);

  return () => {
    stopWatching();
    io.disconnect();
    section.classList.remove("hero-offscreen");
  };
}

/**
 * Pointer parallax. Robot, panel and aurora take different multipliers, which
 * is what reads as depth: matching them would just slide the whole group.
 */
function attachParallax(
  root: HTMLElement,
  visual: HTMLElement | null,
  panel: HTMLElement | null,
  aurora: HTMLElement | null,
) {
  if (!visual) return undefined;
  if (!window.matchMedia("(pointer: fine)").matches) return undefined;

  const vx = gsap.quickTo(visual, "x", { duration: 0.9, ease: "power3.out" });
  const vy = gsap.quickTo(visual, "y", { duration: 0.9, ease: "power3.out" });
  const px = panel ? gsap.quickTo(panel, "x", { duration: 1.1, ease: "power3.out" }) : null;
  const py = panel ? gsap.quickTo(panel, "y", { duration: 1.1, ease: "power3.out" }) : null;
  // The light moves slowest and furthest back: the deepest layer.
  const ax = aurora ? gsap.quickTo(aurora, "x", { duration: 1.8, ease: "power2.out" }) : null;
  const ay = aurora ? gsap.quickTo(aurora, "y", { duration: 1.8, ease: "power2.out" }) : null;

  const onMove = (e: PointerEvent) => {
    const r = root.getBoundingClientRect();
    // -1..1 from the centre of the hero.
    const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);

    vx(nx * 16);
    vy(ny * 10);
    // Opposite direction and further, so the panel floats in front.
    px?.(nx * -22);
    py?.(ny * -13);
    ax?.(nx * 36);
    ay?.(ny * 22);
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    gsap.killTweensOf([visual, panel, aurora].filter(Boolean) as HTMLElement[]);
  };
}
