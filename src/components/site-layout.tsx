import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  MapPin, Phone, Mail, MessageCircle, ArrowUp, Users,
} from "lucide-react";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/about" as const },
  { label: "Services", to: "/services" as const },
  { label: "Portfolio", to: "/portfolio" as const },
  { label: "Updates", to: "/updates" as const },
  { label: "Contact", to: "/contact" as const },
];

function TopBar() {
  return (
    <div className="bg-topbar text-white text-xs md:text-sm">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Certification Wing — Delhi NCR</span>
        <span className="hidden md:flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> BIS Consultancy Services HQ</span>
        <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +91 98XXX XXXXX</span>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`bg-white border-b border-border sticky top-0 z-40 transition-all ${scrolled ? "shadow-md py-1" : ""}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded bg-primary text-primary-foreground grid place-items-center font-bold shadow-md">BIS</div>
          <div className="leading-tight">
            <div className="font-bold text-primary">BIS Consultancy Services</div>
            <div className="text-[11px] text-muted-foreground">ISO 9001:2015 Certified • Govt. Recognised</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
              className="relative px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="ml-2 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:scale-105 transition">Get Quote</Link>
        </nav>
        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            {NAV.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-foreground hover:text-primary"
                activeProps={{ className: "py-2 text-sm font-medium text-primary" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 mb-3 inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Get Quote</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const services: { label: string; to: typeof NAV[number]["to"] }[] = [
    { label: "BIS Registration", to: "/services" },
    { label: "FMCS Certification", to: "/services" },
    { label: "EPR Compliance", to: "/services" },
    { label: "FSSAI", to: "/services" },
    { label: "WPC Approval", to: "/services" },
    { label: "LMPC", to: "/services" },
  ];
  return (
    <footer className="bg-brand-deep text-white/85">
      <div className="container mx-auto px-4 py-14 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded bg-white text-primary grid place-items-center font-bold">BIS</div>
            <div className="font-bold text-white">BIS Consultancy Services</div>
          </div>
          <p className="mt-4 text-sm">India's pioneer in ISO-certified product certification consulting. Helping businesses meet quality, safety, and regulatory requirements.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {NAV.filter((n) => n.to !== "/").map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-brand-cyan transition">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Top Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((l, i) => (
              <li key={i}><Link to={l.to} className="hover:text-brand-cyan transition">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Delhi NCR, India</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98XXX XXXXX</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@bisconsultancyservices.com</li>
            <li className="flex items-center gap-2"><Users className="h-4 w-4" /> 2850+ Clients Served</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} BIS Consultancy Services. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href="https://wa.me/919800000000"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="h-14 w-14 grid place-items-center rounded-full bg-green-500 text-white shadow-xl hover:scale-110 transition animate-pulse-ring"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`h-12 w-12 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-110 transition ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-brand-deep text-white relative overflow-hidden">
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-brand-cyan/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary/40 blur-3xl animate-blob-2" />
      <div className="container mx-auto px-4 py-16 md:py-20 relative">
        {eyebrow && <div className="text-brand-cyan font-semibold uppercase tracking-wider text-sm">{eyebrow}</div>}
        <h1 className="text-3xl md:text-5xl font-bold mt-2">{title}</h1>
        {subtitle && <p className="mt-4 max-w-3xl text-white/85 text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
