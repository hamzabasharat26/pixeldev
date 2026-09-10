import { processSteps } from "@/content/process";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessSteps() {
  return (
    <section className="section--band section">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            title={
              <>
                A process built around shipping.
              </>
            }
            intro="Short cycles, a live staging link from week one, no month-long silences."
          />
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {processSteps.map((step) => (
            <Reveal as="li" key={step.n} className="relative md:pt-8">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 hidden h-px w-full bg-line-2 md:block"
              />
              <span
                aria-hidden="true"
                className="absolute -top-[3px] left-0 hidden h-[7px] w-[7px] rounded-full bg-amber md:block"
              />
              <span className="text-data block text-sm font-semibold text-clay-600">
                {step.n}
              </span>
              <h3 className="text-h4 mt-2 text-ink">{step.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
