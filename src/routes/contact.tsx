import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Droneman" },
      { name: "description", content: "Get in touch with Droneman for projects, collaborations and ideas." },
      { property: "og:title", content: "Contact — Droneman" },
      { property: "og:description", content: "Reach out via email or phone — Kannur, Kerala." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function Contact() {
  useReveal();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="reveal text-xs uppercase tracking-[0.3em] text-muted-foreground">Get In Touch</p>
      <h1 className="reveal mt-2 font-display text-5xl sm:text-6xl">Contact <span className="gradient-accent-text">Me</span></h1>
      <p className="reveal mt-4 max-w-xl text-muted-foreground">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's connect!
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="reveal space-y-4">
          {[
            { l: "Location", v: "Kannur, Iritty, India - 670704", icon: "📍" },
            { l: "Phone", v: "+91 9645161615", icon: "📞", href: "tel:+919645161615" },
            { l: "Email", v: "contact@droneman.cloud", icon: "✉️", href: "mailto:contact@droneman.cloud" },
          ].map((c, i) => (
            <a
              key={c.l}
              href={c.href ?? "#"}
              className="tilt-card flex items-start gap-4 rounded-3xl border bg-white/80 p-5 backdrop-blur shadow-soft"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.92_0.06_220)] to-[oklch(0.94_0.05_280)] text-xl">
                {c.icon}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.l}</p>
                <p className="mt-0.5 font-medium">{c.v}</p>
              </div>
            </a>
          ))}
        </div>

        <form onSubmit={onSubmit} className="reveal glass space-y-4 rounded-3xl p-6 sm:p-8" noValidate>
          <Field label="Name" name="name" placeholder="Your Name" error={errors.name} />
          <Field label="Email" name="email" type="email" placeholder="Your Email" error={errors.email} />
          <Field label="Message" name="message" placeholder="Your Message" error={errors.message} textarea />
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-smooth hover:translate-y-[-2px]"
          >
            Send Message
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          {sent && (
            <p className="rounded-2xl bg-[oklch(0.95_0.06_150)] px-4 py-3 text-sm text-[oklch(0.35_0.12_150)]">
              Thanks! Your message has been queued.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", placeholder, error, textarea,
}: { label: string; name: string; type?: string; placeholder?: string; error?: string; textarea?: boolean }) {
  const cls =
    "mt-1.5 w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm outline-none transition-smooth focus:border-[oklch(0.78_0.13_220)] focus:ring-4 focus:ring-[oklch(0.85_0.10_220/0.25)]";
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={5} className={cls} maxLength={1000} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={cls} maxLength={255} />
      )}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
