import Image from "next/image";
import Link from "next/link";
import { stripProjects } from "@/content/projects";
import { Marquee } from "@/components/ui/Marquee";

/**
 * The running "selected work" strip — every real project, scrolling, croge-style.
 * Sits directly under the hero on a navy band. Pauses on hover; frozen under
 * reduced motion (globals.css). Screen-reader users get the full list once.
 */
export function WorkStrip() {
  const items = stripProjects;

  return (
    <section
      aria-label="Selected work"
      className="on-dark relative border-y border-d-line bg-navy-900 py-5"
    >
      <Marquee durationSeconds={64} aria-label="Selected projects">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group flex w-[248px] shrink-0 items-center gap-3 rounded-[var(--radius-frame)] border border-white/8 bg-white/[0.03] p-2 pr-4 transition-colors hover:border-amber/40"
          >
            <span className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-[8px]">
              <Image
                src={p.media.cover}
                alt=""
                fill
                sizes="80px"
                quality={65}
                className="object-cover"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-d-text group-hover:text-amber-300">
                {p.title}
              </span>
              <span className="text-eyebrow block text-[0.6rem] text-d-muted">
                {p.category}
              </span>
            </span>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
