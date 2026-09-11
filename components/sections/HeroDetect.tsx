"use client";

import { useEffect, useRef } from "react";

type Target = {
  label: string;
  /** Final confidence the readout settles on. */
  conf: number;
  /** Box, in percent of the robot image. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Anchor the label to the box's right edge (targets near the right side). */
  align?: "start" | "end";
};

/**
 * Where the robot's glowing parts actually are, in percent of the image.
 * Measured from the pixels (orange-glow clusters in hero-robot-900.webp), not
 * eyeballed, so the brackets land on the parts rather than near them. If the
 * robot image is ever replaced, these must be re-measured.
 *
 * The left shoulder joint was a target and was dropped: the glass panel sits
 * over it on desktop, so the detector was "locking on" to something nobody
 * could see. The right shoulder ring is clear.
 */
const TARGETS: Target[] = [
  { label: "Optical sensor", conf: 0.97, x: 36.6, y: 15, w: 11, h: 13.2 },
  { label: "Visor", conf: 0.99, x: 57.5, y: 23, w: 31, h: 11.5 },
  { label: "Servo joint", conf: 0.94, x: 84, y: 64.8, w: 12, h: 9.3, align: "end" },
];

/** Share of a box covered by the panel before we stop locking onto it. */
const MAX_COVERED = 0.2;

/** The loop's beats, in seconds. */
const DELAY = 1.5;
const SWEEP = 1.1;
const LOCK = 0.45;
const COUNT = 0.7;
const HOLD = 1.6;
const RELEASE = 0.3;
const REST = 0.6;
const SLOT = COUNT + HOLD + RELEASE;

/** Readout refresh. ~25Hz reads as a live instrument. */
const READOUT_MS = 40;

const EASE_SWEEP = "cubic-bezier(0.45, 0, 0.55, 1)";
const EASE_LOCK = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_RELEASE = "cubic-bezier(0.32, 0, 0.67, 0)";

type Lock = {
  box: HTMLElement;
  out: HTMLElement | null;
  conf: number;
  /** When this box locks on, in seconds into the cycle. */
  at: number;
  shown: string;
};

/**
 * The hero's signature moment: a computer vision studio whose hero gets
 * detected. A scan line sweeps the robot, then brackets lock onto its parts
 * one by one, each with a confidence readout counting up.
 *
 * Web Animations, not GSAP: every element animates only transform and opacity
 * on one shared infinite cycle, so the compositor plays the loop without the
 * main thread. The GSAP version wrote styles every frame, about 300ms of main
 * thread time in every 3s. Only the readout text needs the main thread.
 *
 * Targets the glass panel covers at this breakpoint are measured at runtime and
 * left out. Decorative (aria-hidden). Boxes are server-rendered in their final
 * state, so without JS, or under reduced motion, it reads as a still detector
 * output. The loop pauses whenever the robot is off screen.
 */
export function HeroDetect() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    // Measured before HeroReveal's intro offsets anything: child effects run
    // before their parent's.
    const panel = el
      .closest("[data-hero-visual]")
      ?.querySelector<HTMLElement>("[data-hero-panel]")
      ?.getBoundingClientRect();
    const covered = (b: HTMLElement) => {
      if (!panel) return false;
      const r = b.getBoundingClientRect();
      const ix = Math.max(0, Math.min(r.right, panel.right) - Math.max(r.left, panel.left));
      const iy = Math.max(0, Math.min(r.bottom, panel.bottom) - Math.max(r.top, panel.top));
      return (ix * iy) / (r.width * r.height) >= MAX_COVERED;
    };

    const hidden: HTMLElement[] = [];
    const locks: Lock[] = [];
    el.querySelectorAll<HTMLElement>("[data-box]").forEach((box, i) => {
      if (covered(box)) {
        hidden.push(box);
        return;
      }
      locks.push({
        box,
        out: box.querySelector<HTMLElement>("[data-conf]"),
        conf: TARGETS[i].conf,
        at: SWEEP - LOCK + locks.length * SLOT,
        shown: "",
      });
    });
    for (const b of hidden) b.style.opacity = "0";

    const cycle = Math.max(SWEEP - LOCK + locks.length * SLOT, SWEEP + 0.05) + REST;
    const at = (s: number) => s / cycle;
    const timing: KeyframeAnimationOptions = {
      duration: cycle * 1000,
      delay: DELAY * 1000,
      iterations: Infinity,
      fill: "backwards",
    };

    const anims: Animation[] = [];
    const scan = el.querySelector<HTMLElement>("[data-scan]");
    if (scan) {
      anims.push(
        scan.animate(
          [
            { offset: 0, opacity: 0, transform: "translateY(0%)", easing: EASE_SWEEP },
            { offset: at(0.25), opacity: 1 },
            { offset: at(SWEEP - 0.25), opacity: 1 },
            { offset: at(SWEEP), transform: "translateY(100%)" },
            { offset: at(SWEEP + 0.05), opacity: 0 },
            { offset: 1, opacity: 0, transform: "translateY(100%)" },
          ],
          timing,
        ),
      );
    }
    for (const l of locks) {
      anims.push(
        l.box.animate(
          [
            { offset: 0, opacity: 0, transform: "scale(1.45)" },
            { offset: at(l.at), opacity: 0, transform: "scale(1.45)", easing: EASE_LOCK },
            { offset: at(l.at + LOCK), opacity: 1, transform: "scale(1)" },
            { offset: at(l.at + COUNT + HOLD), opacity: 1, transform: "scale(1)", easing: EASE_RELEASE },
            { offset: at(l.at + SLOT), opacity: 0, transform: "scale(0.94)" },
            { offset: 1, opacity: 0, transform: "scale(0.94)" },
          ],
          timing,
        ),
      );
    }
    const clock = anims[0];
    if (!clock) return;

    // The readout follows the shared clock, so it can never drift from the
    // boxes, and writes only when the digits change.
    const readout = () => {
      const now = clock.currentTime;
      if (typeof now !== "number") return;
      const t = now / 1000 - DELAY;
      if (t < 0) return;
      const c = t % cycle;
      for (const l of locks) {
        const p = Math.min(1, Math.max(0, (c - l.at) / COUNT));
        const text = (l.conf * (1 - (1 - p) ** 3)).toFixed(2);
        if (text === l.shown || !l.out) continue;
        l.out.textContent = text;
        l.shown = text;
      }
    };

    let timer: number | undefined;
    const io = new IntersectionObserver(([entry]) => {
      for (const a of anims) {
        if (entry.isIntersecting) a.play();
        else a.pause();
      }
      window.clearInterval(timer);
      timer = entry.isIntersecting ? window.setInterval(readout, READOUT_MS) : undefined;
    });
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearInterval(timer);
      for (const a of anims) a.cancel();
      for (const b of hidden) b.style.opacity = "";
      for (const l of locks) if (l.out) l.out.textContent = l.conf.toFixed(2);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="hero-detect pointer-events-none absolute inset-0 z-10"
    >
      <span data-scan className="hero-scan" />
      {TARGETS.map((t) => (
        <span
          key={t.label}
          data-box
          className="hero-box"
          style={{ left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}%`, height: `${t.h}%` }}
        >
          <span className="hero-box-label" data-align={t.align ?? "start"}>
            <i />
            {t.label}
            <b data-conf>{t.conf.toFixed(2)}</b>
          </span>
        </span>
      ))}
    </div>
  );
}
