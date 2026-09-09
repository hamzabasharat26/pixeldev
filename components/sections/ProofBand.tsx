import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function ProofBand() {
  return (
    <section className="bg-navy text-white">
      <div className="container-page section-y">
        <Eyebrow tone="light">Outcomes</Eyebrow>
        <h2 className="text-h2 mt-4 max-w-xl text-white">
          Outcomes, not promises.
        </h2>

        <dl className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {site.proof.map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="text-data block text-4xl font-bold text-amber md:text-5xl">
                  {item.value}
                </span>
                <span className="mt-3 block max-w-[24ch] text-sm leading-relaxed text-grey-300">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
