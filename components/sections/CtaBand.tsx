import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type CtaBandProps = {
  heading?: string;
  sub?: string;
};

export function CtaBand({
  heading = "Tell us what you're trying to build.",
  sub = "We'll come back within 24 hours with honest feedback on scope, timeline, and cost — whether or not we're the right fit.",
}: CtaBandProps) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-ink">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 120% at 100% 0%, var(--color-amber-glow) 0%, transparent 55%)",
          }}
        />
        <div className="glow-orb -left-16 bottom-[-40%] h-96 w-96 text-navy-500 opacity-25" />
      </div>

      <Reveal className="container-page section-y">
        <h2 className="text-h2 max-w-2xl text-d-text">{heading}</h2>
        <p className="text-body-lg mt-5 max-w-xl text-d-muted">{sub}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <LinkButton href="/contact" size="lg">
            Start a project
          </LinkButton>
          <p className="text-sm text-d-muted">
            Or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-d-text underline decoration-amber/60 underline-offset-4 transition-colors hover:text-amber-300"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
