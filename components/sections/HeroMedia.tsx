/**
 * Hero ground for the light theme.
 *
 * No photograph — the robot is the image now, and a busy backdrop behind a
 * cut-out subject just muddies it. This is pure CSS: a warm mustard bloom
 * top-right, a cream settle at the base so the section hands off to the band
 * below it, and a very quiet measurement grid (the studio's own vernacular).
 * Being CSS-only also keeps the hero's LCP element the robot, not a backdrop.
 */
export function HeroMedia() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {/* warm bloom behind the robot */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 62% at 78% 26%, var(--color-amber-glow) 0%, transparent 62%), radial-gradient(46% 50% at 8% 6%, rgb(10 40 74 / 0.07) 0%, transparent 64%)",
        }}
      />
      {/* cream settle into the next band */}
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--color-paper-2))",
        }}
      />
      {/* measurement grid — quiet, masked so it never reaches the text */}
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
