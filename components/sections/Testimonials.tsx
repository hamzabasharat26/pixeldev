import Image from "next/image";
import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Renders nothing until content/testimonials.ts has real quotes. No placeholder
 * testimonials — ever.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section bg-paper">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Client voices"
          title={
            <>
              What happens <em>after</em> we ship.
            </>
          }
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3" data-count={testimonials.length}>
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-7"
            >
              <span className="text-data w-fit rounded-full bg-clay-soft px-3 py-1 text-xs text-clay-600">
                {t.badge}
              </span>
              <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-ink">
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
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-faint">{t.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
