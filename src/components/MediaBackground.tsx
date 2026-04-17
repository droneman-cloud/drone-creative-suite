import { useMemo, type ReactElement } from "react";

/**
 * Visual-media themed flying background.
 * Renders SVG media icons (film reel, clapperboard, camera, play button,
 * aperture, frame, lens, sparkle) drifting across the entire viewport.
 * Pointer-events disabled, sits behind content but above SceneBackground.
 */

type IconName =
  | "reel"
  | "clap"
  | "camera"
  | "play"
  | "aperture"
  | "frame"
  | "lens"
  | "sparkle";

const Icons: Record<IconName, ReactElement> = {
  reel: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      <circle cx="32" cy="14" r="4" />
      <circle cx="32" cy="50" r="4" />
      <circle cx="14" cy="32" r="4" />
      <circle cx="50" cy="32" r="4" />
    </svg>
  ),
  clap: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="8" y="22" width="48" height="32" rx="3" />
      <path d="M8 22 L16 10 L26 14 L18 26 Z M26 14 L36 18 L28 30 L18 26 Z M36 18 L46 22 L38 34 L28 30 Z M46 22 L56 18 L52 30 L38 34 Z" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="6" y="18" width="44" height="30" rx="4" />
      <path d="M50 26 L60 22 V44 L50 40 Z" />
      <circle cx="20" cy="33" r="2.5" fill="currentColor" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="32" cy="32" r="24" />
      <path d="M26 22 L44 32 L26 42 Z" fill="currentColor" />
    </svg>
  ),
  aperture: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="32" cy="32" r="22" />
      <path d="M32 10 L44 30 L20 30 Z M54 32 L34 44 L34 20 Z M32 54 L20 34 L44 34 Z M10 32 L30 20 L30 44 Z" />
    </svg>
  ),
  frame: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="6" y="6" width="52" height="52" rx="4" />
      <rect x="14" y="14" width="36" height="36" />
      <circle cx="50" cy="14" r="2" fill="currentColor" />
    </svg>
  ),
  lens: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="14" />
      <circle cx="32" cy="32" r="6" />
      <circle cx="38" cy="26" r="2" fill="currentColor" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M32 6 L36 28 L58 32 L36 36 L32 58 L28 36 L6 32 L28 28 Z" />
    </svg>
  ),
};

type FloatItem = {
  icon: IconName;
  left: string;
  top: string;
  size: number;
  hue: string;
  anim: string;
  delay: string;
  duration: string;
  opacity: number;
  rotate: number;
};

export function MediaBackground() {
  const items = useMemo<FloatItem[]>(() => {
    const names: IconName[] = [
      "reel", "clap", "camera", "play", "aperture", "frame", "lens", "sparkle",
    ];
    const hues = [
      "oklch(0.45 0.15 250)",
      "oklch(0.48 0.16 290)",
      "oklch(0.50 0.14 200)",
      "oklch(0.42 0.18 320)",
      "oklch(0.46 0.15 220)",
    ];
    const anims = ["animate-media-float", "animate-media-drift", "animate-media-orbit"];
    const list: FloatItem[] = [];
    // Deterministic pseudo-random so SSR matches client
    let seed = 7;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 28; i++) {
      list.push({
        icon: names[i % names.length],
        left: `${Math.round(rnd() * 96)}%`,
        top: `${Math.round(rnd() * 96)}%`,
        size: 36 + Math.round(rnd() * 64),
        hue: hues[i % hues.length],
        anim: anims[i % anims.length],
        delay: `-${Math.round(rnd() * 18)}s`,
        duration: `${14 + Math.round(rnd() * 18)}s`,
        opacity: 0.14 + rnd() * 0.16,
        rotate: Math.round(rnd() * 60 - 30),
      });
    }
    return list;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {items.map((it, i) => (
        <div
          key={i}
          className={`absolute will-change-transform ${it.anim}`}
          style={{
            left: it.left,
            top: it.top,
            width: it.size,
            height: it.size,
            color: it.hue,
            opacity: it.opacity,
            animationDelay: it.delay,
            animationDuration: it.duration,
            ["--rot" as string]: `${it.rotate}deg`,
          }}
        >
          {Icons[it.icon]}
        </div>
      ))}
      {/* Film grain overlay */}
      <div className="absolute inset-0 film-grain opacity-[0.05]" />
    </div>
  );
}
