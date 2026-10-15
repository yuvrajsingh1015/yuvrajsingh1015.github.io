import { useEffect, useRef } from "react";

// [frequency, amplitude (share of height), opacity, line width, speed]
const WAVES = [
  [0.9, 0.12, 0.45, 1.5, 1.2],
  [1.7, 0.07, 0.25, 1, 1.7],
  [0.5, 0.16, 0.15, 1, 2.2],
];
const GRID = 48;

export default function Oscilloscope() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const start = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(reduceMotion ? 0 : (performance.now() - start) / 1000);
    }

    function draw(t) {
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--accent").trim() || "#2dd4bf";
      const line = styles.getPropertyValue("--line").trim() || "#27272a";

      ctx.clearRect(0, 0, width, height);

      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += GRID) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += GRID) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      ctx.strokeStyle = accent;
      const mid = height * 0.52;
      WAVES.forEach(([freq, amp, alpha, lineWidth, speed], i) => {
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const y =
            mid +
            Math.sin(x * 0.006 * freq + t * speed) *
              amp *
              height *
              (0.65 + 0.35 * Math.sin(t * 0.4 + i)) +
            Math.sin(x * 0.02 + t * 2) * 4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }

    function loop(now) {
      frame = 0;
      if (!visible) return;
      draw((now - start) / 1000);
      frame = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion && !frame)
        frame = requestAnimationFrame(loop);
    });
    visibilityObserver.observe(canvas);

    // redraw once when the theme changes (matters for reduced motion, where nothing loops)
    const themeObserver = new MutationObserver(() =>
      draw(reduceMotion ? 0 : (performance.now() - start) / 1000),
    );
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
    />
  );
}
