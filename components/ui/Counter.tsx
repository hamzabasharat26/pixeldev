"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type CounterProps = {
  /** Numeric target. Non-numeric values (e.g. "24h", "<2s") render verbatim. */
  value: string;
  className?: string;
};

function parse(value: string) {
  const match = value.match(/^(\D*)(\d[\d,.]*)(\D*)$/);
  if (!match) return null;
  const prefix = match[1] ?? "";
  const suffix = match[3] ?? "";
  // A digit or range dash in the affixes (e.g. "3–8 wk", "1st") means the
  // number isn't a clean count — render it verbatim, don't animate.
  if (/[\d–-]/.test(prefix) || /[\d–-]/.test(suffix)) return null;
  const digits = match[2].replace(/,/g, "");
  const target = Number(digits);
  // Tiny counts animate as a distracting flicker; show them as-is.
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

export function Counter({ value, className }: CounterProps) {
  const parsed = useMemo(() => parse(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  // null => render the final value (SSR, no-JS, reduced motion).
  const [tick, setTick] = useState<number | null>(null);

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    const controls = animate(0, parsed.target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setTick(v),
      onComplete: () => setTick(null),
    });
    return () => controls.stop();
  }, [parsed, reduce, inView]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {format(tick ?? parsed.target, parsed.decimals)}
      {parsed.suffix}
    </span>
  );
}
