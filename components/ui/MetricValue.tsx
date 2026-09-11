import { cn } from "@/lib/utils";
import { DecodeText } from "./DecodeText";

/**
 * Outcome values are a mix of real figures ("500+ / shift", "~350 ms") and
 * short phrases ("Every piece", "Frame by frame"). Tabular mono is the voice
 * for measured numbers only; setting a phrase in it reads as a broken readout.
 * So the face follows the content: mono + tabular for figures, the display
 * face for phrases, and phrases sit a step smaller because they run longer.
 */
const STARTS_WITH_FIGURE = /^[~<>+]?\d/;

type MetricValueProps = {
  value: string;
  /** "hero" = section-scale, "card" = inside a card or metric grid. */
  size?: "hero" | "card";
  /** Play a one-off decode on scroll-in. Figures only: they are monospaced,
   *  so the scramble can't change the width and shift the layout. */
  decode?: boolean;
  className?: string;
};

export function MetricValue({
  value,
  size = "card",
  decode = false,
  className,
}: MetricValueProps) {
  const figure = STARTS_WITH_FIGURE.test(value);

  return (
    <span
      className={cn(
        "block text-balance",
        figure
          ? "text-data font-bold"
          : "font-display font-semibold tracking-[-0.025em]",
        size === "hero"
          ? figure
            ? "text-3xl md:text-[2.6rem]"
            : "text-[1.75rem] md:text-[2.15rem]"
          : figure
            ? "text-3xl md:text-4xl"
            : "text-2xl md:text-[1.9rem]",
        className,
      )}
    >
      {decode && figure ? <DecodeText text={value} /> : value}
    </span>
  );
}
