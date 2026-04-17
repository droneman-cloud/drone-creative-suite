import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Droneman" },
      { name: "description", content: "Skills across content strategy, drone operation, network engineering and more." },
      { property: "og:title", content: "Skills — Droneman" },
      { property: "og:description", content: "Content Strategy, Visual Storytelling, Drone Operation, Network Security and more." },
    ],
  }),
  component: Skills,
});

const skills = [
  { n: "Content Strategy", v: 92 },
  { n: "Visual Storytelling", v: 88 },
  { n: "Video Editing", v: 85 },
  { n: "Drone Operation", v: 90 },
  { n: "Network Troubleshooting", v: 95 },
  { n: "Network Security", v: 88 },
  { n: "System Performance", v: 87 },
  { n: "Team Coordination", v: 90 },
  { n: "SEO Knowledge", v: 82 },
  { n: "Content Management", v: 85 },
  { n: "Adaptability", v: 95 },
];

function Bar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setW(value), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className="rounded-2xl border bg-white/70 p-5 backdrop-blur shadow-soft">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-display text-sm tabular-nums text-muted-foreground">{w}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="shimmer-bar h-full rounded-full transition-[width] duration-[1400ms] ease-out" style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

function Skills() {
  useReveal();
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="reveal text-xs uppercase tracking-[0.3em] text-muted-foreground">What I Do</p>
      <h1 className="reveal mt-2 font-display text-5xl sm:text-6xl">Skills & <span className="gradient-accent-text">Expertise</span></h1>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Bar key={s.n} label={s.n} value={s.v} delay={i * 80} />
        ))}
      </div>
    </div>
  );
}
