import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin, Phone, Mail, ChevronRight, ChevronLeft, ShieldCheck, Award,
  FileCheck, Globe2, Factory, Recycle, Battery, Cpu, Wrench, Beaker,
  PackageCheck, Radio, Scale, Camera, Users, TrendingUp, Clock,
} from "lucide-react";
import heroMeeting from "@/assets/hero-meeting.jpg";
import heroInspection from "@/assets/hero-inspection.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BIS Consultancy Services — India's Pioneer in Product Certification & Compliance" },
      { name: "description", content: "Expert BIS, EPR, FMCS, FSSAI & regulatory compliance consultancy. End-to-end certification services for manufacturers and importers across India." },
      { property: "og:title", content: "BIS Consultancy Services — Certification & Compliance Experts" },
      { property: "og:description", content: "Trusted BIS, EPR and regulatory compliance solutions with 2850+ clients served." },
    ],
  }),
  component: Home,
});

const SLIDES = [
  {
    img: heroMeeting,
    eyebrow: "BIS Consultancy Services",
    title: "India's Pioneer in Product Certification Consulting",
    bullets: ["BIS Registrations", "EPR Compliance", "FMCS Certification", "Regulatory Approvals", "Testing & Training"],
  },
  {
    img: heroInspection,
    eyebrow: "End-to-End Certification",
    title: "Expert BIS & Compliance Solutions for Manufacturers",
    bullets: ["Third-Party Inspection", "ISI Mark Licensing", "WPC Approval", "Legal Metrology (LMPC)", "STQC Certification"],
  },
];

function Home() {
  const [slide, setSlide] = useState(0);
  const s = SLIDES[slide];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Header />
      <Hero slide={s} onPrev={() => setSlide((i) => (i - 1 + SLIDES.length) % SLIDES.length)} onNext={() => setSlide((i) => (i + 1) % SLIDES.length)} active={slide} setSlide={setSlide} />
      <NotificationTicker />
      <AboutSection />
      <WhyChoose />
      <ServicesSection />
      <Achievements />
      <Testimonials />
      <Partners />
      <CTA />
      <Footer />
    </div>
  );
}

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
  const links = ["Home", "About", "Services", "Portfolio", "Updates", "Contact"];
  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded bg-primary text-primary-foreground grid place-items-center font-bold">BIS</div>
          <div className="leading-tight">
            <div className="font-bold text-primary">BIS Consultancy Services</div>
            <div className="text-[11px] text-muted-foreground">ISO 9001:2015 Certified • Govt. Recognised</div>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a key={l} href="#" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">{l}</a>
          ))}
          <a href="#contact" className="ml-2 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Get Quote</a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ slide, onPrev, onNext, active, setSlide }: { slide: typeof SLIDES[0]; onPrev: () => void; onNext: () => void; active: number; setSlide: (n: number) => void }) {
  return (
    <section className="relative bg-brand-deep text-white overflow-hidden">
      <img src={slide.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/85 to-transparent" />
      <div className="relative container mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div>
          <div className="text-brand-cyan font-semibold tracking-wide uppercase text-sm mb-3">{slide.eyebrow}</div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl">{slide.title}</h1>
          <ul className="mt-6 space-y-2 text-lg">
            {slide.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />{b}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#about" className="inline-flex items-center rounded-md bg-white text-primary px-6 py-3 font-semibold hover:bg-white/90">About Us</a>
            <a href="#services" className="inline-flex items-center rounded-md bg-brand-cyan text-white px-6 py-3 font-semibold hover:opacity-90">Our Services</a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <button onClick={onPrev} className="h-9 w-9 grid place-items-center rounded-full border border-white/30 hover:bg-white/10"><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-brand-cyan" : "w-4 bg-white/40"}`} />
              ))}
            </div>
            <button onClick={onNext} className="h-9 w-9 grid place-items-center rounded-full border border-white/30 hover:bg-white/10"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <ContactCard />
      </div>
    </section>
  );
}

