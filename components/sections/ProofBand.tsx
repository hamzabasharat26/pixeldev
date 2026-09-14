import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MetricValue } from "@/components/ui/MetricValue";
import { Reveal } from "@/components/ui/Reveal";

export function ProofBand() {
  return (
    <section className="horizon on-dark relative isolate overflow-hidden bg-navy-900">
      <div
        aria-hidden="true"
        className="glow-orb -right-20 -top-24 h-80 w-80 text-amber opacity-[0.14]"
      />
      <div
        aria-hidden="true"
        className="glow-orb -left-24 bottom-[-40%] h-96 w-96 text-navy-500 opacity-25"
      />

      <Reveal className="container-wide section relative">
        <Eyebrow tone="light">Proof</Eyebrow>
        <h2 className="text-h2 mt-4 max-w-xl text-d-text">
          Proof, not promises.
        </h2>

        <dl className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {site.proof.map((item) => (
            <div key={item.label} className="border-t border-d-line pt-5">
              <dt className="sr-only">{item.label}</dt>
              <dd>
                {/* No scramble here. Decoding turned "1 camera" and "1st place"
                    into digit noise for over a second, which reads as a broken
                    page on the one section titled Proof. */}
                <MetricValue value={item.value} size="hero" className="text-amber-300" />
                <span className="mt-3 block max-w-[26ch] text-sm leading-relaxed text-d-muted">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
