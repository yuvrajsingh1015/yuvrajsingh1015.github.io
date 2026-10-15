export default function SectionHeading({ number, label, title }) {
  return (
    <div className="mb-12 flex items-end justify-between gap-6 border-b border-line pb-6">
      <h2 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{title}</h2>
      <p className="shrink-0 font-mono text-xs text-accent sm:text-sm">
        {`{ ${number} · ${label.toUpperCase()} }`}
      </p>
    </div>
  );
}
