import { profile, projects } from "../data";
import { GitHubIcon } from "./Contact";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading number="02" label="projects" title="Projects" />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 150}>
            <article className="flex h-full flex-col rounded-lg border border-line bg-card p-6 transition duration-200 hover:-translate-y-1 hover:border-accent/60 hover:bg-card-hover">
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
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-md border border-line bg-card px-5 py-3 font-mono text-sm text-body transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card-hover hover:text-accent"
        >
          <GitHubIcon />
          more on github
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </Reveal>
    </section>
  );
}
