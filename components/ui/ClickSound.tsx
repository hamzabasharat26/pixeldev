"use client";

import { useEffect } from "react";
import { initSound, playClick } from "@/lib/sound";

/** What counts as a click worth hearing. Typing and dragging do not. */
const INTERACTIVE = 'a[href], button, [role="button"], summary, input[type="submit"], input[type="button"], label[for]';

function shouldSound(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  const hit = target.closest(INTERACTIVE);
  if (!hit) return false;
  if (hit.hasAttribute("data-no-sound") || hit.closest("[data-no-sound]")) return false;
  if (hit instanceof HTMLButtonElement && hit.disabled) return false;
  return !hit.getAttribute("aria-disabled");
}

/**
 * Plays a short tap on every click, anywhere on the site. Mounted once in the
 * root layout; renders nothing.
 *
 * pointerdown, not click, so the sound lands with the press rather than after
 * it. Keyboard activation fires a click with detail 0 and no pointer event, so
 * that case is handled separately and cannot double up.
 */
export function ClickSound() {
  useEffect(() => {
    initSound();

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (shouldSound(e.target)) playClick();
    };
    const onClick = (e: MouseEvent) => {
      if (e.detail !== 0) return; // already sounded on pointerdown
      if (shouldSound(e.target)) playClick();
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("click", onClick, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
