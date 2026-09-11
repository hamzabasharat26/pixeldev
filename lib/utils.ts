import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's own utilities. Our type classes
 * (`text-h1`, `text-eyebrow`, `text-data`, ...) are custom CSS in globals.css,
 * so by default it guesses that `text-<anything>` is a text COLOUR, sees a real
 * colour such as `text-ink` later in the same list, and silently deletes ours.
 *
 * That is why page and section headings rendered at body size, eyebrows lost
 * their mono label style, and card figures lost their tabular numerals. Verified
 * at runtime: twMerge("text-h1 mt-5 text-ink") returned "mt-5 text-ink".
 *
 * Each family gets its own class group, so it only ever conflicts with its own
 * members (text-h1 vs text-h2), never with colour or size utilities.
 */
type TypeGroups = "type-scale" | "type-eyebrow" | "type-readout" | "type-data";

// The generic is required: v3 only type-checks custom group ids passed here.
const twMerge = extendTailwindMerge<TypeGroups>({
  extend: {
    classGroups: {
      "type-scale": [
        "text-display",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-body-lg",
      ],
      "type-eyebrow": ["text-eyebrow"],
      "type-readout": ["text-readout"],
      "type-data": ["text-data"],
    },
  },
});

/** Merge conditional class names, de-duping conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
