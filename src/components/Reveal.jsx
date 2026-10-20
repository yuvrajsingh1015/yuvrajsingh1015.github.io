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
        if (entry.isIntersecting) setState("shown");
        else if (entry.boundingClientRect.top < 0) setState("past");
        // left at the bottom (scrolling back up): reset so it animates in again
        else setState("hidden");
      },
      { threshold: 0.15, rootMargin: "-12% 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stateClass =
    state === "shown" ? "is-visible" : state === "past" ? "is-past" : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${stateClass} ${className}`}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
