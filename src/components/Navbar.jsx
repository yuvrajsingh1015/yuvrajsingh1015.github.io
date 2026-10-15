import ThemeToggle from "./ThemeToggle";

const links = ["about", "skills", "projects", "contact"];

export default function Navbar() {
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
                  className="group text-muted transition-colors hover:text-fg"
                >
                  <span className="mr-1 text-accent/70 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link}
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
