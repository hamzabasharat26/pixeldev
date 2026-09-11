"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/**
 * The landing page's orchestrated moment, in two parts:
 *
 *   1. One load sequence for the whole hero — headline word by word, then the
 *      supporting copy, then the robot, then the panel. One timeline, not a
 *      fade-and-rise bolted onto every element.
 *   2. After it lands, the visual becomes pointer-reactive: the robot and the
 *      panel track the pointer by different amounts, so they separate in depth
 *      as you move. That parallax is the interactive part — it responds to the
 *      reader rather than playing at them.
 *
 * Children stay server-rendered. Anything tagged `data-hero-step` joins the
 * timeline in DOM order.
 *
 * The hidden-start state is applied in JS and ONLY after confirming motion is
 * allowed. Putting `opacity: 0` in the stylesheet would mean a JS failure, or
 * an unsupported browser, leaves the hero permanently blank — this codebase has
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

    const visual = root.querySelector<HTMLElement>("[data-hero-visual]");
    const panel = root.querySelector<HTMLElement>("[data-hero-panel]");
    let detachParallax: (() => void) | undefined;

    // Late hydration (a slow device or network) means the hero has already
    // been on screen, and read, for a while. Blanking it to replay the intro
    // would be a visible flash, so skip straight to the interactive part.
    // performance.now() is milliseconds since navigation started.
    if (performance.now() > 1200) {
      detachParallax = attachParallax(root, visual, panel);
      return () => detachParallax?.();
    }

    const ctx = gsap.context(() => {
      const heading = root.querySelector<HTMLElement>("[data-hero-headline]");
      const words = heading ? splitWords(heading) : [];

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.75 },
        onComplete: () => {
          detachParallax = attachParallax(root, visual, panel);
        },
      });

      // The headline is the hero's loudest element, so it leads and everything
      // else follows it rather than arriving together.
      if (words.length) {
        tl.from(words, {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.055,
          ease: "power4.out",
        });
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
 * Pointer parallax. The robot and the panel take different multipliers, which
 * is what reads as depth — matching them would just slide the whole group.
 * Only attached once the load timeline is done, so the two never fight over the
 * same transforms.
 */
function attachParallax(
  root: HTMLElement,
  visual: HTMLElement | null,
  panel: HTMLElement | null,
) {
  if (!visual) return undefined;
  if (!window.matchMedia("(pointer: fine)").matches) return undefined;

  const vx = gsap.quickTo(visual, "x", { duration: 0.9, ease: "power3.out" });
  const vy = gsap.quickTo(visual, "y", { duration: 0.9, ease: "power3.out" });
  const px = panel
    ? gsap.quickTo(panel, "x", { duration: 1.1, ease: "power3.out" })
    : null;
  const py = panel
    ? gsap.quickTo(panel, "y", { duration: 1.1, ease: "power3.out" })
    : null;

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
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    gsap.killTweensOf([visual, panel].filter(Boolean) as HTMLElement[]);
  };
}
