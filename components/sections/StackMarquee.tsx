import type { CSSProperties } from "react";
import { Cloud, Cpu, Radar, Search } from "lucide-react";
import { brandIcons } from "@/content/brand-icons";
import { stackRows, type StackItem } from "@/content/stack";
import { Marquee } from "@/components/ui/Marquee";
import { MarqueeToggle } from "@/components/ui/MarqueeToggle";

const GLYPHS = { cloud: Cloud, cpu: Cpu, radar: Radar, search: Search } as const;

/**
 * A tool chip. Marks sit in a quiet grey until hovered, then take their own
 * brand colour: a logo wall that stays calm at rest instead of shouting 30
 * colours at once.
 */
function Chip({ item }: { item: StackItem }) {
  const brand = item.icon ? brandIcons[item.icon] : null;
  const Glyph = item.glyph ? GLYPHS[item.glyph] : null;

  return (
    <span
      className="group/chip inline-flex shrink-0 translate-y-0 items-center gap-2.5 whitespace-nowrap rounded-xl border border-line bg-surface py-2.5 pr-4 pl-3 text-[0.88rem] font-medium text-ink shadow-e1 transition-[border-color,box-shadow,translate] duration-200 hover:-translate-y-0.5 hover:border-line-2 hover:shadow-e2"
      style={brand ? ({ "--brand": brand.hex } as CSSProperties) : undefined}
    >
      {brand ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[18px] w-[18px] shrink-0 fill-faint transition-colors duration-200 group-hover/chip:fill-[var(--brand)]"
        >
          <path d={brand.path} />
        </svg>
      ) : Glyph ? (
        <Glyph
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className="shrink-0 text-faint transition-colors duration-200 group-hover/chip:text-amber-600"
        />
      ) : null}
      {item.label}
    </span>
  );
}

export function StackMarquee() {
  const [vision, product] = stackRows;
  return (
    <section
      aria-labelledby="stack-heading"
      className="relative overflow-hidden bg-paper py-14 md:py-16"
    >
      <div className="container-wide flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="stack-heading" className="text-eyebrow text-faint">
            The stack we build and maintain on
          </h2>
          <p className="mt-2 max-w-xl text-[0.98rem] text-muted">
            Tools we have shipped to production with, not a wish list.
          </p>
        </div>
        <MarqueeToggle targets="stack-row-1 stack-row-2" label="stack strip" />
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Marquee
          id="stack-row-1"
          durationSeconds={70}
          gapClassName="gap-3 pe-3 py-1.5"
          aria-label={vision.title}
        >
          {vision.items.map((item) => (
            <Chip key={item.label} item={item} />
          ))}
        </Marquee>
        <Marquee
          id="stack-row-2"
          direction="right"
          durationSeconds={78}
          gapClassName="gap-3 pe-3 py-1.5"
          aria-label={product.title}
        >
          {product.items.map((item) => (
            <Chip key={item.label} item={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
