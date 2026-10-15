import { about } from "../data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading number="01" label="about" title="About me" />

      <Reveal className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
        {about.text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {about.focus.map((item, i) => (
          <Reveal key={item.title} delay={i * 120}>
            <div className="h-full rounded-lg border border-line bg-card p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/60 hover:bg-card-hover">
              <h3 className="font-mono text-sm text-accent">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
