import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { HeroMedia } from "./HeroMedia";

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-ink">
      <HeroMedia />

      <div className="container-page relative pt-36 pb-8 md:pt-44 md:pb-10 lg:pt-48">
        <p className="text-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-d-muted">
          <span aria-hidden="true" className="h-px w-8 bg-amber" />
          AI &amp; Computer-Vision Studio
          <span aria-hidden="true" className="text-faint">
            /
          </span>
          Pakistan · Worldwide
        </p>

        <h1 className="headline mt-6 max-w-[15ch] text-d-text">
          We are more than <em>ordinary</em>.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-d-muted md:text-xl">
          {site.positioning} Object detection, tracking, quality control, OCR,
          RAG and LLM systems — plus the web, mobile and cloud stack to run them
          in production. Brief to deployment in 3&ndash;8 weeks.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <LinkButton href="/contact" size="lg">
            Start a project
          </LinkButton>
          <LinkButton href="/work" size="lg" variant="ghostDark">
            See the work
          </LinkButton>
        </div>
      </div>

      {/* Glass stat card */}
      <div className="container-page relative pb-10 md:pb-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] backdrop-blur-md sm:grid-cols-4">
          {site.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1.5 bg-navy-900/40 px-4 py-5"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-data text-2xl font-semibold text-d-text md:text-[1.7rem]">
                <Counter value={s.value} />
              </dd>
              <dd className="text-eyebrow text-[0.62rem] leading-tight text-d-muted">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
