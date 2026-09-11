"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import type { MarqueeToggleDetail } from "./MarqueeDriver";

/**
 * Pause / play for auto-moving strips.
 *
 * WCAG 2.2.2 (Level A): motion that starts on its own, runs longer than five
 * seconds and sits alongside other content needs a way to stop it. Hover-to-
 * slow doesn't count (keyboard and touch users can't hover), and the OS
 * reduced-motion setting isn't a control on the page. Automated audits can't
 * detect this, which is how it went missing.
 *
 * Follows the WAI-ARIA carousel pattern: the label changes ("Pause" / "Play")
 * rather than using aria-pressed, so the accessible name always says what the
 * button will do next and still contains its visible text.
 */
export function MarqueeToggle({
  targets,
  label,
}: {
  /** Space-separated ids of the .marquee-root elements this controls. */
  targets: string;
  /** What moves, for the accessible name: "work strip", "stack strip". */
  label: string;
}) {
  const [paused, setPaused] = useState(false);
  const verb = paused ? "Play" : "Pause";

  return (
    <button
      type="button"
      aria-controls={targets}
      aria-label={`${verb} the ${label}`}
      onClick={() => {
        const next = !paused;
        setPaused(next);
        window.dispatchEvent(
          new CustomEvent<MarqueeToggleDetail>("marquee:toggle", {
            detail: { ids: targets.split(" "), paused: next },
          }),
        );
      }}
      className="marquee-toggle inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-line-2 bg-surface/85 px-3 text-[0.75rem] font-medium text-muted backdrop-blur-sm transition-colors hover:border-ink/30 hover:text-ink"
    >
      {paused ? (
        <Play size={12} strokeWidth={2.4} aria-hidden="true" />
      ) : (
        <Pause size={12} strokeWidth={2.4} aria-hidden="true" />
      )}
      {verb}
    </button>
  );
}
