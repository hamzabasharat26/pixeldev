/** Keyboard skip-to-content link; visible only when focused. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="text-eyebrow sr-only z-[100] rounded-md bg-navy px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}
