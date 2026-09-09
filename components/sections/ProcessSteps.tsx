import { processSteps } from "@/content/process";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessSteps() {
  return (
    <section className="section-y bg-grey-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="How we work"
          title="A process built around shipping."
          intro="Short cycles, visible progress, no month-long silences."
        />

        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {processSteps.map((step) => (
            <li key={step.n} className="relative md:pt-8">
              {/* connecting hairline on desktop */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 hidden h-px w-full bg-grey-200 md:block"
              />
              <span
                aria-hidden="true"
                className="absolute -top-[3px] left-0 hidden h-[7px] w-[7px] rounded-full bg-amber md:block"
              />
              <span className="text-data block text-sm text-amber-700">
                {step.n}
              </span>
              <h3 className="text-h4 mt-2 text-navy">{step.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-grey-700">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
