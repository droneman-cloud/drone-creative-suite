import { useEffect, useRef } from "react";
import drone from "@/assets/drone-cursor.png";

export function DroneCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const prev = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.body.classList.add("has-drone-cursor");
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      const dx = pos.current.x - prev.current.x;
      const dy = pos.current.y - prev.current.y;
      const tilt = Math.max(-25, Math.min(25, dx * 1.5));
      const lift = Math.max(-15, Math.min(15, dy * 0.6));
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x - 28}px, ${pos.current.y - 28}px, 0) rotate(${tilt}deg) translateY(${lift}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${pos.current.x - 6}px, ${pos.current.y - 6}px, 0)`;
      }
      prev.current = { ...pos.current };
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("has-drone-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-3 w-3 rounded-full mix-blend-multiply"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.13 220 / 0.6), transparent 70%)" }}
        aria-hidden
      />
      <div
        ref={ref}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-14 w-14 will-change-transform"
        aria-hidden
      >
        <img src={drone} alt="" width={56} height={56} className="h-full w-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)]" />
      </div>
    </>
  );
}
