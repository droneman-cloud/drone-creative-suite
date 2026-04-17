import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Droneman — Where Creativity Meets Technology" },
      { name: "description", content: "Portfolio 2026 of Droneman: Creative Content Strategist, Drone Visual Specialist, and Network Support Engineer." },
      { property: "og:title", content: "Droneman — Where Creativity Meets Technology" },
      { property: "og:description", content: "Creative Content Strategist · Drone Visual Specialist · Network Support Engineer." },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="scene-3d">
      {/* Hero */}
      <section className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="reveal mb-6 inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.13_220)]" /> Portfolio 2026
        </span>
        <h1 className="reveal font-display text-5xl font-semibold leading-[1.05] sm:text-7xl md:text-8xl">
          Where Creativity
          <br />
          <span className="gradient-accent-text">Meets Technology</span>
        </h1>
        <p className="reveal mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Creative Content Strategist · Drone Visual Specialist · Network Support Engineer
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-smooth hover:translate-y-[-2px]"
          >
            View My Work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-6 py-3 text-sm font-medium backdrop-blur transition-smooth hover:bg-white"
          >
            Contact Me
          </Link>
        </div>

        <div className="reveal mt-20 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-foreground/40 to-transparent" />
        </div>
      </section>

      {/* Quick highlights */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { k: "Location", v: "Kannur, Kerala, India" },
            { k: "Specialization", v: "Content & Networking" },
            { k: "Available", v: "Open for projects" },
          ].map((s, i) => (
            <div key={s.k} className="reveal glass tilt-card rounded-3xl p-6" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.k}</p>
              <p className="mt-2 font-display text-xl">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section nav */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="reveal mb-10 font-display text-3xl sm:text-4xl">Explore</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { to: "/about", t: "About", d: "Who I am and what I do." },
            { to: "/experience", t: "Experience", d: "Roles and impact." },
            { to: "/skills", t: "Skills", d: "Strengths & tooling." },
            { to: "/education", t: "Education", d: "Credentials & stack." },
            { to: "/portfolio", t: "Portfolio", d: "Selected work." },
            { to: "/contact", t: "Contact", d: "Let's talk." },
          ].map((c, i) => (
            <Link
              key={c.to}
              to={c.to}
              className="reveal tilt-card group block rounded-3xl border bg-white/70 p-6 backdrop-blur transition-smooth hover:bg-white"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-2xl">{c.t}</h3>
                <span className="text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
