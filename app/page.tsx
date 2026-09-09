import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

// Phase 1 shell placeholder — replaced by the real 11-section homepage in Phase 2.
export default function HomePage() {
  return (
    <section className="on-dark flex min-h-[88vh] items-center">
      <div className="container-page">
        <Eyebrow tone="light">Software studio · Working worldwide</Eyebrow>
        <h1 className="text-display mt-6 max-w-4xl text-grey-50">
          We build software that <span className="text-amber">ships</span> — and
          scales.
        </h1>
        <p className="text-body-lg mt-6 max-w-xl text-grey-300">
          Pixel Dev Solutions designs and engineers fast web platforms, mobile
          apps, and AI systems end-to-end — from the first wireframe to the
          deployed, maintained product.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <LinkButton href="/contact" size="lg">
            Start a Project
          </LinkButton>
          <LinkButton href="/work" size="lg" variant="ghostDark">
            See our work
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
