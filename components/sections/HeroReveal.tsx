"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { clamp01, watchScroll } from "@/lib/scroll-watch";

/**
 * The landing page's orchestrated moment, in three parts:
 *
 *   1. One load sequence for the whole hero: the aurora fades up, the headline
 *      rises word by word, then the supporting copy, the robot and the panel.
 *      One timeline, not a fade-and-rise bolted onto every element.
 *   2. After it lands, the visual becomes pointer-reactive: the robot, the
 *      panel and the aurora track the pointer by different amounts, so they
 *      separate in depth as you move.
 *   3. Scrolling away lifts and softens the robot while the aurora parallaxes,
 *      so the hero hands off to the page instead of just scrolling out. GSAP
 *      `quickTo` glides the scroll progress; a passive scroll listener drives it, not
 *      ScrollTrigger (see lib/scroll-watch.ts).
 *
 * Each motion owns its own element, so none fight over a transform: pointer
 * parallax on [data-hero-visual], scroll on the [data-hero-stage] inside it,
 * and on the aurora the pointer and scroll share GSAP's transform cache while
 * its idle drift runs in CSS on the blobs inside.
 *
 * The hidden-start state is applied in JS and ONLY after confirming motion is
 * allowed. Putting `opacity: 0` in the stylesheet would mean a JS failure, or
 * an unsupported browser, leaves the hero permanently blank. This codebase has
 * already shipped that bug once with a CSS-hidden reveal.
 */

/**
 * Splits a heading into per-word spans so they can be staggered.
 * `textContent` is unchanged, so assistive tech reads exactly the same string;
 * the spans are inline-block purely so they can be transformed.
 */
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  if (!text.trim()) return [];

  el.replaceChildren();
  const words: HTMLElement[] = [];

  for (const word of text.split(/(\s+)/)) {
    if (!word) continue;
    if (/^\s+$/.test(word)) {
      el.appendChild(document.createTextNode(word));
      continue;
    }
    // Outer span clips; inner span is what actually moves, so the word rises
    // out of its own line box instead of sliding over the one above it.
    const outer = document.createElement("span");
    outer.style.display = "inline-block";
    outer.style.overflow = "hidden";
    outer.style.verticalAlign = "top";

    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.textContent = word;

    outer.appendChild(inner);
    el.appendChild(outer);
    words.push(inner);
  }
  return words;
}

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

    const section = root.closest("section");
    const visual = root.querySelector<HTMLElement>("[data-hero-visual]");
    const stage = root.querySelector<HTMLElement>("[data-hero-stage]");
    const panel = root.querySelector<HTMLElement>("[data-hero-panel]");
    const aurora = section?.querySelector<HTMLElement>("[data-hero-aurora]") ?? null;
    let detachParallax: (() => void) | undefined;
    let detachScroll: (() => void) | undefined;

    const ctx = gsap.context(() => {
      detachScroll = attachScroll(section, stage, aurora);

      // Late hydration (a slow device or network) means the hero has already
      // been on screen, and read, for a while. Blanking it to replay the intro
      // would be a visible flash, so skip straight to the interactive part.
      // performance.now() is milliseconds since navigation started.
      if (performance.now() > 1200) {
        detachParallax = attachParallax(root, visual, panel, aurora);
        return;
      }

      const heading = root.querySelector<HTMLElement>("[data-hero-headline]");
      const words = heading ? splitWords(heading) : [];

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.75 },
        onComplete: () => {
          detachParallax = attachParallax(root, visual, panel, aurora);
        },
      });

      if (aurora) {
        tl.from(aurora, { opacity: 0, duration: 1.8, ease: "power2.out" }, 0);
      }

      // The headline is the hero's loudest element, so it leads and everything
      // else follows it rather than arriving together.
      if (words.length) {
        tl.from(
          words,
          { yPercent: 115, duration: 0.9, stagger: 0.055, ease: "power4.out" },
          0,
        );
      }

      const rest = [...steps].filter((s) => !s.hasAttribute("data-hero-headline"));
      tl.from(rest, { y: 20, opacity: 0, stagger: 0.08 }, words.length ? 0.28 : 0);

      if (visual) {
        tl.from(visual, { y: 40, opacity: 0, scale: 0.97, duration: 1.0 }, 0.15);
      }
      if (panel) {
        tl.from(panel, { y: 26, opacity: 0, duration: 0.7 }, 0.72);
      }
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
