"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds — use for hand-tuned sequences, not per-card. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Section-entrance reveal: opacity + 24px rise, once, slightly early.
 * Under reduced motion it fades only (no transform).
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </MotionTag>
  );
}
