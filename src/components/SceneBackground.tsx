/**
 * Stylish 3D-looking white background with floating blobs and grid.
 * Fixed full-viewport, sits behind all content.
 */
export function SceneBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden gradient-hero">
      {/* Film sprocket strip on the sides — cinematic touch */}
      <div className="absolute inset-y-0 left-0 w-6 film-strip opacity-40" />
      <div className="absolute inset-y-0 right-0 w-6 film-strip opacity-40" />
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.86_0.10_250/0.45)] blur-3xl animate-blob" />
      <div className="absolute right-[-10rem] top-1/3 h-[32rem] w-[32rem] rounded-full bg-[oklch(0.88_0.10_300/0.4)] blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
      <div className="absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-[oklch(0.92_0.08_210/0.5)] blur-3xl animate-blob" style={{ animationDelay: "-9s" }} />
      {/* Spotlight beams */}
      <div className="absolute -top-20 left-1/4 h-[60vh] w-[40vw] rotate-12 bg-[linear-gradient(180deg,oklch(1_0_0/0.45),transparent)] blur-2xl" />
      <div className="absolute -top-20 right-1/4 h-[60vh] w-[40vw] -rotate-12 bg-[linear-gradient(180deg,oklch(1_0_0/0.4),transparent)] blur-2xl" />
    </div>
  );
}
