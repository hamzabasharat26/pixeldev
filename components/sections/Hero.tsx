import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Hero() {
  return (
    <section className="on-dark relative isolate flex min-h-[88vh] items-center overflow-hidden">
      {/* Background: navy→ink mesh, amber glow bottom-right, faint HUD grid. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 100% at 8% -10%, #16335f 0%, rgba(18,41,75,0) 58%), radial-gradient(80% 70% at 108% 112%, rgba(233,161,60,0.22) 0%, rgba(233,161,60,0) 62%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(36,51,73,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(36,51,73,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(80% 60% at 50% 40%, #000 0%, transparent 90%)",
          }}
        />
      </div>

      <div className="container-page py-28">
        <Eyebrow tone="light">Software studio · Working worldwide</Eyebrow>

        <h1 className="text-display mt-7 max-w-[22ch] text-grey-50">
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

      <a
        href="#services"
        className="text-eyebrow absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-grey-400 hover:text-grey-200 md:inline-flex"
      >
        Scroll to explore
        <span aria-hidden="true" className="text-amber">
          &darr;
        </span>
      </a>
    </section>
  );
}
