import Image from "next/image";
import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  // Never fabricate — the section simply doesn't exist until there are real quotes.
  if (testimonials.length === 0) return null;

  return (
    <section className="section-y bg-grey-100">
      <div className="container-page">
        <SectionHeading
          eyebrow="Client voices"
          title="What it's like to work with us."
        />

        <ul
          className="mt-12 grid gap-6 md:grid-cols-3"
          data-count={testimonials.length}
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="flex flex-col rounded-[16px] border border-grey-200 bg-white p-8"
            >
              <span className="text-data w-fit rounded-full bg-amber/15 px-3 py-1 text-xs text-amber-700">
                {t.badge}
              </span>
              <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-grey-800">
                {t.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                {t.avatar && (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-grey-500">{t.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
