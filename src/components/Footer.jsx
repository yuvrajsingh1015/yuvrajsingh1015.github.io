import { paletteKey } from "../palette";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-xs text-subtle">
        <span>© {new Date().getFullYear()} Yuvraj Singh</span>
        <span className="hidden [@media(hover:hover)]:inline">
          tip: press{" "}
          <kbd className="rounded-xs border border-line px-1 text-fg">
            {paletteKey}
          </kbd>{" "}
          for the command palette
        </span>
      </div>
    </footer>
  );
}
