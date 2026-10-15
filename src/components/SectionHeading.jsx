import Reveal from "./Reveal";

export default function SectionHeading({ number, label, title }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-end justify-between gap-6 pb-6">
        <h2 className="overflow-hidden pb-1 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          <span className="reveal-title">{title}</span>
        </h2>
        <p className="shrink-0 font-mono text-xs text-accent sm:text-sm">
          {`{ ${number} · ${label.toUpperCase()} }`}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="reveal-line block h-px w-full bg-line"
      />
    </Reveal>
  );
}
