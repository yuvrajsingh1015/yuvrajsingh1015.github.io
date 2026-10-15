import ThemeToggle from "./ThemeToggle";

const links = ["about", "skills", "projects", "contact"];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 border-b border-line/60 bg-bg/70 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 font-mono text-xs sm:text-sm">
        <a href="#" className="hidden text-fg sm:block">
          ~/yuvraj
        </a>
        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <ul className="flex gap-4 sm:gap-6">
            {links.map((link) => (
              <li key={link}>
                <a href={`#${link}`} className="text-muted transition-colors hover:text-accent">
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
