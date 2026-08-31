import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { Resend } from "resend";

// تهيئة مكتبة Resend تلقائياً باستخدام مفتاح الـ API
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotification(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale?: string;
}) {
  try {
    // التحقق من وجود مفتاح الربط في السيرفر لمنع المشاكل
    if (!process.env.RESEND_API_KEY) {
      console.error("Critical Error: RESEND_API_KEY is missing on the server env variables.");
      return;
    }

    // إرسال الإيميل بشكل رسمي وفوري عبر بريد شركتك الموثق
    const { data, error } = await resend.emails.send({
      from: "Massar Trading <info@massartrading.com>", // الدومين الموثق الخاص بك
      to: "info@massartrading.com", // الإيميل الذي يستقبل الاستفسارات
      subject: `Massar Inquiry from ${formData.name}`,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nMessage: ${formData.message}\nLocale: ${formData.locale || "en"}`,
    });

    if (error) {
      console.error("Resend API failed to deliver email:", error);
      return;
    }

    console.log("Email sent instantly via Resend! ID:", data?.id);
  } catch (err: any) {
    console.error("Critical Resend wrapper crash:", err?.message || err);
  }
}