function ContactCard() {
  return (
    <form id="contact" className="bg-white text-foreground rounded-lg shadow-2xl p-6 md:p-7 max-w-md w-full justify-self-end" onSubmit={(e) => e.preventDefault()}>
      <h3 className="text-xl font-bold text-primary text-center tracking-wide mb-5">CONTACT US</h3>
      <div className="space-y-3">
        <input className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="Name" />
        <input type="email" className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="Email" />
        <input className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="Mobile No." />
        <textarea rows={4} className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="Type Message" />
        <button className="w-full rounded-md bg-secondary text-secondary-foreground py-2.5 font-semibold hover:opacity-90">SUBMIT</button>
      </div>
    </form>
  );
}

const NOTIFS = [
  "BIS Quality Control Order for Hand Tools (Pipe Wrenches – General Purpose)",
  "QCO for Stainless Steel Cookware & Utensils — New Compliance Notification",
  "BIS Registration for Toys mandatory — Updated IS Standards",
  "FMCS Registration for Foreign Manufacturers — Latest Guidelines",
  "EPR Compliance for Plastic Waste Management — 2026 Update",
  "CHIMS Registration mandatory for Integrated Circuit Importers",
  "WPC Approval for Wireless Devices — Revised Spectrum Rules",
  "STQC Certification for CCTV Systems now mandatory",
];

