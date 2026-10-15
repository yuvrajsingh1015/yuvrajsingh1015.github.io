import { about } from "../data";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading number="01" label="about" title="About me" />

      <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-zinc-400">
        {about.text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {about.focus.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 transition-colors hover:border-accent/50"
          >
            <h3 className="font-mono text-sm text-accent">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}