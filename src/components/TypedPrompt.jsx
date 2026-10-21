import { useEffect, useRef, useState } from "react";

const CHAR_MS = 45;

// a "$ command" line that types itself out the first time it scrolls into view
export default function TypedPrompt({ text, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? text.length
      : 0,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || shown >= text.length) return undefined;
    let timer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      timer = setInterval(() => {
        setShown((n) => {
          if (n + 1 >= text.length) clearInterval(timer);
          return n + 1;
        });
      }, CHAR_MS);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
    // only runs once: the typing itself updates `shown`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typing = shown < text.length;

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, shown)}</span>
      {typing && (
        <span
          aria-hidden="true"
          className="inline-block h-[1em] w-[0.55ch] translate-y-[0.15em] bg-accent"
        />
      )}
      {/* the rest stays invisible so the line never changes width */}
      <span aria-hidden="true" className="invisible">
        {text.slice(shown)}
      </span>
    </p>
  );
}