function NotificationTicker() {
  return (
    <div className="bg-accent border-y border-border">
      <div className="container mx-auto px-4 py-2.5 flex items-center gap-4">
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1.5 rounded">
          <Radio className="h-3.5 w-3.5" /> Latest Notification
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-10 animate-ticker whitespace-nowrap text-sm text-foreground">
            {[...NOTIFS, ...NOTIFS].map((n, i) => (
              <a key={i} href="#" className="hover:text-primary">• {n}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">About Us</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">BIS Consultancy Services Expertise</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            BIS Consultancy Services Expertise provides professional guidance for certification, compliance, testing, and regulatory approvals, helping businesses achieve quality standards and market readiness.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider"><ShieldCheck className="h-4 w-4" /> Trusted Expertise</div>
            <h3 className="text-xl font-bold mt-2">End-to-End Certification Services</h3>
            <p className="mt-3 text-muted-foreground">
              BIS Consultancy Services is a trusted provider of certification and regulatory compliance solutions, helping manufacturers and importers navigate complex approval processes with confidence. Our team offers comprehensive single-window services for product certification, testing, training, and compliance management.
            </p>
            <a href="#services" className="mt-4 inline-flex items-center gap-1 text-primary font-semibold">Read More <ChevronRight className="h-4 w-4" /></a>
          </div>
          <div className="rounded-xl border border-border bg-card p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider"><Award className="h-4 w-4" /> BIS Consultancy</div>
            <h3 className="text-xl font-bold mt-2">Certification & Compliance Excellence</h3>
            <p className="mt-3 text-muted-foreground">
              We deliver comprehensive support for certification, testing, compliance, and regulatory approvals. Our experienced professionals help businesses navigate complex standards with ease — ensuring products meet quality, safety, and regulatory benchmarks with a client-focused approach.
            </p>
            <a href="#services" className="mt-4 inline-flex items-center gap-1 text-primary font-semibold">Read More <ChevronRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY = [
  { icon: TrendingUp, title: "Growth & Innovation", body: "Drive sustainable business growth through innovative strategies, technology-driven solutions, and customized approaches that help organizations overcome complex challenges." },
  { icon: Clock, title: "Efficient Project Delivery", body: "Accelerate project execution with optimized timelines, streamlined workflows, and efficient processes that enhance productivity and ensure exceptional client satisfaction." },
  { icon: ShieldCheck, title: "Regulatory Excellence", body: "Navigate complex certification and regulatory requirements with confidence through expert guidance — ensuring compliance, faster approvals, and seamless market access." },
];

function WhyChoose() {
  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">Why Choose Us</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">Why Choose BIS Consultancy Services?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            With extensive experience in certification, testing, and regulatory compliance, we help businesses navigate complex approval processes with confidence. Our expert team delivers reliable, cost-effective solutions for manufacturers, importers, and businesses across industries.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {WHY.map((w) => (
            <div key={w.title} className="bg-card rounded-xl p-7 border border-border hover:border-primary/40 hover:shadow-lg transition">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary grid place-items-center"><w.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 text-lg font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TABS = {
  "BIS Registrations": [
    { icon: FileCheck, name: "ISI Registrations", desc: "BIS Registration ensuring safety, quality, and reliability with IS standards and ISI mark compliance." },
    { icon: PackageCheck, name: "BIS Registration for Toys", desc: "Mandatory certification for domestic and imported toys meeting IS safety standards." },
    { icon: ShieldCheck, name: "CSR Registration", desc: "Companies Act 2013 compliance for CSR activities with the Ministry of Corporate Affairs." },
    { icon: Globe2, name: "FMCS Registrations", desc: "Foreign Manufacturers Certification Scheme — access the Indian market with BIS certification." },
    { icon: PackageCheck, name: "BIS Registration for Footwear", desc: "Compliance with Indian quality and safety standards for footwear durability and consumer protection." },
    { icon: Factory, name: "Non-Ferrous Metals", desc: "Certification for aluminium, copper, zinc — meeting industrial and construction grade standards." },
  ],
  "EPR Registrations": [
    { icon: Recycle, name: "Tyre Waste Management", desc: "Proper collection, recycling, and disposal of used tyres — reducing pollution and conserving resources." },
    { icon: Recycle, name: "Plastic Waste Management", desc: "Collecting, recycling, and disposing plastic materials in line with regulatory compliance." },
    { icon: Battery, name: "Battery Waste Management", desc: "Safe collection, recycling, and disposal of used batteries — preventing environmental pollution." },
    { icon: Cpu, name: "Electronic Waste Management", desc: "Responsible handling of e-waste with sustainable recycling and resource recovery." },
    { icon: ShieldCheck, name: "ERP Compliance", desc: "Business processes meeting regulatory standards with data integrity and operational efficiency." },
    { icon: FileCheck, name: "CSR Registration", desc: "Sustainable community development through approved CSR activities and reporting." },
  ],
  "Other Services": [
    { icon: Cpu, name: "CHIMS Registrations", desc: "Mandatory for importers of integrated circuits and electronic components in India." },
    { icon: Beaker, name: "FSSAI Registrations", desc: "Food safety standards compliance for food businesses operating in India." },
    { icon: FileCheck, name: "PIMS Registrations", desc: "Project information management with regulatory compliance and efficient tracking." },
    { icon: Factory, name: "NFMIMS Registrations", desc: "Non-ferrous metal import monitoring system registration for transparent trade operations." },
    { icon: Wrench, name: "SIMS Registrations", desc: "Steel import monitoring system for centralized data management and compliance." },
    { icon: Radio, name: "WPC — Wireless Planning", desc: "Spectrum compliance for wireless communication devices, manufacturers, and importers." },
    { icon: Scale, name: "LMPC — Legal Metrology", desc: "Legal standards for weight, measurement, and labeling of pre-packaged commodities." },
    { icon: Camera, name: "STQC Certification for CCTV", desc: "Technical standards compliance for surveillance equipment with cybersecurity verification." },
  ],
};
type TabKey = keyof typeof TABS;

function ServicesSection() {
  const keys = Object.keys(TABS) as TabKey[];
  const [active, setActive] = useState<TabKey>(keys[0]);
  return (
    <section id="services" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">What We Offer</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">Our Services</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            End-to-end certification and regulatory compliance solutions tailored to your business needs. Our experienced team ensures smooth registration, faster approvals, and reliable support.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {keys.map((k) => (
            <button key={k} onClick={() => setActive(k)} className={`px-5 py-2.5 rounded-md text-sm font-semibold transition ${active === k ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-accent"}`}>
              {k}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TABS[active].map((srv) => (
            <div key={srv.name} className="group rounded-xl border border-border bg-card p-6 hover:border-primary hover:shadow-lg transition">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-brand-cyan text-primary-foreground grid place-items-center"><srv.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-bold text-base">{srv.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{srv.desc}</p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ChevronRight className="h-4 w-4" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { n: "700+", label: "EPR Registrations" },
  { n: "550+", label: "BIS Registrations" },
  { n: "1750", label: "Other Registrations" },
  { n: "2850", label: "Clients Served" },
];

function Achievements() {
  return (
    <section className="py-16 md:py-20 bg-brand-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="text-brand-cyan font-semibold uppercase text-sm tracking-wider">Our Achievements</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Trusted Across Industries</h2>
          <p className="mt-4 max-w-3xl mx-auto text-white/80">
            Delivering trusted BIS, EPR, and regulatory compliance solutions with proven expertise. Our achievements reflect the confidence businesses place in our services.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="text-4xl md:text-5xl font-bold text-brand-cyan">{s.n}</div>
              <div className="mt-2 text-sm uppercase tracking-wider text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Malvika", body: "The team guided us through the entire certification process with exceptional professionalism and expertise. Their timely support and attention to detail made compliance simple, efficient, and completely stress-free for our business." },
  { name: "Suyansh", body: "We were impressed by their deep regulatory knowledge and commitment to delivering results. The registration process was handled seamlessly, allowing us to focus on our operations with complete confidence." },
  { name: "Raj Saini", body: "Their consultants provided clear guidance, prompt communication, and outstanding support throughout our compliance journey. Thanks to their expertise, we achieved certification smoothly and within the expected timeline." },
  { name: "Kanika Singhal", body: "Working with their team was a great experience from start to finish. Their efficient approach, technical expertise, and dedication to client success ensured a hassle-free compliance and certification process." },
];

function Testimonials() {
  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">Stories of Satisfaction</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Built on transparency, expertise, and consistent performance, our client relationships speak for themselves.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.map((r) => (
            <blockquote key={r.name} className="bg-card rounded-xl p-7 border border-border shadow-sm">
              <div className="text-4xl text-primary leading-none">"</div>
              <p className="text-foreground italic">{r.body}</p>
              <footer className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center font-bold">{r.name[0]}</div>
                <div className="font-semibold">{r.name}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = ["SD Metals", "Flatkick", "Star Kidz", "Aygo", "TrueLite", "Shufab", "Acme Ltd", "GreenTech"];
  return (
    <section className="py-14 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">Trusted By</div>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 text-primary">Our Partners</h2>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-10 animate-ticker-slow whitespace-nowrap">
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="shrink-0 h-20 w-44 rounded-lg border border-border bg-muted grid place-items-center font-bold text-muted-foreground">{p}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-brand-cyan text-primary-foreground">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Trusted Regulatory Experts</h2>
          <p className="mt-2 max-w-2xl text-white/90">
            From BIS and EPR registrations to specialized certification services — take the next step toward business excellence with confidence.
          </p>
        </div>
        <a href="#contact" className="shrink-0 inline-flex items-center rounded-md bg-white text-primary px-6 py-3 font-semibold hover:bg-white/90">Get Expert Assistance</a>
      </div>
    </section>
  );
}

function Footer() {
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
            {["About Us", "Services", "Portfolio", "Updates", "Contact"].map((l) => (
              <li key={l}><a href="#" className="hover:text-brand-cyan">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Top Services</h4>
          <ul className="space-y-2 text-sm">
            {["BIS Registration", "FMCS Certification", "EPR Compliance", "FSSAI", "WPC Approval", "LMPC"].map((l) => (
              <li key={l}><a href="#" className="hover:text-brand-cyan">{l}</a></li>
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
