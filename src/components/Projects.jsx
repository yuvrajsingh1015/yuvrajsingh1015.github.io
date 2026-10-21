import { profile, projectId, projects } from "../data";
import { GitHubIcon } from "./Contact";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function ArrowUpRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="snap-section mx-auto max-w-6xl px-6 py-24"
    >
      <SectionHeading number="02" label="projects" title="Projects" />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 150}>
            <article
              id={projectId(project.title)}
              className="group ticks flex h-full flex-col rounded-sm bg-card p-6 ring-1 ring-line ring-inset transition duration-200 hover:-translate-y-1 hover:bg-card-hover"
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  title="view on GitHub"
                  className="absolute right-6 bottom-6 flex h-6 w-6 items-center justify-center text-subtle transition duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-accent"
                >
                  <ArrowUpRight />
                </a>
              )}
              <h3 className="text-lg leading-6 font-semibold text-fg transition-colors duration-200 group-hover:text-accent">
                {project.title}
              </h3>
              <p className="flex-1 text-sm leading-6 text-muted">
                {project.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-4 pr-8">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-xs leading-6 text-accent"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-[60px] flex justify-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-sm bg-card px-5 py-3 font-mono text-sm leading-6 text-body ring-1 ring-line ring-inset transition duration-200 hover:-translate-y-0.5 hover:bg-card-hover hover:text-accent hover:ring-accent/60"
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
