import { projects } from "../data";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading number="03" label="projects" title="Projects" />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col rounded-lg border border-line bg-card p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="text-lg font-semibold text-fg">{project.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
              {project.tags.map((tag) => (
                <li key={tag} className="font-mono text-xs text-accent">
                  {tag}
                </li>
              ))}
            </ul>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-4 font-mono text-xs text-muted hover:text-accent"
              >
                github →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}