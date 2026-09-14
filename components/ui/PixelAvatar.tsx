/**
 * Pixel AI's face: an original mark, drawn here rather than taken from a stock
 * library. A navy lens with a detection-cyan iris, two scan arcs, and a mustard
 * satellite that tracks the ring. It animates transform and opacity only (see
 * the .pixel-avatar rules in globals.css) and holds still under reduced motion.
 */
export function PixelAvatar({ size = 32, live = false }: { size?: number; live?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={live ? "pixel-avatar is-live" : "pixel-avatar"}
    >
      <defs>
        <radialGradient id="pixel-lens" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#1c4a76" />
          <stop offset="62%" stopColor="#0a284a" />
          <stop offset="100%" stopColor="#061627" />
        </radialGradient>
      </defs>

      <circle cx="20" cy="20" r="18.5" fill="url(#pixel-lens)" />
      <circle cx="20" cy="20" r="18.5" stroke="#4fc3e8" strokeOpacity="0.5" strokeWidth="1.2" />

      {/* scan arcs: the lens reading its field */}
      <g className="pixel-avatar-arcs" stroke="#4fc3e8" strokeWidth="1.1" strokeLinecap="round">
        <path d="M5.5 15.5c9 4.6 20 4.6 29 0" strokeOpacity="0.55" />
        <path d="M5.5 24.5c9-4.6 20-4.6 29 0" strokeOpacity="0.35" />
      </g>

      {/* iris */}
      <circle className="pixel-avatar-iris" cx="20" cy="20" r="6.4" fill="#4fc3e8" fillOpacity="0.16" />
      <circle cx="20" cy="20" r="3.1" fill="#4fc3e8" />

      {/* satellite: the one mustard note, the studio's accent */}
      <g className="pixel-avatar-orbit">
        <circle cx="20" cy="3.6" r="2.5" fill="#e0a44a" />
      </g>
    </svg>
  );
}
