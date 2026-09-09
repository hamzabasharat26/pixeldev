import type { ReactNode } from "react";

/** Readable long-form text column for legal + informational pages. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-page max-w-[70ch] text-[1rem] leading-[1.75] text-grey-800 [&_a]:text-navy [&_a]:underline [&_a]:decoration-amber/60 [&_a]:underline-offset-2 [&_h2]:mt-12 [&_h2]:text-navy [&_h2]:text-[1.4rem] [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-navy [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
      {children}
    </div>
  );
}
