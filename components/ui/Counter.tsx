"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

function format(v: number, decimals: number) {
  return decimals > 0
    ? v.toFixed(decimals)
    : Math.round(v).toLocaleString("en-US");
}

/**
 * Count-up on scroll-in. Plain rAF + IntersectionObserver — no animation lib.
 * SSR / no-JS / reduced-motion render the final value immediately.
 */
export function Counter({ value, className }: CounterProps) {
  const parsed = useMemo(() => parse(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    let started = false;
    const run = (t0: number) => {
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1100);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(format(parsed.target * eased, parsed.decimals));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDisplay(null);
      };
      raf = requestAnimationFrame(tick);
    };

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
    };
  }, [parsed]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {display ?? format(parsed.target, parsed.decimals)}
      {parsed.suffix}
    </span>
  );
}
