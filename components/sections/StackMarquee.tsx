import { stackRows } from "@/content/stack";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";

/**
 * "The stack we build & maintain on" — two opposing rows of large muted
 * wordmarks, croge-style. Paper band. Pauses on hover; frozen under
 * reduced motion.
 */
export function StackMarquee() {
  return (
    <section className="section--band py-14 md:py-16">
      <div className="container-wide">
        <Eyebrow>The stack we build &amp; maintain on</Eyebrow>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Marquee durationSeconds={46} aria-label="Stack, row one">
          {stackRows[0].map((t) => (
            <span
              key={t}
              className="text-data whitespace-nowrap text-2xl text-faint md:text-[1.9rem]"
            >
              {t}
            </span>
          ))}
        </Marquee>
        <Marquee
          direction="right"
          durationSeconds={54}
          aria-label="Stack, row two"
        >
          {stackRows[1].map((t) => (
            <span
              key={t}
              className="text-data whitespace-nowrap text-2xl text-faint md:text-[1.9rem]"
            >
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
