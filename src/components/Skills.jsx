import { skills } from "../data";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading number="02" label="skills" title="Skills" />

      <div className="space-y-8">
        {skills.map((group) => (
          <div key={group.group} className="grid gap-3 sm:grid-cols-[10rem_1fr]">
            <h3 className="font-mono text-sm text-fg0">{group.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-line bg-card px-3 py-1 font-mono text-xs text-body transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}