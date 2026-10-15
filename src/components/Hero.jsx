import { profile } from "../data";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6">
      <p className="font-mono text-sm text-accent">~/yuvraj $ whoami</p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
        {profile.name}
        <span
          aria-hidden="true"
          className="ml-2 inline-block h-[0.8em] w-[0.4em] translate-y-[0.08em] bg-accent motion-safe:animate-blink"
        />
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        {profile.tagline}
      </p>

      <div className="mt-10 flex flex-wrap gap-4 font-mono text-sm">
        <a
          href="#projects"
          className="rounded-md border border-accent bg-accent/5 px-4 py-2 text-accent transition duration-200 hover:-translate-y-0.5 hover:bg-accent/15"
        >
          view projects →
        </a>
        <a
          href={profile.cv}
          className="rounded-md border border-line bg-card px-4 py-2 text-body transition duration-200 hover:-translate-y-0.5 hover:border-subtle hover:bg-card-hover hover:text-fg"
        >
          download cv
        </a>
      </div>
    </section>
  );
}