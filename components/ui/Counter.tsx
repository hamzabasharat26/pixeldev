"use client";

import { useEffect, useMemo, useRef } from "react";

type CounterProps = {
  /** Numeric target. Values with affix digits / dashes (e.g. "3–8 wk") or a
   *  target < 5 render verbatim, no animation. */
  value: string;
  className?: string;
};

function parse(value: string) {
  const match = value.match(/^(\D*)(\d[\d,.]*)(\D*)$/);
  if (!match) return null;
  const prefix = match[1] ?? "";
  const suffix = match[3] ?? "";
  if (/[\d–-]/.test(prefix) || /[\d–-]/.test(suffix)) return null;
  const digits = match[2].replace(/,/g, "");
  const target = Number(digits);
  if (target < 5 && !digits.includes(".")) return null;
  return {
    prefix,
    target,
    suffix,
    decimals: (digits.split(".")[1] ?? "").length,
  };
}

// Thousands separators by hand, not Intl: toLocaleString() built a formatter on
// every frame, and even one Intl.NumberFormat cost ~75ms to create at load.
function format(v: number, decimals: number) {
  return decimals > 0
    ? v.toFixed(decimals)
    : String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Count-up on scroll-in. Plain rAF + IntersectionObserver — no animation lib.
 * SSR / no-JS / reduced-motion render the final value immediately. Frames write
 * the number's text directly rather than through React state, so a count-up
 * doesn't re-render the component on every frame.
 */
export function Counter({ value, className }: CounterProps) {
  const parsed = useMemo(() => parse(value), [value]);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!parsed) return;
    const el = numRef.current;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || typeof IntersectionObserver === "undefined") return;

    const final = format(parsed.target, parsed.decimals);
    let shown = final;
    const show = (text: string) => {
      if (text === shown) return;
      el.textContent = text;
      shown = text;
    };

    let raf = 0;
    const run = (t0: number) => {
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1100);
        const eased = 1 - Math.pow(1 - p, 3);
        show(p < 1 ? format(parsed.target * eased, parsed.decimals) : final);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!started && entries.some((e) => e.isIntersecting)) {
          started = true;
          io.disconnect();
          run(performance.now());
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [parsed]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span className={className}>
      {parsed.prefix}
      <span ref={numRef}>{format(parsed.target, parsed.decimals)}</span>
      {parsed.suffix}
    </span>
  );
}
