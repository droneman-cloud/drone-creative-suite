import { useEffect, useRef } from "react";
import drone from "@/assets/drone-fly.png";

/**
 * Fixed-position drone that flies across the viewport based on scroll progress,
 * with subtle bobbing. Provides the "drone flying while scrolling" effect.
 */
export function ScrollDrone() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let bob = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bob += 0.02;
      if (ref.current) {
        // Travels left -> right across screen, with vertical bob
        const x = -120 + p * (window.innerWidth + 240);
        const y = window.innerHeight * (0.18 + Math.sin(bob) * 0.02 + p * 0.05);
        const flip = p > 0.99 ? -1 : 1;
        const tilt = Math.sin(bob * 1.3) * 4 - p * 6;
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) scaleX(${flip}) rotate(${tilt}deg)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      <div ref={ref} className="absolute left-0 top-0 w-32 sm:w-44 will-change-transform">
        <img
          src={drone}
          alt=""
          width={176}
          height={117}
          className="w-full drop-shadow-[0_20px_30px_oklch(0.5_0.05_250/0.25)]"
        />
      </div>
    </div>
  );
}
