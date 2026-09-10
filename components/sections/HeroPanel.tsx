import Image from "next/image";
import Link from "next/link";

/**
 * A small dark "screen" floating over the light hero, cross-fading three real
 * production frames. It stays dark on purpose: against white it reads as an
 * actual monitor showing actual output, and it's the contrast anchor that stops
 * the light hero going flat.
 *
 * Pure CSS — the `hero-cycle` keyframes in globals.css hold each frame then
 * hand over. Under reduced motion the animation is killed and frame one stands.
 */
const FRAMES = [
  {
    slug: "safe-rail",
    src: "/work/safe-rail/cover-800.webp",
    label: "Safe Rail",
    reading: "Track bed and ballast, segmented every frame",
  },
  {
    slug: "tire-cord-fabric-defect",
    src: "/work/tire-cord-fabric-defect/cover-800.webp",
    label: "Tire-cord defect detection",
    reading: "Anomaly heatmap over the running weave",
  },
  {
    slug: "candy-detection",
    src: "/work/candy-detection/cover-800.webp",
    label: "Candy detection",
    reading: "Every piece tracked, counted exactly once",
  },
];

export function HeroPanel() {
  return (
    <div className="rounded-2xl border border-navy-600/50 bg-navy-900/95 p-2 shadow-e3 backdrop-blur-sm">
      <div className="det-frame relative aspect-[16/10] overflow-hidden rounded-xl bg-navy-ink">
        {FRAMES.map((f, i) => (
          <Image
            key={f.slug}
            src={f.src}
            alt=""
            fill
            unoptimized
            sizes="360px"
            className="hero-cycle object-cover"
            style={{ animationDelay: `${i * 4}s` }}
          />
        ))}
      </div>

      {/* readout bar — the machine's own voice, always legible */}
      <div className="relative mt-2 flex items-center justify-between gap-2 px-1.5 pb-1">
        <div className="relative min-w-0 flex-1">
          {FRAMES.map((f, i) => (
            <div
              key={f.slug}
              className="hero-cycle absolute inset-0 flex flex-col justify-center"
              style={{ animationDelay: `${i * 4}s` }}
            >
              <p className="text-readout truncate text-signal">{f.label}</p>
              <p className="mt-0.5 truncate text-[0.72rem] text-d-muted">
                {f.reading}
              </p>
            </div>
          ))}
          {/* reserves the height so the bar never collapses */}
          <div className="invisible">
            <p className="text-readout">&nbsp;</p>
            <p className="mt-0.5 text-[0.72rem]">&nbsp;</p>
          </div>
        </div>

        <Link
          href="/work"
          className="shrink-0 rounded-lg border border-white/15 px-2.5 py-1 text-[0.72rem] font-medium text-d-text transition-colors hover:border-amber-300/60 hover:text-amber-300"
        >
          All work
        </Link>
      </div>
    </div>
  );
}
