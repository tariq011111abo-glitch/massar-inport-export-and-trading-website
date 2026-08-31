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
    // تعديل: قمنا بجعل المنفذ الافتراضي 587 في حال لم يتم قراءته من المتغيرات البيئية
    const port = Number(process.env.SMTP_PORT || 587);

    console.log("SMTP check:", {
      hasHost: Boolean(host),
      hasUser: Boolean(user),
      hasPass: Boolean(pass),
      host,
      port,
    });

    if (!host || !user || !pass) {
      console.error("SMTP env vars missing on server");
      return;
    }

    const nodemailer = await import("nodemailer");
    
    const transporter = nodemailer.createTransport({
      host,
      port,
      // إصلاح: يكون true فقط إذا كان المنفذ 465 (SSL)، و false إذا كان المنفذ 587 (TLS)
      secure: port === 465, 
      auth: { user, pass },
      // إضافة برمجية هامة: لتخطي حظر شهادات الأمان وجدران الحماية بين الاستضافة و GoDaddy
      tls: {
        rejectUnauthorized: false
      }
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || user,
      to: "info@massartrading.com",
      subject: `Massar Inquiry from ${formData.name}`,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nMessage: ${formData.message}\nLocale: ${formData.locale || "en"}`,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (err: any) {
    console.error("Notification error:", err?.message || err);
    if (err?.code) console.error("SMTP code:", err.code);
    if (err?.response) console.error("SMTP response:", err.response);
  }
}
