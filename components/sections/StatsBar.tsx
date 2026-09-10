import { site } from "@/content/site";
import { Counter } from "@/components/ui/Counter";

/** Studio stats. Used on /about (the homepage carries these in the hero card). */
export function StatsBar() {
  return (
    <section className="section--band py-14 md:py-16">
      <div className="container-wide">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label} className="border-t border-line-2 pt-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-data text-3xl font-semibold text-ink md:text-4xl">
                <Counter value={s.value} />
              </dd>
              <dd className="text-eyebrow mt-2 text-faint">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
