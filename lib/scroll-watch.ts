// Scroll-linked updates without ScrollTrigger, whose permanent rAF loop kept the idle page rendering every frame (README, Motion).
export function watchScroll(
  el: Element,
  onFrame: (rect: DOMRect, viewportHeight: number) => void,
): () => void {
  let frame = 0;
  let near = false;

  const run = () => {
    frame = 0;
    onFrame(el.getBoundingClientRect(), window.innerHeight);
  };
  const request = () => {
    if (!frame) frame = requestAnimationFrame(run);
  };
  const onScroll = () => {
    if (near) request();
  };

  // One update on entering and on leaving the zone, so the last state always lands.
  const io = new IntersectionObserver(
    ([entry]) => {
      near = entry.isIntersecting;
      request();
    },
    { rootMargin: "50% 0px" },
  );
  io.observe(el);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  return () => {
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(frame);
  };
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
