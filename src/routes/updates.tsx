import { createFileRoute } from "@tanstack/react-router";
import { Bell, Calendar } from "lucide-react";
import { PageHeader } from "@/components/site-layout";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "Updates — Latest BIS, EPR & QCO Notifications" },
      { name: "description", content: "Stay up to date with the latest BIS Quality Control Orders, EPR rules and compliance notifications." },
      { property: "og:title", content: "Updates — BIS Consultancy Services" },
      { property: "og:description", content: "Latest regulatory notifications and compliance updates." },
    ],
  }),
  component: UpdatesPage,
});

const UPDATES = [
  { date: "Jun 18, 2026", tag: "BIS", title: "BIS Quality Control Order for Hand Tools (Pipe Wrenches – General Purpose)", body: "New QCO published mandating BIS certification for pipe wrenches manufactured or imported into India. Implementation timelines and IS standards detailed." },
  { date: "Jun 10, 2026", tag: "BIS", title: "QCO for Stainless Steel Cookware & Utensils — New Compliance Notification", body: "Manufacturers and importers must obtain ISI marking under the revised QCO. We are accepting applications for licence facilitation." },
  { date: "May 28, 2026", tag: "EPR", title: "EPR Compliance for Plastic Waste Management — 2026 Update", body: "CPCB has updated category-wise EPR targets for PIBOs. New annual return formats and credit trading rules apply." },
  { date: "May 15, 2026", tag: "FMCS", title: "FMCS Registration for Foreign Manufacturers — Latest Guidelines", body: "BIS has revised application formats, factory audit checklists and AIRA appointment requirements for overseas manufacturers." },
  { date: "May 02, 2026", tag: "Other", title: "CHIMS Registration mandatory for Integrated Circuit Importers", body: "All importers of integrated circuits must obtain CHIMS registration before filing Bill of Entry. Penalty provisions clarified." },
  { date: "Apr 24, 2026", tag: "Other", title: "WPC Approval for Wireless Devices — Revised Spectrum Rules", body: "DoT has issued updated spectrum allocations affecting WPC ETA and Equipment Type Approval for wireless products." },
  { date: "Apr 10, 2026", tag: "Other", title: "STQC Certification for CCTV Systems now mandatory", body: "Government & PSU procurement requires STQC certified surveillance equipment with essential requirement & cybersecurity testing." },
  { date: "Mar 30, 2026", tag: "BIS", title: "BIS Registration for Toys mandatory — Updated IS Standards", body: "Revisions in IS 9873 series and CRS scheme. Brands must re-certify SKUs falling under new scope." },
];

const TAG_COLOR: Record<string, string> = {
  BIS: "bg-primary/10 text-primary",
  EPR: "bg-secondary/15 text-secondary",
  FMCS: "bg-brand-cyan/15 text-brand-cyan",
  Other: "bg-accent text-accent-foreground",
};

function UpdatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Latest Notifications"
        title="Regulatory Updates"
        subtitle="The latest BIS Quality Control Orders, EPR rules, FMCS guidelines and compliance notifications — curated for manufacturers and importers."
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-5">
            {UPDATES.map((u) => (
              <article key={u.title} className="rounded-xl border border-border bg-card p-6 card-lift hover:border-primary/40 hover:shadow-xl">
                <div className="flex items-center gap-3 text-xs">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${TAG_COLOR[u.tag] ?? "bg-muted"}`}>
                    <Bell className="h-3 w-3" /> {u.tag}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {u.date}
                  </span>
                </div>
                <h3 className="mt-3 text-lg md:text-xl font-bold text-foreground">{u.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{u.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
