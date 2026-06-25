import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHeader } from "@/components/site-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Get a Free Quote | BIS Consultancy Services" },
      { name: "description", content: "Speak with our certification consultants. Get a free quote for BIS, EPR, FMCS, FSSAI and other regulatory services." },
      { property: "og:title", content: "Contact — BIS Consultancy Services" },
      { property: "og:description", content: "Get expert assistance for product certification and regulatory compliance." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Talk to a Certification Expert"
        subtitle="Tell us about your product and target market — our consultants will respond within one business day with a free, no-obligation quote."
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 card-lift">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><MapPin className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold">Office</div>
                  <p className="text-sm text-muted-foreground mt-1">BIS Consultancy Services<br />Delhi NCR, India</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 card-lift">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold">Phone</div>
                  <a href="tel:+919800000000" className="text-sm text-muted-foreground mt-1 hover:text-primary block">+91 98XXX XXXXX</a>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 card-lift">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><Mail className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold">Email</div>
                  <a href="mailto:info@bisconsultancyservices.com" className="text-sm text-muted-foreground mt-1 hover:text-primary block">info@bisconsultancyservices.com</a>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 card-lift">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><Clock className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold">Hours</div>
                  <p className="text-sm text-muted-foreground mt-1">Mon – Sat, 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="rounded-xl border border-border bg-card p-7 md:p-9 shadow-lg space-y-4"
          >
            <h2 className="text-2xl font-bold text-primary">Request a Free Quote</h2>
            <p className="text-sm text-muted-foreground">Share a few details and our team will reach out within one business day.</p>
            {submitted ? (
              <div className="rounded-md bg-brand-cyan/10 border border-brand-cyan/30 p-4 text-sm">
                Thanks! Your enquiry has been received. We'll be in touch shortly.
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Full Name" className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                  <input required type="email" placeholder="Email" className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Mobile No." className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                  <input placeholder="Company" className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                </div>
                <select className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-background">
                  <option value="">Service of interest</option>
                  <option>BIS Registration</option>
                  <option>FMCS Certification</option>
                  <option>EPR Compliance</option>
                  <option>FSSAI</option>
                  <option>WPC Approval</option>
                  <option>LMPC</option>
                  <option>STQC / Other</option>
                </select>
                <textarea rows={5} placeholder="Tell us about your product / requirement" className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                <button className="w-full rounded-md bg-primary text-primary-foreground py-3 font-semibold hover:bg-primary/90 hover:shadow-lg transition">SUBMIT ENQUIRY</button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
