import Image from "next/image";
import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { HeroMedia } from "./HeroMedia";
import { HeroPanel } from "./HeroPanel";
import { HeroReveal } from "./HeroReveal";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <HeroMedia />

      <HeroReveal className="container-wide relative pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div>
            <p
              data-hero-step
              className="flex items-center gap-2.5 text-[0.92rem] font-medium text-amber-600"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-amber"
              />
              {site.tagline}
            </p>

            <h1 data-hero-step className="headline mt-5 max-w-[13ch] text-ink">
              Production AI, not proof of concept.
            </h1>

            <p
              data-hero-step
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            >
              {site.positioning} Detection, tracking, quality control, OCR and
              retrieval-grounded assistants — plus the web, mobile and cloud
              work to put them in front of the people who use them.
            </p>

            <div data-hero-step className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact" size="lg">
                Start a project
              </LinkButton>
              <LinkButton href="/work" size="lg" variant="ghostLight">
                See the work
              </LinkButton>
            </div>
          </div>

          {/* The robot carries the brand; the glass panel overlapping it
              carries the proof. Brand on top of real output, literally. */}
          <div
            data-hero-visual
            className="relative mx-auto w-full max-w-[560px] lg:mx-0"
          >
            {/* The cut-out ends mid-torso, so it has to dissolve rather than
                stop — an un-masked edge reads as a broken image. */}
            <div
              className="relative aspect-[1086/1448] max-h-[34rem] w-full"
              style={{
                maskImage:
                  "linear-gradient(to top, transparent 0%, #000 16%, #000 100%)",
                WebkitMaskImage:
                  "linear-gradient(to top, transparent 0%, #000 16%, #000 100%)",
              }}
            >
              <Image
                /* 900px, not 1400: the slot is ~520px, and this is served
                   unoptimized so the browser gets exactly what we name. */
                src="/services/hero-robot-900.webp"
                alt=""
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 520px, 80vw"
                className="object-contain object-bottom"
              />
            </div>

            <div
              data-hero-panel
              className="absolute -bottom-4 left-0 w-[min(23rem,92%)] lg:-left-10"
            >
              <HeroPanel />
            </div>
          </div>
        </div>

        <dl
          data-hero-step
          className="glass-paper mt-16 grid grid-cols-2 overflow-hidden rounded-2xl shadow-e1 sm:grid-cols-4 md:mt-20"
        >
          {site.stats.map((s, i) => (
            <div
              key={s.label}
              className={
                "relative z-10 flex flex-col gap-1.5 px-5 py-5 " +
                (i > 0 ? "border-line sm:border-l " : "") +
                (i === 1 ? "border-l border-line " : "") +
                (i > 1 ? "border-t border-line sm:border-t-0" : "")
              }
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-data text-2xl font-semibold text-ink md:text-[1.75rem]">
                <Counter value={s.value} />
              </dd>
              <dd className="text-[0.78rem] leading-snug text-faint">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </HeroReveal>
    </section>
  );
}
