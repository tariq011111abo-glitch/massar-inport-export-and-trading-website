import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function sendContactNotification(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale?: string;
}) {
  try {
    const [settings] = await db.select().from(siteSettings).limit(1);
    const contactEmail = "info@massartrading.com";
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.titan.email",
        port: Number(process.env.SMTP_PORT || 465),
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || contactEmail,
        to: contactEmail,
        subject: `Massar Inquiry from ${formData.name}`,
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nMessage: ${formData.message}\nLocale: ${formData.locale || "en"}`,
      });
    }

    const whatsappUrl = process.env.WHATSAPP_WEBHOOK_URL;
    if (whatsappUrl) {
      const whatsappMsg = `Massar Inquiry:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
      await fetch(whatsappUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: settings?.whatsapp || "+60183220883", message: whatsappMsg }),
      });
    }
  } catch (err: any) {
    console.error("Notification error:", err.message || err);
  }
}