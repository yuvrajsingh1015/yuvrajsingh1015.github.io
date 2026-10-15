import { about } from "../data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading number="01" label="about" title="About me" />

      <div className="grid gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
        <div>
          <Reveal>
            <p className="text-2xl leading-snug font-medium tracking-tight text-fg sm:text-3xl">
              {about.lead}
            </p>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-8 space-y-4 text-lg leading-relaxed text-muted"
          >
            {about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div className="rounded-lg border border-line bg-card p-6 font-mono text-sm">
            <p className="text-accent">$ cat profile</p>
            <dl className="mt-5 divide-y divide-line">
              {about.facts.map(([key, value]) => (
                <div key={key} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                  <dt className="text-subtle">{key}</dt>
                  <dd className="text-body">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
