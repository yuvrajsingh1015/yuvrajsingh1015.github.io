import { useEffect } from "react";

const ROW = 24; // dot spacing, see the background in index.css

// Pads the bottom of each section so its height is a whole number of dot
// rows. That way every section starts on the same dot row offset and its
// heading sits between the dots the same way as the first one.
export default function useDotRhythm() {
  useEffect(() => {
    const sections = [...document.querySelectorAll(".snap-section")];

    function align() {
      sections.forEach((el) => {
        const extra = Number(el.dataset.rhythm || 0);
        const natural = el.offsetHeight - extra;
        const next = (ROW - (natural % ROW)) % ROW;
        if (next !== extra) {
          el.dataset.rhythm = String(next);
          el.style.paddingBottom = next ? `calc(6rem + ${next}px)` : "";
        }
      });
    }

    align();
    const observer = new ResizeObserver(align);
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
