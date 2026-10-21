import { useEffect, useRef } from "react";
import { profile } from "../data";
import Oscilloscope from "./Oscilloscope";

function Line({ children, delay, className = "" }) {
  // extra room at the bottom (taken back by the negative margin) so the clip
  // that hides the rising text doesn't cut off descenders like g and j
  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.22em]">
      <span
        className={`block motion-safe:animate-rise ${className}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </span>
  );
}

// each letter of the name lights up teal under the mouse;
// the first letter of each word is set a little larger
function Letters({ text }) {
  return [...text].map((letter, i) => (
    <span
      key={i}
      className={
        i === 0 ? "name-letter mr-[-0.05em] text-[1.1em]" : "name-letter"
      }
    >
      {letter}
    </span>
  ));
}

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    let frame = 0;
    function update() {
      frame = 0;
      const progress = Math.min(
        Math.max(window.scrollY / el.offsetHeight, 0),
        1,
      );
      el.style.setProperty("--p", progress.toFixed(3));
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function moveSpotlight(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--my",
      `${event.clientY - rect.top}px`,
    );
  }

  const [first, second] = profile.headline;

  return (
    <section
      ref={heroRef}
      onPointerMove={moveSpotlight}
      className="relative flex min-h-screen flex-col overflow-hidden pt-24 motion-safe:sticky motion-safe:top-0"
      style={{
        backgroundImage:
          "radial-gradient(320px circle at var(--mx, 70%) var(--my, 40%), color-mix(in srgb, var(--accent) 9%, transparent), transparent 70%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ opacity: "calc(1 - var(--p, 0) * 1.2)" }}
      >
        <Oscilloscope />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6">
        <div style={{ opacity: "calc(1 - var(--p, 0) * 2.5)" }}>
          <div
            className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted motion-safe:animate-fade sm:text-sm"
            style={{ animationDelay: "200ms" }}
          >
            <span>
              <span className="text-accent">~/yuvraj $ whoami</span>
            </span>
            <span className="flex items-center gap-2">{profile.location}</span>
          </div>
        </div>

        <div
          className="my-auto origin-left will-change-transform"
          style={{
            transform:
              "translateY(calc(var(--p, 0) * -18vh)) scale(calc(1 - var(--p, 0) * 0.22))",
            opacity: "calc(1 - var(--p, 0) * 1.3)",
          }}
        >
          <h1 className="py-12 font-semibold leading-[0.9] tracking-[-0.05em] text-fg [font-size:clamp(3.75rem,14vw,12rem)]">
            <Line delay={300}>
              <Letters text={first} />
            </Line>
            <Line delay={450} className="pl-[0.6em]">
              <Letters text={second} />
              <span
                aria-hidden="true"
                className="ml-[0.08em] inline-block h-[0.7em] w-[0.08em] translate-y-[0.04em] bg-accent motion-safe:animate-blink"
              />
            </Line>
          </h1>
        </div>

        <div style={{ opacity: "calc(1 - var(--p, 0) * 2)" }}>
          <div
            style={{ animationDelay: "700ms" }}
            className="grid gap-8 pb-10 motion-safe:animate-fade sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <div>
              <p className="max-w-md text-lg leading-relaxed text-muted">
                {profile.tagline}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
                <a
                  href="#projects"
                  className="rounded-sm border border-accent bg-accent/5 px-4 py-2 text-accent transition duration-200 hover:-translate-y-0.5 hover:bg-accent/15"
                >
                  view projects →
                </a>
                <a
                  href={profile.cv}
                  className="rounded-sm border border-line bg-card px-4 py-2 text-body transition duration-200 hover:-translate-y-0.5 hover:border-subtle hover:bg-card-hover hover:text-fg"
                >
                  download cv
                </a>
              </div>
            </div>
            <a
              href="#about"
              className="group hidden items-center gap-3 font-mono text-xs text-muted transition-colors hover:text-accent sm:flex"
            >
              {"{ SCROLL }"}
              <span className="inline-block transition-transform group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
