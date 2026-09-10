import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MetricValue } from "@/components/ui/MetricValue";
import { Reveal } from "@/components/ui/Reveal";

export function ProofBand() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="glow-orb -right-20 -top-24 h-80 w-80 text-amber opacity-[0.1]"
      />

      <Reveal className="container-wide section relative">
        <Eyebrow>Proof</Eyebrow>
        <h2 className="text-h2 mt-4 max-w-xl text-ink">Proof, not promises.</h2>

        <dl className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {site.proof.map((item) => (
            <div key={item.label} className="border-t border-line-2 pt-5">
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <MetricValue
                  value={item.value}
                  size="hero"
                  className="text-amber-700"
                />
                <span className="mt-3 block max-w-[26ch] text-sm leading-relaxed text-muted">
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
