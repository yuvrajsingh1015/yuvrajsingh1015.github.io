import { useEffect, useRef, useState } from "react";
import { openPalette, paletteKey } from "../palette";
import ThemeToggle from "./ThemeToggle";

const links = ["about", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState(null);
  const progressRef = useRef(null);

  // thin line under the bar that fills as the page is scrolled
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${progress})`;
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // highlight the section that crosses the middle of the screen
  useEffect(() => {
    const sections = links
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          else if (
            entry.target.id === links[0] &&
            entry.boundingClientRect.top > 0
          )
            setActive(null);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-line/60 bg-bg/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="hidden text-base tracking-tight text-fg sm:block"
        >
          <span className="font-semibold">Yuvraj</span>
          <span className="font-light text-muted">Singh</span>
        </a>
        <div className="ml-auto flex items-center gap-4 sm:gap-7">
          <ul className="flex gap-4 font-mono text-xs sm:gap-7 sm:text-sm">
            {links.map((link, i) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  aria-current={active === link ? "location" : undefined}
                  className={`group relative transition-colors hover:text-fg ${
                    active === link ? "text-fg" : "text-muted"
                  }`}
                >
                  <span
                    className={`mr-1 transition-colors group-hover:text-accent ${
                      active === link ? "text-accent" : "text-accent/70"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-1.5 h-px origin-left bg-accent transition-transform duration-300 ${
                      active === link ? "scale-x-100" : "scale-x-0 opacity-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openPalette}
            aria-label={`Open command palette (${paletteKey})`}
            title="command palette"
            className="hidden rounded-xs border border-line px-1.5 font-mono text-xs leading-5 text-subtle transition-colors hover:border-accent/60 hover:text-accent sm:block"
          >
            {paletteKey}
          </button>
          <ThemeToggle />
        </div>
      </nav>
      <span
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent"
      />
    </header>
  );
}
