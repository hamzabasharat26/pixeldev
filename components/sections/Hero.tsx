import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { HeroMedia } from "./HeroMedia";
import { HeroPanel } from "./HeroPanel";

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-ink">
      <HeroMedia />

      <div className="container-wide relative pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="flex items-center gap-2.5 text-[0.92rem] font-medium text-amber-300">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-amber-300"
              />
              {site.tagline}
            </p>

            <h1 className="headline mt-5 max-w-[13ch] text-d-text">
              Production AI, not proof of concept.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-d-muted">
              {site.positioning} Detection, tracking, quality control, OCR and
              retrieval-grounded assistants — plus the web, mobile and cloud
              work to put them in front of the people who use them.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact" size="lg">
                Start a project
              </LinkButton>
              <LinkButton href="/work" size="lg" variant="ghostDark">
                See the work
              </LinkButton>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroPanel />
          </div>
        </div>

        <dl className="glass mt-12 grid grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-4 md:mt-14">
          {site.stats.map((s, i) => (
            <div
              key={s.label}
              className={
                "relative z-10 flex flex-col gap-1.5 px-5 py-5 " +
                (i > 0 ? "border-white/10 sm:border-l " : "") +
                (i === 1 ? "border-l border-white/10 " : "") +
                (i > 1 ? "border-t border-white/10 sm:border-t-0" : "")
              }
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-data text-2xl font-semibold text-d-text md:text-[1.75rem]">
                <Counter value={s.value} />
              </dd>
              <dd className="text-[0.78rem] leading-snug text-d-muted">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
