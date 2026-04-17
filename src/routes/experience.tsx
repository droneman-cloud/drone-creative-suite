import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Droneman" },
      { name: "description", content: "Career path: Content Creator at APZ Develup and Network Support Engineer." },
      { property: "og:title", content: "Experience — Droneman" },
      { property: "og:description", content: "Content Creator and Network Support Engineer experience." },
    ],
  }),
  component: Experience,
});

const items = [
  {
    role: "Content Creator",
    org: "APZ Develup",
    place: "Kannur, Kerala",
    bullets: [
      "Developed engaging content strategies to enhance brand visibility across multiple platforms",
      "Collaborated with project teams to plan flight paths and optimize drone usage for surveying and mapping",
      "Edited video content aligning with creative direction",
      "Developed and executed innovative video concepts",
    ],
  },
  {
    role: "Network Support Engineer",
    org: "Bangalore",
    place: "On-site",
    bullets: [
      "Monitored network performance & troubleshot connectivity issues",
      "Configured and maintained routers and switches",
      "Implemented network security protocols",
      "Minimized downtime through proactive system monitoring",
    ],
  },
];

function Experience() {
  useReveal();
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="reveal text-xs uppercase tracking-[0.3em] text-muted-foreground">Career Path</p>
      <h1 className="reveal mt-2 font-display text-5xl sm:text-6xl">Experience</h1>

      <div className="relative mt-14">
        {/* timeline line */}
        <span className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[oklch(0.78_0.13_220)] via-border to-transparent sm:left-5" aria-hidden />
        <ol className="space-y-10">
          {items.map((it, i) => (
            <li key={it.role} className="reveal relative pl-12 sm:pl-16" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-glow ring-2 ring-[oklch(0.78_0.13_220)] sm:left-2">
                <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.13_220)] animate-pulse" />
              </span>
              <article className="glass tilt-card rounded-3xl p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl">{it.role}</h3>
                  <span className="text-sm text-muted-foreground">{it.place}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[oklch(0.45_0.10_240)]">{it.org}</p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                  {it.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[oklch(0.78_0.13_220)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
