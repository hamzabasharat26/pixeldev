import Image from "next/image";
import Link from "next/link";

/**
 * The one orchestrated moment on the page: a glass panel showing real model
 * output, cross-fading between three shipped systems. Pure CSS — the
 * `hero-cycle` keyframes in globals.css hold each frame then hand over.
 * Under reduced motion the animation is killed and the first frame stands.
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
    <div className="relative w-full max-w-[560px]">
      <div className="glass overflow-hidden rounded-2xl p-2.5">
        <div className="det-frame relative z-10 aspect-[16/10] overflow-hidden rounded-xl bg-navy-900">
          {FRAMES.map((f, i) => (
            <Image
              key={f.slug}
              src={f.src}
              alt=""
              fill
              unoptimized
              priority={i === 0}
              sizes="(min-width: 1024px) 540px, 100vw"
              className="hero-cycle object-cover"
              style={{ animationDelay: `${i * 4}s` }}
            />
          ))}
        </div>

        {/* readout bar — the machine's own voice, always legible */}
        <div className="relative z-10 mt-2.5 flex h-[3.4rem] items-center justify-between gap-3 rounded-xl bg-navy-900/70 px-3.5">
          <div className="relative min-w-0 flex-1">
            {FRAMES.map((f, i) => (
              <div
                key={f.slug}
                className="hero-cycle absolute inset-0 flex flex-col justify-center"
                style={{ animationDelay: `${i * 4}s` }}
              >
                <p className="text-readout truncate text-signal">{f.label}</p>
                <p className="mt-0.5 truncate text-[0.82rem] text-d-text">
                  {f.reading}
                </p>
              </div>
            ))}
            {/* reserves the height so the bar never collapses */}
            <div className="invisible">
              <p className="text-readout">&nbsp;</p>
              <p className="mt-0.5 text-[0.82rem]">&nbsp;</p>
            </div>
          </div>

          <Link
            href="/work"
            className="shrink-0 rounded-lg border border-white/15 bg-white/8 px-3 py-1.5 text-[0.78rem] font-medium text-d-text transition-colors hover:border-amber-300/60 hover:text-amber-300"
          >
            All work
          </Link>
        </div>
      </div>

      <p className="mt-3 pl-1 text-[0.82rem] text-d-muted">
        Real output from systems running in production today.
      </p>
    </div>
  );
}
