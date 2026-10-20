import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { projectId, projects } from "../data";

const projectTitles = new Set(projects.map((project) => project.title));

// scroll by layout position, so reveal transforms don't throw off the target
function scrollToProject(event, title) {
  const el = document.getElementById(projectId(title));
  if (!el) return;
  event.preventDefault();
  let top = 0;
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
  const header = document.querySelector("header")?.offsetHeight ?? 0;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  window.scrollTo({
    top: top - header - 24,
    behavior: reduceMotion ? "auto" : "smooth",
  });
  el.classList.add("is-target");
  setTimeout(() => el.classList.remove("is-target"), 1800);
}

// opens on hover, keyboard focus or tap; shows where the skill was used
export default function SkillChip({ name, evidence }) {
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const wrapRef = useRef(null);
  const tipRef = useRef(null);
  const pointerRef = useRef(null);
  const tipId = useId();

  // keep the popover inside the viewport on narrow screens
  useLayoutEffect(() => {
    if (!open || !tipRef.current) return;
    const rect = tipRef.current.getBoundingClientRect();
    const margin = 12;
    const left = rect.left - shift;
    const right = left + rect.width;
    if (right > window.innerWidth - margin)
      setShift(window.innerWidth - margin - right);
    else if (left < margin) setShift(margin - left);
    else setShift(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // tap or click anywhere else closes it
  useEffect(() => {
    if (!open) return undefined;
    function onPointerDown(event) {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const chipClass = "rounded border px-2 py-0.5 text-xs transition-colors";

  if (!evidence.length) {
    return <span className={`${chipClass} border-line text-body`}>{name}</span>;
  }

  return (
    <span
      ref={wrapRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
      onBlur={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-describedby={open ? tipId : undefined}
        aria-expanded={open}
        onFocus={(event) => {
          // keyboard focus only; taps and clicks are handled by onClick
          if (event.target.matches(":focus-visible")) setOpen(true);
        }}
        onPointerDown={(event) => {
          pointerRef.current = event.pointerType;
        }}
        // a mouse already opened it on hover; a tap toggles it
        onClick={() =>
          setOpen((value) => (pointerRef.current === "mouse" ? true : !value))
        }
        className={`${chipClass} ${
          open
            ? "border-accent/60 text-accent"
            : "border-line text-body hover:border-accent/60 hover:text-accent"
        }`}
      >
        {name}
      </button>
      {open && (
        <span
          ref={tipRef}
          className="absolute bottom-full left-0 z-30 pb-2"
          style={{ transform: `translateX(${shift}px)` }}
        >
          <span
            id={tipId}
            role="tooltip"
            className="block w-max max-w-[min(16rem,calc(100vw-1.5rem))] rounded-md border border-line bg-bg/95 p-3 text-xs shadow-lg backdrop-blur motion-safe:animate-fade"
            style={{ animationDuration: "0.2s" }}
          >
            <span className="block text-accent">used in</span>
            <span className="mt-1.5 block space-y-1">
              {evidence.map((item) => (
                <span key={item} className="flex gap-2 text-body">
                  <span aria-hidden="true" className="text-subtle">
                    ›
                  </span>
                  {projectTitles.has(item) ? (
                    <a
                      href={`#${projectId(item)}`}
                      onClick={(event) => {
                        scrollToProject(event, item);
                        setOpen(false);
                      }}
                      className="text-fg underline decoration-accent/50 underline-offset-2 hover:text-accent"
                    >
                      {item}
                    </a>
                  ) : (
                    <span>{item}</span>
                  )}
                </span>
              ))}
            </span>
          </span>
        </span>
      )}
    </span>
  );
}
