import { faqs } from "@/content/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FaqAccordion() {
  return (
    <section id="faq" className="section--band section">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                What clients ask first.
              </>
            }
            className="lg:flex-col lg:items-start"
          />
        </Reveal>

        <Reveal className="border-t border-line-2">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              name="faq"
              className="group border-b border-line-2 py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.05rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line-2 text-faint transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[64ch] text-[0.95rem] leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
