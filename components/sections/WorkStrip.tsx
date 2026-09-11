import Image from "next/image";
import Link from "next/link";
import { stripProjects } from "@/content/projects";
import { Marquee } from "@/components/ui/Marquee";
import { MarqueeToggle } from "@/components/ui/MarqueeToggle";

/**
 * The running work strip, directly under the hero. Each card is a real frame
 * from a shipped system. It brakes under the cursor or keyboard focus, has a
 * pause control, and is frozen entirely under reduced motion.
 */
export function WorkStrip() {
  return (
    <section aria-labelledby="strip-heading" className="section--band relative py-9">
      <div className="container-wide mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 id="strip-heading" className="text-eyebrow text-faint">
          Real output from systems we have shipped
        </h2>
        <MarqueeToggle targets="work-strip" label="work strip" />
      </div>

      <Marquee
        id="work-strip"
        durationSeconds={72}
        gapClassName="gap-5 pe-5 py-1.5"
        aria-label="Selected projects"
      >
        {stripProjects.map((p) => (
          <Link
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            className="group flex w-[330px] shrink-0 translate-y-0 flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-e1 transition-[border-color,translate,box-shadow] duration-200 hover:-translate-y-1 hover:border-amber/50 hover:shadow-e2"
          >
            <span className="det-frame relative block aspect-[16/10] overflow-hidden">
              <Image
                src={p.media.coverSmall}
                alt=""
                fill
                sizes="330px"
                className="object-cover"
              />
            </span>
            <span className="flex items-center justify-between gap-3 px-3.5 py-3">
              <span className="min-w-0">
                <span className="block truncate text-[0.92rem] font-medium text-ink group-hover:text-amber-700">
                  {p.title}
                </span>
                <span className="mt-0.5 block truncate text-[0.75rem] text-faint">
                  {p.outcome.value}
                </span>
              </span>
              <span className="text-readout shrink-0 rounded-md border border-line-2 px-2 py-1 text-faint">
                {p.year}
              </span>
            </span>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
