import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronRight, ShieldCheck, FileCheck, Globe2, Factory, Recycle,
  Battery, Cpu, Wrench, Beaker, PackageCheck, Radio, Scale, Camera,
} from "lucide-react";
import { PageHeader } from "@/components/site-layout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — BIS, EPR & Regulatory Compliance" },
      { name: "description", content: "Comprehensive BIS, FMCS, EPR, FSSAI, WPC, LMPC and STQC certification services for manufacturers and importers." },
      { property: "og:title", content: "Our Services — BIS Consultancy Services" },
      { property: "og:description", content: "End-to-end certification and regulatory compliance solutions." },
    ],
  }),
  component: ServicesPage,
});

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

function ServicesPage() {
  const keys = Object.keys(TABS) as TabKey[];
  const [active, setActive] = useState<TabKey>(keys[0]);
  return (
    <>
      <PageHeader
        eyebrow="What We Offer"
        title="Our Services"
        subtitle="End-to-end certification and regulatory compliance solutions tailored to your business needs."
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {keys.map((k) => (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all ${active === k ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-muted text-foreground hover:bg-accent hover:scale-105"}`}
              >
                {k}
              </button>
            ))}
          </div>
          <div key={active} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TABS[active].map((srv, i) => (
              <div
                key={srv.name}
                className="reveal in-view group rounded-xl border border-border bg-card p-6 card-lift hover:border-primary hover:shadow-xl"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-brand-cyan text-primary-foreground grid place-items-center group-hover:rotate-6 group-hover:scale-110 transition-transform">
                  <srv.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-base">{srv.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{srv.desc}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group/cta">
                  Learn more <ChevronRight className="h-4 w-4 group-hover/cta:translate-x-1 transition" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
