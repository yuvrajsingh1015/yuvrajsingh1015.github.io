import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../data";

function scrollToSection(id) {
  const el = id ? document.getElementById(id) : null;
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildActions(notify) {
  return [
    { label: "go to top", hint: "home", run: () => scrollToSection(null) },
    {
      label: "go to about",
      hint: "section",
      run: () => scrollToSection("about"),
    },
    {
      label: "go to projects",
      hint: "section",
      run: () => scrollToSection("projects"),
    },
    {
      label: "go to contact",
      hint: "section",
      run: () => scrollToSection("contact"),
    },
    {
      label: "download cv",
      hint: "pdf",
      run: () => window.open(profile.cv, "_blank", "noopener"),
    },
    {
      label: "copy email",
      hint: profile.email,
      keepOpen: true,
      run: async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          notify("copied ✓");
        } catch {
          notify("couldn't copy, use the contact section");
        }
      },
    },
    {
      label: "open github",
      hint: "new tab",
      run: () => window.open(profile.github, "_blank", "noopener"),
    },
    {
      label: "open linkedin",
      hint: "new tab",
      run: () => window.open(profile.linkedin, "_blank", "noopener"),
    },
    {
      label: "toggle theme",
      hint: "light / dark",
      run: () => document.querySelector("[data-theme-toggle]")?.click(),
    },
  ];
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const returnFocus = useRef(null);

  const actions = useMemo(() => buildActions(setMessage), []);
  const results = actions.filter((action) =>
    `${action.label} ${action.hint}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    function show() {
      returnFocus.current = document.activeElement;
      setQuery("");
      setActive(0);
      setMessage("");
      setOpen(true);
    }
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) setOpen(false);
        else show();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-palette", show);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-palette", show);
    };
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle("palette-open", open);
    if (open) inputRef.current?.focus();
    else returnFocus.current?.focus?.();
  }, [open]);

  if (!open) return null;

  function run(action) {
    if (!action) return;
    action.run();
    if (!action.keepOpen) setOpen(false);
  }

  function onKeyDown(event) {
    if (event.key === "Escape") setOpen(false);
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[active]);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/60 px-4 pt-[15vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-sm bg-card font-mono text-sm leading-6 shadow-2xl ring-1 ring-line motion-safe:animate-fade"
        style={{ animationDuration: "0.15s" }}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span aria-hidden="true" className="text-accent">
            ›
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
              setMessage("");
            }}
            placeholder="type a command…"
            aria-label="Search commands"
            aria-controls="palette-list"
            aria-activedescendant={
              results[active] ? `palette-${active}` : undefined
            }
            role="combobox"
            aria-expanded="true"
            className="w-full bg-transparent text-fg outline-none placeholder:text-subtle"
          />
          <kbd className="rounded-xs border border-line px-1.5 text-xs text-subtle">
            esc
          </kbd>
        </div>

        <ul
          id="palette-list"
          role="listbox"
          className="max-h-[min(60vh,24rem)] overflow-y-auto py-2"
        >
          {results.map((action, i) => (
            <li
              key={action.label}
              id={`palette-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => run(action)}
              className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-1.5 ${
                i === active ? "bg-card-hover text-accent" : "text-body"
              }`}
            >
              <span>{action.label}</span>
              <span className="truncate text-xs text-subtle">
                {action.hint}
              </span>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-4 py-1.5 text-subtle">no matching command</li>
          )}
        </ul>

        <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-2 text-xs text-subtle">
          <span>↑↓ move · ↵ run · esc close</span>
          <span aria-live="polite" className="text-accent">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}
