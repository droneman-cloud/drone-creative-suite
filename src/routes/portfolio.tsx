import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";
import p1 from "@/assets/portfolio-1.webp";
import p2 from "@/assets/portfolio-2.webp";
import p3 from "@/assets/portfolio-3.webp";
import p4 from "@/assets/portfolio-4.webp";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Droneman" },
      { name: "description", content: "Selected drone cinematography and network engineering work." },
      { property: "og:title", content: "Portfolio — Droneman" },
      { property: "og:description", content: "Aerial visuals, surveying, and infrastructure projects." },
      { property: "og:image", content: p1 },
      { name: "twitter:image", content: p1 },
    ],
  }),
  component: Portfolio,
});

const works = [
  { img: p1, t: "Misty Western Ghats", c: "Aerial Cinematography" },
  { img: p2, t: "Coastal Surveying", c: "Mapping & Surveying" },
  { img: p3, t: "Network Backbone", c: "Infrastructure" },
  { img: p4, t: "City at Sunrise", c: "Cinematic Reels" },
];

function Portfolio() {
  useReveal();
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="reveal text-xs uppercase tracking-[0.3em] text-muted-foreground">Selected Work</p>
      <h1 className="reveal mt-2 font-display text-5xl sm:text-6xl">Portfolio</h1>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {works.map((w, i) => (
          <article
            key={w.t}
            className="reveal group relative overflow-hidden rounded-3xl border bg-white shadow-soft transition-smooth hover:shadow-glow"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="overflow-hidden">
              <img
                src={w.img}
                alt={w.t}
                width={1024}
                height={768}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-white via-white/85 to-transparent p-5 opacity-100 transition-smooth group-hover:translate-y-0">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{w.c}</p>
              <h3 className="mt-1 font-display text-2xl">{w.t}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
