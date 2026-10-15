import { profile } from "../data";
import SectionHeading from "./SectionHeading";

const links = [
  { label: "email", href: `mailto:${profile.email}`, text: profile.email },
  { label: "linkedin", href: profile.linkedin, text: "yuvraj-singh" },
  { label: "github", href: profile.github, text: "yuvrajsingh1015" },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading number="04" label="contact" title="Get in touch" />

      <p className="max-w-xl text-lg leading-relaxed text-muted">
        I'm looking for a working student position in software development or IT.
        The fastest way to reach me is by email.
      </p>

      <ul className="mt-10 space-y-3">
        {links.map((link) => (
          <li key={link.label} className="grid grid-cols-[6rem_1fr] font-mono text-sm">
            <span className="text-fg0">{link.label}</span>
            <a
              href={link.href}
              target={link.label === "email" ? undefined : "_blank"}
              rel="noreferrer"
              className="text-body transition-colors hover:text-accent"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}