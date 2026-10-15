export default function SectionHeading({ number, label, title }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-accent">{`${number} // ${label}`}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">
        {title}
      </h2>
    </div>
  );
}