import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { Resend } from "resend";

export const Route = createAPIFileRoute("/api/inquiry")({
  POST: async ({ request }) => {
    try {
      const data = await request.json();
      const apiKey = process.env.RESEND_API_KEY;

      if (!apiKey) {
        return json({ success: false, error: "Missing API Key on production environment." }, { status: 500 });
      }

      const resend = new Resend(apiKey);

      const emailResult = await resend.emails.send({
        from: "BIS Inquiry System <onboarding@resend.dev>",
        to: "marketingcsbis@gmail.com",
        subject: `🚨 New Lead: [${data.service || "General"}] from ${data.name}`,
        html: `
          <div style="font-family: sans-serif; padding: 25px; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #0284c7; margin-bottom: 20px;">New Consultation Request</h2>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Full Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Mobile Number:</strong> ${data.phone}</p>
            <p><strong>Company Name:</strong> ${data.company || "Not Specified"}</p>
            <p><strong>Service Requested:</strong> ${data.service || "Not Specified"}</p>
            <p><strong>Requirement Details:</strong></p>
            <blockquote style="background: #f8fafc; padding: 15px; border-left: 4px solid #0284c7; margin: 10px 0; font-style: italic;">
              ${data.message || "No custom message provided."}
            </blockquote>
          </div>
        `,
      });

      if (emailResult.error) {
        return json({ success: false, error: emailResult.error.message }, { status: 400 });
      }

      return json({ success: true });
    } catch (error: any) {
      return json({ success: false, error: error.message || "Server Error" }, { status: 500 });
    }
  },
});