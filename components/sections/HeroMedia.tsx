/**
 * Hero ground for the light theme.
 *
 * No photograph: the robot is the image, and a busy backdrop behind a cut-out
 * subject just muddies it. Instead, brand-coloured light (`.aurora` in
 * globals.css) drifts slowly behind the content, with a cream settle at the
 * base so the section hands off to the band below, and a very quiet
 * measurement grid, which is the studio's own vernacular.
 *
 * The aurora wrapper takes the pointer drift and the scroll parallax from
 * HeroReveal; the blobs inside take the idle drift from CSS. Separate
 * elements, so the two never fight over the same transform.
 */
export function HeroMedia() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div data-hero-aurora className="absolute inset-0">
        <span className="aurora aurora-a" />
        <span className="aurora aurora-b" />
        <span className="aurora aurora-c" />
      </div>
      {/* cream settle into the next band */}
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--color-paper-2))",
        }}
      />
      {/* measurement grid, masked so it never reaches the text */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(10 40 74 / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(10 40 74 / 0.07) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage:
            "radial-gradient(80% 70% at 72% 34%, #000 0%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(80% 70% at 72% 34%, #000 0%, transparent 82%)",
        }}
      />
    </div>
  );
}
