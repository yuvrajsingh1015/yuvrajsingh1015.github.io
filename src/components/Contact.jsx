import { useState } from "react";
import { profile } from "../data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const LinkedInIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
  </svg>
);
export const GitHubIcon = () => (
  <svg {...iconProps}>
    <path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
  </svg>
);

const channels = [
  {
    label: "email",
    text: profile.email,
    href: `mailto:${profile.email}`,
    Icon: MailIcon,
  },
  {
    label: "linkedin",
    text: "yuvraj-singh",
    href: profile.linkedin,
    Icon: LinkedInIcon,
  },
  {
    label: "github",
    text: "yuvrajsingh1015",
    href: profile.github,
    Icon: GitHubIcon,
  },
];

const emptyForm = { name: "", email: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter your name";
  if (!form.email.trim()) errors.email = "Enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "That email doesn't look right";
  if (form.message.trim().length < 10)
    errors.message = "Write at least a short message (10+ characters)";
  return errors;
}

const fieldClass =
  "w-full rounded-md border border-line bg-bg/60 px-3 py-2 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-accent";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the mailto link still works
    }
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const subject = `Portfolio contact from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading number="03" label="contact" title="Get in touch" />

      <Reveal className="grid gap-10 md:grid-cols-[2fr_3fr]">
        <div>
          <p className="text-lg leading-relaxed text-muted">
            I'm looking for a working student position in software development
            or IT. Send me a message or reach out directly.
          </p>

          <ul className="mt-8 space-y-3">
            {channels.map(({ label, text, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={label === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-lg border border-line bg-card p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card-hover"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line text-muted transition-colors group-hover:border-accent/60 group-hover:text-accent">
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs text-subtle">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-body group-hover:text-fg">
                      {text}
                    </span>
                  </span>
                  <span className="ml-auto font-mono text-sm text-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-4 font-mono text-xs text-muted transition-colors hover:text-accent"
            aria-live="polite"
          >
            {copied ? "copied ✓" : "copy email address"}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-lg border border-line bg-card p-6"
        >
          <p className="font-mono text-sm text-accent">$ send-message</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block font-mono text-xs text-subtle">
                name
              </span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Jane Doe"
                autoComplete="name"
                className={fieldClass}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.name}
                </span>
              )}
            </label>

            <label className="block">
              <span className="mb-1 block font-mono text-xs text-subtle">
                email
              </span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="jane@company.com"
                autoComplete="email"
                className={fieldClass}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.email}
                </span>
              )}
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-1 block font-mono text-xs text-subtle">
              message
            </span>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Hi Yuvraj, we have a working student position…"
              className={`${fieldClass} resize-y`}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.message}
              </span>
            )}
          </label>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-md border border-accent bg-accent/5 px-4 py-2 font-mono text-sm text-accent transition duration-200 hover:-translate-y-0.5 hover:bg-accent/15"
            >
              send message →
            </button>
            <span className="text-xs text-subtle" aria-live="polite">
              {sent
                ? "Your email app should open now."
                : "Opens your email app, pre-filled."}
            </span>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
