import { stackRows } from "@/content/stack";
import { Marquee } from "@/components/ui/Marquee";

function Chip({ label }: { label: string }) {
  return (
    <span className="text-data inline-flex shrink-0 items-center whitespace-nowrap rounded-lg border border-line-2 bg-surface px-3 py-1.5 text-[0.78rem] text-muted">
      {label}
    </span>
  );
}

/**
 * The working inventory — what we actually build and maintain on. Small chips,
 * two rows drifting opposite ways. Reads as a parts list, not a word wall.
 */
export function StackMarquee() {
  return (
    <section className="section--band py-12 md:py-14">
      <div className="container-wide">
        <p className="text-eyebrow text-faint">
          The stack we build and maintain on
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        <Marquee durationSeconds={58} gapClassName="gap-2.5 pe-2.5" aria-label="Stack, row one">
          {stackRows[0].map((t) => (
            <Chip key={t} label={t} />
          ))}
        </Marquee>
        <Marquee
          direction="right"
          durationSeconds={68}
          gapClassName="gap-2.5 pe-2.5"
          aria-label="Stack, row two"
        >
          {stackRows[1].map((t) => (
            <Chip key={t} label={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
