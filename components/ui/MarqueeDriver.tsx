"use client";

import { useEffect, useRef } from "react";

/*
 * Drives one marquee's speed through the Web Animations API.
 *
 * WHY THIS EXISTS. The first version fed scroll velocity into a custom property
 * on <html> that `animation-duration` divided by. Two bugs, both measured in a
 * Chrome trace before this was written:
 *   1. Custom properties inherit, so every write restyled the WHOLE document:
 *      ~1,200 elements, up to 87ms a frame. That was the "hang" on the strip.
 *   2. Changing a running animation's duration recomputes its progress, so the
 *      strip jumped 160-196px whenever the speed changed.
 * `updatePlaybackRate()` fixes both: it changes speed without touching style,
 * and it keeps the animation's current position.
 *
 * The CSS animation stays the source of truth for base speed and direction, so
 * the strips still run with no JS at all, and reduced motion (which sets
 * `animation: none`) leaves this with nothing to drive.
 */

/* ---- Shared scroll velocity: one listener and one rAF for every marquee ---- */

type Listener = (boost: number) => void;
const listeners = new Set<Listener>();
let boost = 1;
let lastY = 0;
let scrollRaf = 0;

const MAX_BOOST = 3;

function scrollTick() {
  const y = window.scrollY;
  const delta = Math.abs(y - lastY);
  lastY = y;
  boost += (Math.min(1 + delta / 30, MAX_BOOST) - boost) * 0.12;
  // `delta < 0.5`, not `=== 0`: smooth-scroll and trackpad inertia leave
  // sub-pixel deltas that never reach zero and would keep this alive forever.
  const settled = delta < 0.5 && boost < 1.005;
  if (settled) boost = 1;
  listeners.forEach((l) => l(boost));
  scrollRaf = settled ? 0 : requestAnimationFrame(scrollTick);
}

function onScroll() {
  if (!scrollRaf) scrollRaf = requestAnimationFrame(scrollTick);
}

function subscribeScroll(l: Listener) {
  if (listeners.size === 0) {
    lastY = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  listeners.add(l);
  return () => {
    listeners.delete(l);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      scrollRaf = 0;
    }
  };
}

/* ---- Per-marquee driver ---- */

/** Hover slows to a crawl rather than freezing: it reads as a brake, not a hang. */
const HOVER_RATE = 0.12;
const APPROACH = 0.14;
const EPSILON = 0.004;

export type MarqueeToggleDetail = { ids: string[]; paused: boolean };

export function MarqueeDriver() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = probe.current?.closest<HTMLElement>(".marquee-root");
    if (!root) return;
    const anims = Array.from(
      root.querySelectorAll<HTMLElement>(".marquee-track"),
    ).flatMap((el) => el.getAnimations());
    if (anims.length === 0) return;

    let rate = 1;
    let scroll = 1;
    let braked = false;
    let paused = false;
    let visible = true;
    let raf = 0;

    const target = () => (paused ? 0 : braked ? HOVER_RATE : scroll);

    const step = () => {
      const goal = target();
      rate += (goal - rate) * APPROACH;
      const done = Math.abs(goal - rate) < EPSILON;
      if (done) rate = goal;

      if (rate === 0 || !visible) {
        // A paused animation costs the compositor nothing at all.
        for (const a of anims) if (a.playState === "running") a.pause();
      } else {
        for (const a of anims) {
          if (a.playState !== "running") a.play();
          if (Math.abs(a.playbackRate - rate) > 0.002) a.updatePlaybackRate(rate);
        }
      }
      raf = done ? 0 : requestAnimationFrame(step);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    // Brake for a mouse or pen hovering, and for keyboard focus inside the
    // strip, so a card can be read before it slides away. Not for touch: a tap
    // is a navigation, and there is no "leave" to release the brake.
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      braked = true;
      wake();
    };
    const onLeave = () => {
      braked = false;
      wake();
    };
    const onFocusIn = () => {
      braked = true;
      wake();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!root.contains(e.relatedTarget as Node | null)) onLeave();
    };
    const onToggle = (e: Event) => {
      const { ids, paused: p } = (e as CustomEvent<MarqueeToggleDetail>).detail;
      if (!ids.includes(root.id)) return;
      paused = p;
      wake();
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    window.addEventListener("marquee:toggle", onToggle);

    // Offscreen strips stop entirely instead of animating where nobody sees.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      wake();
    });
    io.observe(root);

    const unsubscribe = subscribeScroll((b) => {
      scroll = b;
      if (!paused && !braked && visible) wake();
    });

    return () => {
      unsubscribe();
      io.disconnect();
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("marquee:toggle", onToggle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <span ref={probe} hidden />;
}
