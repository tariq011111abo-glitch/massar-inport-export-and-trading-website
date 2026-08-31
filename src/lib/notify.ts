import { db } from "@/db";
import { siteSettings } from "@/db/schema";

export async function sendContactNotification(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale?: string;
}) {
  try {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    console.log("SMTP check:", {
      hasHost: Boolean(host),
      hasUser: Boolean(user),
      hasPass: Boolean(pass),
      host,
    });

    if (!host || !user || !pass) {
      console.error("SMTP env vars missing on server");
      return;
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || user,
      to: "info@massartrading.com",
      subject: `Massar Inquiry from ${formData.name}`,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nMessage: ${formData.message}\nLocale: ${formData.locale || "en"}`,
    });

    console.log("Email sent:", info.messageId);
  } catch (err: any) {
    console.error("Notification error:", err?.message || err);
    if (err?.code) console.error("SMTP code:", err.code);
    if (err?.response) console.error("SMTP response:", err.response);
  }
}