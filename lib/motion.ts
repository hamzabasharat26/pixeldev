import type { Variants, Transition } from "motion/react";

/** Brief §4.5 — expo-out, 500ms, 24px rise. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const revealTransition: Transition = {
  duration: 0.5,
  ease: EASE_OUT_EXPO,
};

export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

/** Container that staggers its children by 60ms (brief §4.5). */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/** Shared viewport config so every reveal fires once, slightly early. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
