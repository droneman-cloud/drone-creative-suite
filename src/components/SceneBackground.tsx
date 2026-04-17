/**
 * Stylish 3D-looking white background with floating blobs and grid.
 * Fixed full-viewport, sits behind all content.
 */
export function SceneBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden gradient-hero">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.85_0.10_230/0.45)] blur-3xl animate-blob" />
      <div className="absolute right-[-10rem] top-1/3 h-[32rem] w-[32rem] rounded-full bg-[oklch(0.88_0.08_290/0.4)] blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
      <div className="absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-[oklch(0.92_0.06_200/0.5)] blur-3xl animate-blob" style={{ animationDelay: "-9s" }} />
      {/* floating geometric shapes */}
      <div className="absolute left-[10%] top-[20%] h-16 w-16 rotate-12 rounded-2xl bg-white/70 shadow-soft animate-float-y" />
      <div className="absolute right-[12%] top-[60%] h-10 w-10 rounded-full bg-white/80 shadow-soft animate-drift" />
      <div className="absolute left-[60%] top-[15%] h-12 w-12 rotate-45 bg-white/60 shadow-soft animate-float-y" style={{ animationDelay: "-2s" }} />
    </div>
  );
}
