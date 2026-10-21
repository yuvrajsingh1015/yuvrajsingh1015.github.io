import { about, skills } from "../data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SkillChip from "./SkillChip";
import TypedPrompt from "./TypedPrompt";

export default function About() {
  return (
    <section id="about" className="snap-section mx-auto max-w-6xl px-6 py-24">
      <SectionHeading number="01" label="about" title="About me" />

      <div className="grid gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
        <div>
          <Reveal>
            <p className="text-xl leading-6 tracking-tight text-fg">
              {about.lead}
            </p>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-6 space-y-6 text-base leading-6 text-muted"
          >
            {about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={240} className="space-y-6">
          <div className="rounded-sm bg-card p-6 font-mono text-sm leading-6 ring-1 ring-line ring-inset">
            <TypedPrompt className="text-accent" text="$ cat profile" />
            <dl className="rhythm-rows mt-6">
              {about.facts.map(([key, value]) => (
                <div key={key} className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="text-subtle">{key}</dt>
                  <dd className="text-body">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-sm bg-card p-6 font-mono text-sm leading-6 ring-1 ring-line ring-inset">
            <TypedPrompt className="text-accent" text="$ ls skills/" />
            <dl className="mt-6 space-y-[26px]">
              {skills.map(({ group, items }) => (
                <div key={group}>
                  <dt className="text-subtle">{group}/</dt>
                  <dd className="mt-0.5 flex flex-wrap gap-x-1.5 gap-y-1">
                    {items.map((skill) => (
                      <SkillChip key={skill.name} {...skill} />
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
