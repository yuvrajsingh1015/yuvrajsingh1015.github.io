import { useEffect, useRef, useState } from "react";

// hidden: below the viewport, shown: in view, past: scrolled up out of view
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          return;
        }
        // which edge it left by; judged from its centre so the exit
        // transform can't move it back into view and make it flicker
        const box = entry.boundingClientRect;
        const leftAtTop = box.top + box.height / 2 < window.innerHeight / 2;
        // left at the bottom (scrolling back up): reset so it animates in again
        setState(leftAtTop ? "past" : "hidden");
      },
      { threshold: 0.15, rootMargin: "-12% 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stateClass =
    state === "shown" ? "is-visible" : state === "past" ? "is-past" : "";

  // the observed wrapper never moves; only the inner element is transformed,
  // so the animation can't push it back across the observer's edge
  return (
    <div ref={ref}>
      <Tag
        className={`reveal h-full ${stateClass} ${className}`}
        style={{ transitionDelay: state === "shown" ? `${delay}ms` : "0ms" }}
      >
        {children}
      </Tag>
    </div>
  );
}
