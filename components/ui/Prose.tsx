import type { ReactNode } from "react";

/** Readable long-form text column for legal + informational pages. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-page max-w-[68ch] text-[1rem] leading-[1.75] text-ink [&_a]:text-amber-700 [&_a]:underline [&_a]:decoration-amber-600/50 [&_a]:underline-offset-2 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-[1.4rem] [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-2 [&_li]:text-muted [&_p]:mt-4 [&_p]:text-muted [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
      {children}
    </div>
  );
}
