import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/education", label: "Education" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-smooth ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-smooth ${scrolled ? "glass" : "bg-transparent"}`}>
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.13_220)] to-[oklch(0.82_0.10_280)] text-white shadow-soft">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
              <circle cx="6" cy="6" r="2.5" />
              <circle cx="18" cy="6" r="2.5" />
              <circle cx="6" cy="18" r="2.5" />
              <circle cx="18" cy="18" r="2.5" />
              <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
            </svg>
          </span>
          Drone <span className="gradient-accent-text">man</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-full px-3 py-1.5 text-sm font-medium bg-secondary text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white/70"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-4 md:hidden">
          <div className="glass flex flex-col gap-1 rounded-2xl p-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
                activeProps={{ className: "rounded-xl px-3 py-2 text-sm font-medium bg-secondary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
