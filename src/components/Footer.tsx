export function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Droneman. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="mailto:contact@droneman.cloud" className="hover:text-foreground">Email</a>
          <span aria-hidden>·</span>
          <a href="tel:+919645161615" className="hover:text-foreground">Phone</a>
        </div>
      </div>
    </footer>
  );
}
