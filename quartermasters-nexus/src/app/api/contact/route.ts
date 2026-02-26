import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "Quartermasters <hello@quartermasters.me>";
const INTERNAL_ADDRESS = "ceocli@quartermasters.me";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, organization, service, message, _honeypot } = body;

    // Honeypot check — bots fill hidden fields
    if (_honeypot) {
      return NextResponse.json({ success: true }); // Silent reject
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const serviceLabels: Record<string, string> = {
      "web-dev": "Web Development",
      redesign: "Website Redesign",
      "feature-injection": "Feature Injection",
      "express-build": "Express Build",
      "ai-training": "Custom AI Model Training",
      general: "General Inquiry",
    };

    const serviceLabel = serviceLabels[service] || service || "Not specified";

    // Send internal notification
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: INTERNAL_ADDRESS,
      subject: `New Inquiry: ${serviceLabel} — ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Organization</td><td style="padding:8px;">${escapeHtml(organization || "—")}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${escapeHtml(serviceLabel)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${escapeHtml(message)}</td></tr>
        </table>
      `,
    });

    // Send confirmation to the visitor
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "We received your inquiry — Quartermasters",
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thank you for reaching out to Quartermasters. We've received your inquiry regarding <strong>${escapeHtml(serviceLabel)}</strong> and will respond within 24 business hours.</p>
        <p>In the meantime, feel free to explore our services at <a href="https://quartermasters.me">quartermasters.me</a>.</p>
        <br/>
        <p>Best regards,<br/>The Quartermasters Team<br/>California, United States</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
