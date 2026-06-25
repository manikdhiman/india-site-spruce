import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/site-layout";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Certification Projects" },
      { name: "description", content: "Selected BIS, EPR, FMCS and FSSAI certification projects delivered for Indian and global manufacturers." },
      { property: "og:title", content: "Portfolio — BIS Consultancy Services" },
      { property: "og:description", content: "Recent certification and compliance success stories." },
    ],
  }),
  component: PortfolioPage,
});

const PROJECTS = [
  { client: "SD Metals", scope: "BIS Registration — Non-Ferrous Metals", outcome: "Licence granted in 90 days", category: "BIS" },
  { client: "Flatkick Footwear", scope: "BIS Registration for Footwear (QCO)", outcome: "Compliant with revised IS standards", category: "BIS" },
  { client: "Star Kidz", scope: "BIS Registration for Toys", outcome: "Imported & domestic SKUs certified", category: "BIS" },
  { client: "Aygo Electronics", scope: "FMCS Certification (Foreign Manufacturer)", outcome: "India market access enabled", category: "FMCS" },
  { client: "TrueLite LED", scope: "EPR — E-Waste Management", outcome: "CPCB EPR authorisation issued", category: "EPR" },
  { client: "Shufab Packaging", scope: "EPR — Plastic Waste Management", outcome: "Annual targets met, returns filed", category: "EPR" },
  { client: "Acme Cookware", scope: "BIS — Stainless Steel Utensils QCO", outcome: "Certified ahead of QCO deadline", category: "BIS" },
  { client: "GreenTech Batteries", scope: "EPR — Battery Waste Management", outcome: "EPR plan & registration approved", category: "EPR" },
  { client: "Northstar CCTV", scope: "STQC Certification for CCTV", outcome: "ER & cybersecurity testing cleared", category: "Other" },
];

function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Portfolio of Certification Projects"
        subtitle="A selection of recent BIS, EPR and FMCS programs delivered for manufacturers and importers across India and overseas."
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p) => (
              <div key={p.client} className="rounded-xl border border-border bg-card p-6 card-lift hover:border-primary hover:shadow-xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-secondary">{p.category}</div>
                <h3 className="mt-2 text-lg font-bold text-primary">{p.client}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.scope}</p>
                <div className="mt-4 flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-cyan shrink-0" />
                  <span>{p.outcome}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
              Start Your Certification
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
