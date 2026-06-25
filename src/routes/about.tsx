import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Award, TrendingUp, Clock, Users, Target } from "lucide-react";
import { PageHeader } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — BIS Consultancy Services" },
      { name: "description", content: "Learn about BIS Consultancy Services — India's trusted partner for product certification, regulatory compliance and testing." },
      { property: "og:title", content: "About — BIS Consultancy Services" },
      { property: "og:description", content: "India's pioneer in product certification consulting with 2850+ clients served." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", body: "Transparent processes and honest guidance on every certification path." },
  { icon: Award, title: "Excellence", body: "Deep regulatory expertise that delivers approvals first time, every time." },
  { icon: TrendingUp, title: "Growth Partner", body: "Helping manufacturers scale into India and global markets confidently." },
  { icon: Clock, title: "Speed", body: "Streamlined workflows that shrink certification timelines significantly." },
  { icon: Users, title: "Client-First", body: "Dedicated consultants and a single window of support throughout." },
  { icon: Target, title: "Accuracy", body: "Documentation, testing and submissions handled with precision." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="India's Pioneer in Product Certification Consulting"
        subtitle="BIS Consultancy Services is a trusted provider of certification and regulatory compliance solutions for manufacturers and importers across India and overseas."
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="text-secondary font-semibold uppercase text-sm tracking-wider">Who We Are</div>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">End-to-End Compliance Expertise</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We have helped 2850+ clients navigate BIS, EPR, FMCS, FSSAI, WPC, LMPC and STQC requirements. Our team
              combines former regulators, lab specialists and seasoned consultants to deliver one-window support — from
              gap analysis to factory audits, testing, document filing and post-licence maintenance.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Whether you're a domestic manufacturer pursuing the ISI mark, a foreign brand entering India under FMCS,
              or an importer dealing with EPR obligations — we own the process end to end.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">Talk to a Consultant</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "2850+", l: "Clients Served" },
              { n: "700+", l: "EPR Registrations" },
              { n: "550+", l: "BIS Registrations" },
              { n: "15+", l: "Years Combined Experience" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-6 text-center card-lift">
                <div className="text-3xl font-bold text-primary">{s.n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-secondary font-semibold uppercase text-sm tracking-wider">Our Values</div>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">What Guides Our Work</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl bg-card border border-border p-6 card-lift hover:border-primary/40 hover:shadow-xl">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary grid place-items-center"><v.icon className="h-6 w-6" /></div>
                <h3 className="mt-4 font-bold text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
