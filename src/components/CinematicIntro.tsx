import { useEffect, useState } from "react";

/**
 * Cinematic intro overlay shown on first page load of a session.
 * Displays a clapperboard "snap" then a film-leader countdown 3 → 2 → 1 → ACTION.
 * Uses sessionStorage so it doesn't replay on every navigation.
 */
export function CinematicIntro() {
  const [stage, setStage] = useState<"clap" | 3 | 2 | 1 | "action" | "done">(
    typeof window !== "undefined" && sessionStorage.getItem("intro-played") ? "done" : "clap"
  );

  useEffect(() => {
    if (stage === "done") return;
    const sequence: Array<[typeof stage, number]> = [
      ["clap", 700],
      [3, 700],
      [2, 700],
      [1, 700],
      ["action", 500],
      ["done", 0],
    ];
    const idx = sequence.findIndex(([s]) => s === stage);
    if (idx === -1 || idx === sequence.length - 1) {
      sessionStorage.setItem("intro-played", "1");
      return;
    }
    const t = setTimeout(() => setStage(sequence[idx + 1][0]), sequence[idx][1]);
    return () => clearTimeout(t);
  }, [stage]);

  if (stage === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[oklch(0.12_0.02_260)] text-white intro-fade-out"
      style={stage === "action" ? { animation: "intro-out 0.5s ease-in forwards" } : undefined}
      aria-hidden
    >
      {/* Film grain & vignette */}
      <div className="pointer-events-none absolute inset-0 film-grain opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0_0_0/0.7)_100%)]" />

      {stage === "clap" && <Clapperboard />}
      {(stage === 3 || stage === 2 || stage === 1) && <CountdownFrame n={stage} />}
      {stage === "action" && (
        <div className="font-display text-5xl font-bold tracking-[0.3em] text-white sm:text-7xl intro-pop">
          ACTION
        </div>
      )}
    </div>
  );
}

function Clapperboard() {
  return (
    <div className="relative intro-pop">
      <svg viewBox="0 0 240 200" className="h-48 w-56 sm:h-64 sm:w-72" fill="none">
        {/* Top stripes — animated snap */}
        <g className="clap-top" style={{ transformOrigin: "20px 60px" }}>
          <rect x="10" y="40" width="220" height="36" rx="3" fill="#111" />
          <g>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <polygon
                key={i}
                points={`${20 + i * 36},40 ${48 + i * 36},40 ${36 + i * 36},76 ${10 + i * 36},76`}
                fill={i % 2 === 0 ? "#fff" : "#111"}
              />
            ))}
          </g>
        </g>
        {/* Board body */}
        <rect x="10" y="78" width="220" height="110" rx="4" fill="#1a1a1a" stroke="#fff" strokeWidth="2" />
        <line x1="10" y1="108" x2="230" y2="108" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
        <line x1="10" y1="138" x2="230" y2="138" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
        <line x1="10" y1="168" x2="230" y2="168" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
        <text x="22" y="100" fill="#fff" fontFamily="monospace" fontSize="12">SCENE  DRONEMAN</text>
        <text x="22" y="130" fill="#fff" fontFamily="monospace" fontSize="12">TAKE   01</text>
        <text x="22" y="160" fill="#fff" fontFamily="monospace" fontSize="12">ROLL   2026</text>
        <text x="22" y="184" fill="#fff" fontFamily="monospace" fontSize="10" opacity="0.7">DIR. DRONEMAN</text>
      </svg>
    </div>
  );
}

function CountdownFrame({ n }: { n: 1 | 2 | 3 }) {
  return (
    <div key={n} className="relative flex items-center justify-center intro-count">
      <svg viewBox="0 0 300 300" className="h-72 w-72 sm:h-96 sm:w-96 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Outer leader circle */}
        <circle cx="150" cy="150" r="130" />
        <circle cx="150" cy="150" r="110" opacity="0.6" />
        {/* Cross hairs */}
        <line x1="20" y1="150" x2="280" y2="150" />
        <line x1="150" y1="20" x2="150" y2="280" />
        {/* Sweep arc — animated */}
        <circle
          cx="150"
          cy="150"
          r="130"
          stroke="oklch(0.78 0.15 30)"
          strokeWidth="6"
          strokeDasharray={`${2 * Math.PI * 130}`}
          strokeDashoffset="0"
          style={{ animation: "leader-sweep 0.7s linear forwards", transformOrigin: "150px 150px", transform: "rotate(-90deg)" }}
        />
      </svg>
      <span className="absolute font-display text-[9rem] font-bold leading-none sm:text-[14rem]">{n}</span>
    </div>
  );
}
