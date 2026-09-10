import Image from "next/image";

/**
 * Hero ground: the navy + rust "data highway" render, full-bleed and heavily
 * washed so it reads as depth behind the content rather than as a picture.
 * Server-rendered, unoptimised (the media pipeline already sized it) so it
 * never sits in the LCP critical path behind the image optimiser.
 */
export function HeroMedia() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src="/services/hero-bg-1920.webp"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover opacity-90"
      />
      {/* vertical wash: readable at the top, butts the next section at the base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(6 11 20 / 0.72) 0%, rgb(6 11 20 / 0.66) 45%, rgb(6 11 20 / 0.9) 82%, var(--color-navy-ink) 100%)",
        }}
      />
      {/* horizontal wash: darkest under the headline column */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(6 11 20 / 0.82) 0%, rgb(6 11 20 / 0.35) 48%, transparent 78%)",
        }}
      />
      {/* faint measurement grid — the studio's own vernacular, very quiet */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-navy-500) 40%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-navy-500) 40%, transparent) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(90% 70% at 30% 40%, #000 0%, transparent 88%)",
        }}
      />
    </div>
  );
}
