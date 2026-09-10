import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";

/**
 * Phase C shell: navy ground, glow orbs, editorial headline. The full-bleed
 * media layer + scroll-scale + glass stat card land in Phase D (HeroMedia).
 */
export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-ink">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 100% at 6% -12%, var(--color-navy-800) 0%, transparent 58%), radial-gradient(90% 80% at 108% 116%, var(--color-amber-glow) 0%, transparent 60%)",
          }}
        />
        <div className="glow-orb -left-24 top-1/3 h-[30rem] w-[30rem] bg-navy-600/40" />
        <div className="glow-orb -right-16 bottom-0 h-[26rem] w-[26rem] bg-amber-glow" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in srgb, var(--color-navy-500) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-navy-500) 45%, transparent) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
            maskImage:
              "radial-gradient(80% 60% at 50% 42%, #000 0%, transparent 92%)",
          }}
        />
      </div>

      <div className="container-page pt-36 pb-24 md:pt-48 md:pb-32">
        <p className="text-eyebrow flex flex-wrap items-center gap-3 text-d-muted">
          <span aria-hidden="true" className="h-px w-8 bg-amber" />
          AI &amp; Computer-Vision Studio
          <span aria-hidden="true" className="text-faint">
            /
          </span>
          Pakistan · Worldwide
        </p>

        <h1 className="headline mt-7 max-w-[16ch] text-d-text">
          We are more than <em>ordinary</em>.
        </h1>

        <p className="text-body-lg mt-7 max-w-2xl text-d-muted">
          {site.positioning} We build object detection, tracking, quality
          control, OCR, RAG and LLM systems — and the web, mobile and cloud
          stack to run them in production. Brief to deployment in 3&ndash;8
          weeks.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/contact" size="lg">
            Start a project
          </LinkButton>
          <LinkButton href="/work" size="lg" variant="ghostDark">
            See the work
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
