import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = ["about", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState(null);

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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
