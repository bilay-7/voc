/**
 * Ref callback for lucide icons: normalises every shape's path length and
 * adds `is-drawn` once the icon scrolls into view, so the CSS can draw it
 * stroke by stroke (see `.icon-draw` in index.css).
 */
export function drawRef(svg) {
  if (!svg) return undefined;
  svg.querySelectorAll('*').forEach((shape) => shape.setAttribute('pathLength', '1'));
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        svg.classList.add('is-drawn');
        observer.disconnect();
      }
    },
    { threshold: 0.6 }
  );
  observer.observe(svg);
  return () => observer.disconnect();
}
