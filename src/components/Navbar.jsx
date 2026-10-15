const links = ["about", "skills", "projects", "contact"];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 border-b border-zinc-800/60 bg-bg/70 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 font-mono text-sm">
        <a href="#" className="hidden text-zinc-50 sm:block">
          ~/yuvraj
        </a>
        <ul className="flex gap-5 sm:gap-6">
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link}`} className="text-zinc-400 transition-colors hover:text-accent">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}