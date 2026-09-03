import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { Resend } from "resend";

export async function sendContactNotification(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale?: string;
}) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Critical Error: RESEND_API_KEY is missing on the server env variables.");
      return;
    }

    const resend = new Resend(apiKey);
    const currentLocale = formData.locale || "en";

    // ==========================================
    // 1️⃣ أولاً: إرسال الرد التلقائي فوراً لبريد العميل (المستفسر الحقيقي)
    // ينطلق باسم شركتك الجديد والكامل وبشكل احترافي ومباشر
    // ==========================================
    const autoReplySubject = currentLocale === "ar" 
      ? "نشكرك على تواصلك مع مسار للاستيراد والتصدير والتجارة" 
      : currentLocale === "ms"
        ? "Terima kasih kerana menghubungi Massar Import Export Trading"
        : "Thank you for contacting Massar Import Export Trading";

    let autoReplyHtml = "";

    if (currentLocale === "ar") {
      autoReplyHtml = `
        <div style="direction: rtl; font-family: sans-serif; padding: 20px; color: #1c2d24; background-color: #fcfbf7; border-radius: 16px; border: 1px solid #d4af37;">
          <h2 style="color: #1c2d24;">مرحباً ${formData.name}،</h2>
          <p>نشكرك على اهتمامك وتواصلك مع <strong>مسار للاستيراد والتصدير والتجارة (Massar Import Export Trading)</strong>.</p>
          <p>لقد استلمنا استفسارك بخصوص منتجاتنا بنجاح، ويقوم فريقنا حالياً بمراجعة تفاصيل رسالتك والعمل عليها.</p>
          <p>سنقوم بالرد عليك والإجابة على كافة استفساراتك في أقرب وقت ممكن (خلال 24 ساعة).</p>
          <br />
          <hr style="border: 0; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #71717a;">هذه رسالة تأكيد تلقائية من موقع مسار للاستيراد والتصدير والتجارة، يرجى عدم الرد عليها مباشرة.</p>
        </div>
      `;
    } else if (currentLocale === "ms") {
      autoReplyHtml = `
        <div style="font-family: sans-serif; padding: 20px; color: #1c2d24; background-color: #fcfbf7; border-radius: 16px; border: 1px solid #d4af37;">
          <h2 style="color: #1c2d24;">Hello ${formData.name},</h2>
          <p>Terima kasih kerana berminat dan menghubungi <strong>Massar Import Export Trading</strong>.</p>
          <p>Kami telah berjaya menerima pertanyaan anda. Pasukan kami sedang menyemak mesej anda dengan teliti.</p>
          <p>Kami akan maklum balas kepada anda secepat mungkin dalam tempoh 24 jam.</p>
          <br />
          <hr style="border: 0; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #71717a;">Ini adalah e-mel pengesahan automatik daripada laman web Massar Import Export Trading, sila jangan balas e-mel ini.</p>
        </div>
      `;
    } else {
      autoReplyHtml = `
        <div style="font-family: sans-serif; padding: 20px; color: #1c2d24; background-color: #fcfbf7; border-radius: 16px; border: 1px solid #d4af37;">
          <h2 style="color: #1c2d24;">Hello ${formData.name},</h2>
          <p>Thank you for your interest and contacting <strong>Massar Import Export Trading</strong>.</p>
          <p>We have successfully received your inquiry regarding our products, and our team is currently reviewing your message.</p>
          <p>We will get back to you with the details as soon as possible (within 24 hours).</p>
          <br />
          <hr style="border: 0; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #71717a;">This is an automated confirmation email from Massar Import Export Trading website, please do not reply to this message directly.</p>
        </div>
      `;
    }

    const userReply = await resend.emails.send({
      from: "Massar Import Export Trading <info@massartrading.com>",
      to: formData.email, 
      subject: autoReplySubject,
      html: autoReplyHtml,
    });

    if (userReply.error) {
      console.error("Resend API failed to deliver customer auto-reply:", userReply.error);
    } else {
      console.log("Customer auto-reply sent successfully! ID:", userReply.data?.id);
    }

    // ==========================================
    // 2️⃣ ثانياً: إرسال تفاصيل الاستفسار إلى إيميل شركتك الرسمي
    // استخدام onboarding@resend.dev يضمن تخطي حظر GoDaddy الصارم ووصول الاستفسار فوراً لوارد الشركة
    // ==========================================
    const adminReply = await resend.emails.send({
      from: "Massar System <onboarding@resend.dev>", 
      to: "info@massartrading.com", 
      replyTo: formData.email, // يحافظ على إمكانية الرد المباشر على العميل عند ضغط زر "رد" في إيميل الشركة
      subject: `Massar Inquiry from ${formData.name}`,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nMessage: ${formData.message}\nLocale: ${formData.locale || "en"}`,
    });

    if (adminReply.error) {
      console.error("Resend API failed to deliver admin notification:", adminReply.error);
    } else {
      console.log("Admin notification processed! ID:", adminReply.data?.id);
    }

  } catch (err: any) {
    console.error("Critical Resend wrapper crash:", err?.message || err);
  }
}
