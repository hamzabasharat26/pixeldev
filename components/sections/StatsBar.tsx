import { site } from "@/content/site";
import { Counter } from "@/components/ui/Counter";

export function StatsBar() {
  return (
    <section className="bg-surface-raised text-grey-100">
      <div className="container-page grid grid-cols-2 divide-x divide-y divide-surface-border border-y border-surface-border sm:grid-cols-4 sm:divide-y-0">
        {site.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 px-2 py-10 sm:px-6">
            <Counter
              value={stat.value}
              className="text-data text-4xl font-semibold text-grey-50 md:text-5xl"
            />
            <span className="text-eyebrow text-grey-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
