import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

/**
 * "Inside the work": a horizontal reel of real frames that stays pinned while
 * you scroll past it on wide screens, and is a swipeable row everywhere else.
 *
 * Pure CSS (see `.work-reel` in globals.css), not GSAP pinning, on purpose. JS
 * pinning inserts its scroll distance after hydration, which pushes the rest of
 * the page down (a layout shift, CLS). Here the section's height is set in CSS,
 * so the page is the right size from the first paint, and the sideways motion
 * runs on the compositor from a view-timeline.
 *
 * Keyboard users get a normal scrollable row the moment focus lands inside,
 * so a focused card can never be translated off screen out of reach.
 */
export function WorkReel({ projects }: { projects: Project[] }) {
  return (
    <section aria-labelledby="reel-heading" className="work-reel on-dark bg-navy-ink">
      <div className="work-reel-sticky">
        <div className="container-wide pt-16 md:pt-20">
          <p className="text-eyebrow text-d-muted">Inside the work</p>
          <h2 id="reel-heading" className="text-h2 mt-3 max-w-2xl text-d-text">
            Real frames from systems in production.
          </h2>
        </div>
        <ul className="work-reel-track mt-10 flex gap-5 px-6 md:px-8">
          {projects.map((p) => (
            <li key={p.slug} className="w-[min(80vw,540px)] shrink-0">
              <Link
                href={`/portfolio/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-d-line bg-navy-900 transition-[border-color] duration-200 hover:border-amber/50"
              >
                <span className="det-frame relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.media.cover}
                    alt=""
                    fill
                    unoptimized
                    sizes="540px"
                    className="scale-100 object-cover transition-[scale] duration-500 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-d-text">{p.title}</span>
                    <span className="mt-0.5 block truncate text-[0.8rem] text-d-muted">
                      {p.outcome.value}: {p.outcome.label}
                    </span>
                  </span>
                  <span className="text-readout shrink-0 text-amber-300">{p.category}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
