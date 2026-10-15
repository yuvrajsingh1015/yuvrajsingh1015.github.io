import { useEffect, useState } from "react";

function shouldShow() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem("booted") !== "1";
  } catch {
    return false;
  }
}

export default function Loader() {
  const [visible, setVisible] = useState(shouldShow);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const duration = 1000;
    const start = performance.now();
    let frame;
    let timeout;

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem("booted", "1");
        } catch {
          // storage blocked: loader just shows again next visit
        }
        setLeaving(true);
        timeout = setTimeout(() => setVisible(false), 500);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-end justify-between bg-bg px-6 pb-8 font-mono text-accent transition-opacity duration-500 sm:px-10 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="text-sm">{"{ BOOTING }"}</span>
      <span className="text-6xl font-light tabular-nums text-fg sm:text-8xl">
        {progress}
        <span className="text-accent">%</span>
      </span>
    </div>
  );
}
