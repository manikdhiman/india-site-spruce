import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ChevronRight, ChevronLeft, ShieldCheck, Award,
  FileCheck, Globe2, Factory, Recycle, Battery, Cpu, Wrench, Beaker,
  PackageCheck, Radio, Scale, Camera, TrendingUp, Clock,
  Pause, Play,
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

// ---------- Hooks ----------
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <NotificationTicker />
      <AboutSection />
      <WhyChoose />
      <ServicesSection />
      <Achievements />
      <Testimonials />
      <Partners />
      <CTA />
    </>
  );
}




// ⚡ Main Hero Component Function
function Hero() {
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(true);
  const s = SLIDES[slide];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setSlide((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, [playing, slide]);

  const next = () => setSlide((i) => (i + 1) % SLIDES.length);
  const prev = () => setSlide((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative bg-[#0F3D5E] text-white overflow-hidden">
      
      {/* Moving ambient blobs updated to matching blue tones */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-32 right-10 h-[28rem] w-[28rem] rounded-full bg-sky-600/20 blur-3xl animate-blob-2" />

      {/* Slide images crossfade + ken-burns */}
      {SLIDES.map((sl, i) => (
        <img
          key={i}
          src={sl.img}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === slide ? "opacity-20 animate-ken-burns" : "opacity-0"}`}
        />
      ))}
      
      {/* Changed the gradient backdrop overlay from purple to your authentic Navy Blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D5E] via-[#0F3D5E]/90 to-transparent" />

      <div className="relative container mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div key={slide} className="reveal in-view">
          {/* Accent text changed to high-contrast sky blue */}
          <div className="text-sky-300 font-semibold tracking-wide uppercase text-sm mb-3">{s.eyebrow}</div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl">{s.title}</h1>
          <ul className="mt-6 space-y-2 text-lg">
            {s.bullets.map((b, i) => (
              <li key={b} className="flex items-center gap-2 reveal in-view" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />{b}
              </li>
            ))}
          </ul>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#about" className="inline-flex items-center rounded-md bg-white text-[#0F3D5E] px-6 py-3 font-semibold hover:bg-white/90 hover:scale-105 transition">About Us</a>
            <a href="#services" className="inline-flex items-center rounded-md bg-sky-500 text-white px-6 py-3 font-semibold hover:bg-sky-600 hover:scale-105 transition">Our Services</a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button onClick={prev} aria-label="Previous slide" className="h-9 w-9 grid place-items-center rounded-full border border-white/30 hover:bg-white/10 transition"><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setSlide(i)} 
                  aria-label={`Go to slide ${i + 1}`} 
                  className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-sky-400" : "w-4 bg-white/40 hover:bg-white/70"}`} 
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next slide" className="h-9 w-9 grid place-items-center rounded-full border border-white/30 hover:bg-white/10 transition"><ChevronRight className="h-5 w-5" /></button>
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"} className="h-9 w-9 grid place-items-center rounded-full border border-white/30 hover:bg-white/10 transition ml-2">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </div>

          {/* Progress bar tracking engine updated to matching sky blue */}
          <div className="mt-4 h-0.5 w-44 bg-white/20 rounded overflow-hidden">
            {playing && <div key={slide} className="h-full bg-sky-400 animate-progress" />}
          </div>
        </div>
        
        {/* ⚡ Renders the Contact Card form safely right here inside the layout flexbox */}
        <ContactCard />
      </div>
    </section>
  );
}

// 🎨 Sub-component: Added here directly below Hero to solve the missing variable crash!
function ContactCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-2xl space-y-4 max-w-md w-full justify-self-center lg:justify-self-end text-foreground">
      <h3 className="text-xl font-bold text-center tracking-tight text-[#0F3D5E] uppercase">
        Contact Us
      </h3>
      <div className="space-y-3">
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full rounded-md border border-input px-3 py-2 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full rounded-md border border-input px-3 py-2 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" 
        />
        <input 
          type="text" 
          placeholder="Mobile No." 
          className="w-full rounded-md border border-input px-3 py-2 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" 
        />
        <textarea 
          rows={3} 
          placeholder="Type Message" 
          className="w-full rounded-md border border-input px-3 py-2 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background resize-none" 
        />
        <button className="w-full rounded-md bg-[#0F3D5E] text-white py-2.5 font-semibold text-sm hover:bg-[#0F3D5E]/90 hover:shadow-lg transition uppercase tracking-wider">
          Submit
        </button>
      </div>
    </div>
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
    <div className="bg-accent border-y border-border pause-on-hover">
      <div className="container mx-auto px-4 py-2.5 flex items-center gap-4">
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1.5 rounded">
          <Radio className="h-3.5 w-3.5 animate-pulse" /> Latest Notification
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
        <div className="text-center mb-12 reveal">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">About Us</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">BIS Consultancy Services Expertise</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            BIS Consultancy Services Expertise provides professional guidance for certification, compliance, testing, and regulatory approvals, helping businesses achieve quality standards and market readiness.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="reveal rounded-xl border border-border bg-card p-7 shadow-sm card-lift hover:shadow-xl hover:border-primary/40">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider"><ShieldCheck className="h-4 w-4" /> Trusted Expertise</div>
            <h3 className="text-xl font-bold mt-2">End-to-End Certification Services</h3>
            <p className="mt-3 text-muted-foreground">
              BIS Consultancy Services is a trusted provider of certification and regulatory compliance solutions, helping manufacturers and importers navigate complex approval processes with confidence. Our team offers comprehensive single-window services for product certification, testing, training, and compliance management.
            </p>
            <a href="#services" className="mt-4 inline-flex items-center gap-1 text-primary font-semibold group">Read More <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" /></a>
          </div>
          <div className="reveal rounded-xl border border-border bg-card p-7 shadow-sm card-lift hover:shadow-xl hover:border-primary/40" style={{ animationDelay: "120ms" }}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider"><Award className="h-4 w-4" /> BIS Consultancy</div>
            <h3 className="text-xl font-bold mt-2">Certification & Compliance Excellence</h3>
            <p className="mt-3 text-muted-foreground">
              We deliver comprehensive support for certification, testing, compliance, and regulatory approvals. Our experienced professionals help businesses navigate complex standards with ease — ensuring products meet quality, safety, and regulatory benchmarks with a client-focused approach.
            </p>
            <a href="#services" className="mt-4 inline-flex items-center gap-1 text-primary font-semibold group">Read More <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" /></a>
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
    <section className="py-16 md:py-20 bg-muted relative overflow-hidden">
      <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-blob" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 reveal">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">Why Choose Us</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">Why Choose BIS Consultancy Services?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            With extensive experience in certification, testing, and regulatory compliance, we help businesses navigate complex approval processes with confidence.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {WHY.map((w, i) => (
            <div key={w.title} className="reveal bg-card rounded-xl p-7 border border-border card-lift hover:border-primary/40 hover:shadow-xl" style={{ animationDelay: `${i * 120}ms` }}>
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary grid place-items-center group-hover:rotate-6 transition"><w.icon className="h-6 w-6" /></div>
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
        <div className="text-center mb-10 reveal">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">What We Offer</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">Our Services</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            End-to-end certification and regulatory compliance solutions tailored to your business needs.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {keys.map((k) => (
            <button key={k} onClick={() => setActive(k)} className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all ${active === k ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-muted text-foreground hover:bg-accent hover:scale-105"}`}>
              {k}
            </button>
          ))}
        </div>
        <div key={active} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TABS[active].map((srv, i) => (
            <div key={srv.name} className="reveal in-view group rounded-xl border border-border bg-card p-6 card-lift hover:border-primary hover:shadow-xl" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-brand-cyan text-primary-foreground grid place-items-center group-hover:rotate-6 group-hover:scale-110 transition-transform"><srv.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-bold text-base">{srv.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{srv.desc}</p>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group/cta">Learn more <ChevronRight className="h-4 w-4 group-hover/cta:translate-x-1 transition" /></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { n: 700, suffix: "+", label: "EPR Registrations" },
  { n: 550, suffix: "+", label: "BIS Registrations" },
  { n: 1750, suffix: "", label: "Other Registrations" },
  { n: 2850, suffix: "", label: "Clients Served" },
];

function StatCard({ s, start, delay }: { s: typeof STATS[0]; start: boolean; delay: number }) {
  const val = useCountUp(s.n, start);
  return (
    <div className="reveal text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur card-lift hover:bg-white/10 hover:border-brand-cyan/50" style={{ animationDelay: `${delay}ms` }}>
      <div className="text-4xl md:text-5xl font-bold text-brand-cyan tabular-nums">{val.toLocaleString()}{s.suffix}</div>
      <div className="mt-2 text-sm uppercase tracking-wider text-white/80">{s.label}</div>
    </div>
  );
}

function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    // 🎨 Fixed: Swapped bg-brand-deep out for your explicit Navy Blue (#0F3D5E)
    <section ref={ref} className="py-16 md:py-20 bg-[#0F3D5E] text-white relative overflow-hidden">
      {/* Updated moving background ambient blobs to match the clean blue theme */}
      <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-sky-600/20 blur-3xl animate-blob-2" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 reveal">
          {/* 🎨 Fixed: Changed text-brand-cyan to text-sky-300 for professional contrast */}
          <div className="text-sky-300 font-semibold uppercase text-sm tracking-wider">Our Achievements</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Trusted Across Industries</h2>
          <p className="mt-4 max-w-3xl mx-auto text-white/80">
            Delivering trusted BIS, EPR, and regulatory compliance solutions with proven expertise.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Keeps your exact original map loop and counter animation triggers intact! */}
          {STATS.map((s, i) => <StatCard key={s.label} s={s} start={start} delay={i * 100} />)}
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
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="py-16 md:py-20 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">Stories of Satisfaction</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Built on transparency, expertise, and consistent performance.
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {REVIEWS.map((r) => (
                <blockquote key={r.name} className="w-full shrink-0 px-2">
                  <div className="bg-card rounded-xl p-8 md:p-10 border border-border shadow-lg mx-auto max-w-3xl">
                    <div className="text-5xl text-primary leading-none">"</div>
                    <p className="text-foreground italic text-lg">{r.body}</p>
                    <footer className="mt-5 flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-brand-cyan text-white grid place-items-center font-bold">{r.name[0]}</div>
                      <div className="font-semibold">{r.name}</div>
                    </footer>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Testimonial ${i + 1}`} className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = ["SD Metals", "Flatkick", "Star Kidz", "Aygo", "TrueLite", "Shufab", "Acme Ltd", "GreenTech"];
  return (
    <section className="py-14 bg-background border-y border-border pause-on-hover">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 reveal">
          <div className="text-secondary font-semibold uppercase text-sm tracking-wider">Trusted By</div>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 text-primary">Our Partners</h2>
        </div>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-10 animate-ticker-slow whitespace-nowrap">
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="shrink-0 h-20 w-44 rounded-lg border border-border bg-muted grid place-items-center font-bold text-muted-foreground hover:bg-card hover:text-primary hover:border-primary/40 transition">{p}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-brand-cyan text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-blob" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-blob-2" />
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 relative">
        <div className="reveal">
          <h2 className="text-2xl md:text-3xl font-bold">Trusted Regulatory Experts</h2>
          <p className="mt-2 max-w-2xl text-white/90">
            From BIS and EPR registrations to specialized certification services — take the next step toward business excellence with confidence.
          </p>
        </div>
        <Link to="/contact" className="reveal shrink-0 inline-flex items-center rounded-md bg-white text-primary px-6 py-3 font-semibold hover:bg-white/90 hover:scale-105 hover:shadow-2xl transition">Get Expert Assistance</Link>
      </div>
    </section>
  );
}

