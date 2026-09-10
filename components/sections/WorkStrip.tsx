import Image from "next/image";
import Link from "next/link";
import { stripProjects } from "@/content/projects";
import { Marquee } from "@/components/ui/Marquee";

/**
 * The running work strip, directly under the hero. Each card is a real frame
 * from a shipped system, framed like the model's own output. Pauses on hover;
 * frozen under reduced motion (globals.css).
 */
export function WorkStrip() {
  return (
    <section
      aria-label="Selected work"
      className="on-dark relative border-y border-d-line bg-navy-900 py-7"
    >
      <Marquee durationSeconds={72} gapClassName="gap-5 pe-5" aria-label="Selected projects">
        {stripProjects.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group flex w-[330px] shrink-0 flex-col overflow-hidden rounded-xl border border-d-line bg-navy-800/60 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-amber/45"
          >
            <span className="det-frame relative block aspect-[16/10] overflow-hidden">
              <Image
                src={p.media.coverSmall}
                alt=""
                fill
                unoptimized
                sizes="330px"
                className="object-cover"
              />
            </span>
            <span className="flex items-center justify-between gap-3 px-3.5 py-3">
              <span className="min-w-0">
                <span className="block truncate text-[0.92rem] font-medium text-d-text group-hover:text-amber-300">
                  {p.title}
                </span>
                <span className="mt-0.5 block truncate text-[0.75rem] text-d-muted">
                  {p.outcome.value}
                </span>
              </span>
              <span className="text-readout shrink-0 rounded-md border border-white/12 px-2 py-1 text-d-muted">
                {p.year}
              </span>
            </span>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
