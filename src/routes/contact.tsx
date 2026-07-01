import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient"; 

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | BIS Consultancy Services" },
      { name: "description", content: "Speak with our certification consultants. Submit your inquiry for product certification and regulatory compliance." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });

  // Protects the form DOM nodes from extension alterations during initial mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.mobile) {
      setErrorMsg("Name, Email, and Mobile No. are required.");
      setLoading(false);
      return;
    }

    try {
      // ⚡ Direct, unbreakable match to your home screen's 'leads' pipeline
      const { error } = await supabase
        .from("leads")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            message: formData.message,
          }
        ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg(err.message || "Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-background px-4 py-12 text-foreground">
      
      {/* 🛡️ Complete UI Mounting Shield wrapper */}
      {!isMounted ? (
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-2xl space-y-4 max-w-md w-full h-[400px] flex flex-col justify-center items-center">
          <div className="w-10 h-10 border-4 border-[#0F3D5E] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading contact page securely...</p>
        </div>
      ) : (
        
        /* ✨ Ditto UI Replica from image_fb26dc.png */
        <div 
          suppressHydrationWarning 
          className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-2xl space-y-5 max-w-md w-full text-foreground transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-center tracking-tight text-[#0F3D5E] uppercase">
            Contact Us
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name *" 
                data-gramm="false" 
                data-quillbot="false"
                required
                className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" 
              />
            </div>

            <div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *" 
                data-gramm="false" 
                data-quillbot="false"
                required
                className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" 
              />
            </div>

            <div>
              <input 
                type="text" 
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile No. *" 
                data-gramm="false" 
                data-quillbot="false"
                required
                className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background" 
              />
            </div>

            <div>
              <textarea 
                rows={4} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type Message" 
                data-gramm="false" 
                data-quillbot="false"
                className="w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-[#0F3D5E] focus:ring-2 focus:ring-[#0F3D5E]/20 transition bg-background resize-none" 
              />
            </div>

            {errorMsg && <p className="text-xs text-red-500 font-medium text-center">{errorMsg}</p>}
            {success && <p className="text-sm text-emerald-600 font-semibold text-center">Inquiry submitted successfully!</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#0F3D5E] text-white py-3 font-semibold text-sm hover:bg-[#0F3D5E]/90 hover:shadow-lg transition uppercase tracking-wider disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}