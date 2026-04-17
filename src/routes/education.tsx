import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education & Certifications — Droneman" },
      { name: "description", content: "MCSE, CCNA, CCNP, BCA and a tech stack covering SharePoint, Exchange, Azure and AWS." },
      { property: "og:title", content: "Education — Droneman" },
      { property: "og:description", content: "Education, certifications and tech stack." },
    ],
  }),
  component: Education,
});

const stack = ["MCSE", "CCNA", "CCNP", "BCA", "SharePoint", "Exchange Server", "Azure", "AWS"];
const certs = [
  { t: "CCNA Certified", d: "Cisco Certified Network Associate" },
  { t: "CCNP Certified", d: "Cisco Certified Network Professional" },
  { t: "MCSE Certified", d: "Microsoft Certified Solutions Expert" },
];

function Education() {
  useReveal();
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="reveal text-xs uppercase tracking-[0.3em] text-muted-foreground">Qualifications</p>
      <h1 className="reveal mt-2 font-display text-5xl sm:text-6xl">Education & <span className="gradient-accent-text">Tech Stack</span></h1>

      <div className="reveal mt-12 flex flex-wrap gap-3">
        {stack.map((s, i) => (
          <span
            key={s}
            className="rounded-2xl border bg-white/80 px-4 py-2 text-sm font-semibold shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-glow animate-float-y"
            style={{ animationDelay: `${i * 0.25}s` }}
          >
            {s}
          </span>
        ))}
      </div>

      <h2 className="reveal mt-16 font-display text-3xl">Certifications</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <article
            key={c.t}
            className="reveal tilt-card group relative overflow-hidden rounded-3xl border bg-white/80 p-6 shadow-soft"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[oklch(0.85_0.10_220/0.5)] to-transparent blur-2xl transition-transform duration-700 group-hover:scale-150" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.95_0.06_150)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.35_0.12_150)]">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M12 2l2.5 5 5.5.8-4 3.9.95 5.5L12 14.8 7.05 17.2 8 11.7 4 7.8 9.5 7z"/></svg>
                Verified
              </span>
              <h3 className="mt-4 font-display text-xl">{c.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
