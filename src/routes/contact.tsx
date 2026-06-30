import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHeader } from "@/components/site-layout";
import { createServerFn } from "@tanstack/react-start";
import { sendInquiryEmail } from "@/components/sendEmail";
import { supabase } from "@/lib/supabaseClient"; // ⚡ Absolute import ensures backend access to .env context

// Define a secure execution endpoint right here
const triggerEmailSubmit = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    let dbSuccess = true;
    let emailSuccess = false;
    let errorLog = "";

    // 1. Try Database Insert safely on the server side
    try {
      const { error } = await supabase
        .from("quotes")
        .insert([
          {
            name: data.name,
            email: data.email,
            mobile: data.phone, 
            company: data.company,
            service: data.service,
            message: data.message
          }
        ]);

      if (error) {
        console.error("Supabase Database Insertion Error:", error.message);
        dbSuccess = false;
        errorLog = error.message;
      }
    } catch (dbErr: any) {
      console.error("Database connection dropped completely:", dbErr);
      dbSuccess = false;
      errorLog = dbErr.message || "Database connection error";
    }

    // 2. Try Email Delivery safely on the server side
    try {
      const emailResponse = await sendInquiryEmail(data);
      if (emailResponse && emailResponse.success) {
        emailSuccess = true;
      } else {
        errorLog = emailResponse?.error || "Email delivery rejected by provider";
      }
    } catch (emailErr: any) {
      console.error("Resend Email Service crashed:", emailErr);
      errorLog = emailErr.message || "Email service crashed";
    }

    // Return status cleanly back to the client side browser context
    if (dbSuccess || emailSuccess) {
      return { success: true, error: null };
    } else {
      return { success: false, error: errorLog || "Failed to process request" };
    }
  });

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await triggerEmailSubmit({
        data: { name, email, phone, company, service, message }
      });

      if (response.success) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setService("");
        setMessage("");
      } else {
        setErrorMsg(response.error || "Failed to deliver inquiry.");
      }
    } catch (err: any) {
      setErrorMsg("An unexpected server boundary error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <div className="h-10 w-10 rounded-lg bg-[#0F3D5E]/10 text-[#0F3D5E] grid place-items-center"><MapPin className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-[#0F3D5E]">Office</div>
                  <p className="text-sm text-muted-foreground mt-1">BIS Consultancy Services<br />Delhi NCR, India</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 card-lift">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#0F3D5E]/10 text-[#0F3D5E] grid place-items-center"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-[#0F3D5E]">Phone</div>
                  <a href="tel:+919800000000" className="text-sm text-muted-foreground mt-1 hover:text-[#0F3D5E] block">+91 98XXX XXXXX</a>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 card-lift">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#0F3D5E]/10 text-[#0F3D5E] grid place-items-center"><Mail className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-[#0F3D5E]">Email</div>
                  <a href="mailto:info@bisconsultancyservices.com" className="text-sm text-muted-foreground mt-1 hover:text-[#0F3D5E] block">info@bisconsultancyservices.com</a>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 card-lift">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#0F3D5E]/10 text-[#0F3D5E] grid place-items-center"><Clock className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-[#0F3D5E]">Hours</div>
                  <p className="text-sm text-muted-foreground mt-1">Mon – Sat, 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleFormSubmit}
            suppressHydrationWarning
            className="rounded-xl border border-border bg-card p-7 md:p-9 shadow-lg space-y-4 text-foreground"
          >
            <h2 className="text-2xl font-bold text-[#0F3D5E]">Request a Free Quote</h2>
            <p className="text-sm text-muted-foreground">Share a few details and our team will reach out within one business day.</p>
            
            {errorMsg && (
              <div className="rounded-md bg-destructive/10 border border-destructive/30 p-3 text-xs text-destructive text-center">
                {errorMsg}
              </div>
            )}

            {submitted ? (
              <div className="rounded-md bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 text-center font-medium">
                Thanks! Your enquiry has been received. We'll be in touch shortly.
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" />
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile No." className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" />
                  <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" />
                </div>
                <select required value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background text-foreground">
                  <option value="">Service of interest</option>
                  <option value="BIS Registration">BIS Registration</option>
                  <option value="FMCS Certification">FMCS Certification</option>
                  <option value="EPR Compliance">EPR Compliance</option>
                  <option value="FSSAI">FSSAI</option>
                  <option value="WPC Approval">WPC Approval</option>
                  <option value="LMPC">LMPC</option>
                  <option value="STQC / Other">STQC / Other</option>
                </select>
                {/* 🛠️ Added protection tags here to isolate QuillBot's script extensions */}
                <textarea 
                  required 
                  rows={5} 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Tell us about your product / requirement" 
                  data-gramm="false"
                  data-quillbot="false"
                  className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background resize-none" 
                />
                <button disabled={isSubmitting} className="w-full rounded-md bg-[#0F3D5E] text-white py-3 font-semibold hover:bg-[#0F3D5E]/90 hover:shadow-lg transition disabled:opacity-50 tracking-wider uppercase">
                  {isSubmitting ? "SENDING..." : "SUBMIT ENQUIRY"}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}