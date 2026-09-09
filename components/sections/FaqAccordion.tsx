import { faqs } from "@/content/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqAccordion() {
  return (
    <section id="faq" className="section-y bg-grey-50">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Questions"
          title="Things clients ask before starting."
          className="lg:flex-col lg:items-start"
        />

        <div className="border-t border-grey-200">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              name="faq"
              className="group border-b border-grey-200 py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.05rem] font-medium text-navy [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-grey-300 text-grey-500 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[62ch] text-[0.95rem] leading-relaxed text-grey-700">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
