"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

/**
 * A one-off "decode" when the figure scrolls into view, like a sensor settling
 * on a reading. Plays once.
 *
 * The real value is server-rendered, so it is what shows without JS, under
 * reduced motion, and to search engines. Assistive tech reads a separate,
 * static copy; only the visible copy scrambles, so a screen reader never hears
 * the noise. Use it on monospaced figures only: every character is the same
 * width there, so scrambling can never change the line's width and shift the
 * layout.
 */
export function DecodeText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrambleTextPlugin);

    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const decode = gsap.to(el, {
        paused: true,
        duration: 1.3,
        ease: "none",
        scrambleText: {
          text,
          chars: "0123456789/+.",
          revealDelay: 0.35,
          speed: 0.55,
          tweenLength: false,
        },
      });
      // Starts once the figure's top is 88% of the way down the viewport.
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          decode.play();
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);
    }, el);

    return () => {
      io?.disconnect();
      ctx.revert();
    };
  }, [text]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
