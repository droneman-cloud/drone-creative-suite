import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Droneman" },
      { name: "description", content: "Content Creator with expertise in drone technology, video storytelling, and network engineering." },
      { property: "og:title", content: "About — Droneman" },
      { property: "og:description", content: "Creative Content Strategist & Network Support Engineer based in Kannur, Kerala." },
    ],
  }),
  component: About,
});

const tags = ["Content Strategy", "Drone Technology", "Network Engineering", "Creative Direction"];
const traits = ["Drone Ops", "Surveying & Mapping", "Engineering", "Network Infrastructure", "Creative", "Innovative", "Technical", "Visionary"];

function About() {
  useReveal();
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="reveal text-xs uppercase tracking-[0.3em] text-muted-foreground">Who I Am</p>
      <h1 className="reveal mt-2 font-display text-5xl sm:text-6xl">About <span className="gradient-accent-text">Me</span></h1>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="reveal glass rounded-3xl p-8">
          <p className="text-base leading-relaxed text-foreground/90">
            Content Creator with a strong track record in developing effective content strategies that
            enhance brand visibility across various platforms. Experienced in collaborating with teams
            to optimize drone technology for surveying and mapping, while executing innovative video
            concepts for impactful storytelling.
          </p>
          <p className="mt-5 text-base leading-relaxed text-foreground/90">
            Background as a Network Support Engineer with expertise in troubleshooting, security
            protocols, and system performance optimization. Proficient in SEO and content management
            systems, ready to apply a diverse skill set in fast-paced environments to deliver creative
            solutions.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full border bg-white/80 px-3 py-1 text-xs font-medium">{t}</span>
            ))}
          </div>
        </div>

        <aside className="reveal space-y-4">
          <div className="rounded-3xl border bg-white/70 p-6 backdrop-blur shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Quick Stats</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Location</dt><dd>Kannur, Kerala</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Specialization</dt><dd>Content & Networking</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Years</dt><dd>5+</dd></div>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {traits.map((t, i) => (
              <div
                key={t}
                className="tilt-card rounded-2xl border bg-white/80 p-4 text-center text-sm font-medium animate-float-y"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {t}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
