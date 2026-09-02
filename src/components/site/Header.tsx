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
    const logoUrl = "https://massartrading.com"; 

    // 1️⃣ الإيميل الأول: تفاصيل الاستفسار تصل لبريد الشركة الرسمىinfo@massartrading.com
    try {
      await resend.emails.send({
        from: "Massar Trading <info@massartrading.com>", 
        to: "info@massartrading.com", 
        replyTo: formData.email, 
        subject: `Massar Inquiry from ${formData.name}`,
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nMessage: ${formData.message}\nLocale: ${formData.locale || "en"}`,
      });
      console.log("Inquiry notification delivered to company inbox.");
    } catch (adminErr) {
      // 💡 تم تصحيح الكلمة هنا بدقة لتصبح adminErr متطابقة تماماً وتختفي الأخطاء الحمراء فوراً!
      console.error("Failed to send admin notification:", adminErr);
    }

    // 2️⃣ الإيميل الثاني: الرد التلقائي الفوري والمباشر وينطلق برمجياً إلى بريد العميل
    try {
      const currentLocale = formData.locale || "en";
      const isArabic = currentLocale === "ar";
      const isMalay = currentLocale === "ms";
      
      const autoReplySubject = isArabic 
        ? "تأكيد استلام استفسارك - مسار للتجارة" 
        : isMalay
          ? "Pengesahan Pertanyaan - Massar Trading"
          : "Inquiry Acknowledgment - MASSAR IMPORT EXPORT TRADING SDN. BHD.";

      const autoReplyHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 25px; border: 1px solid #d4af37; border-radius: 16px; background-color: #fcfbf7; color: #1c2d24; direction: ${isArabic ? 'rtl' : 'ltr'}; text-align: ${isArabic ? 'right' : 'left'};">
          
          <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #d4af37;">
            <img src="${logoUrl}" alt="MASSAR Logo" style="height: 65px; width: 65px; border-radius: 50%; object-fit: cover;" />
            <h2 style="margin: 10px 0 0 0; font-size: 16px; color: #1c2d24; font-weight: bold;">MASSAR IMPORT EXPORT TRADING SDN. BHD.</h2>
          </div>

          ${isArabic ? `
            <p style="font-size: 15px;">مرحباً <strong>${formData.name}</strong>،</p>
            <p style="font-size: 14px; color: #3f3f46;">نشكرك على تواصلك مع مسار للاستيراد والتصدير والتجارة.</p>
            <p style="font-size: 14px; color: #3f3f46;">لقد استلمنا بريدك الإلكتروني بنجاح، ويقوم فريقنا حالياً بمراجعته. سنقوم بالرد عليك في أقرب وقت ممكن، وعادة ما يكون ذلك خلال 24 ساعة عمل.</p>
            
            <div style="background-color: #f3f1e9; border-right: 4px solid #d4af37; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin-top: 0; font-weight: bold; font-size: 14px; color: #1c2d24;">هل استفسارك عاجل؟</p>
              <p style="font-size: 13px; color: #52525b; margin-bottom: 8px;">يرجى عدم التردد في التواصل معنا مباشرة عبر الهاتف أو الواتساب على الأرقام التالية:</p>
              <p style="margin: 4px 0; font-weight: bold;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">🟢 +60 12-2717147</a></p>
              <p style="margin: 4px 0; font-weight: bold;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">🟢 +60 18-3220883</a></p>
            </div>
          ` : isMalay ? `
            <p style="font-size: 15px;">Hello <strong>${formData.name}</strong>,</p>
            <p style="font-size: 14px; color: #3f3f46;">Terima kasih kerana menghubungi MASSAR IMPORT EXPORT TRADING SDN. BHD.</p>
            <p style="font-size: 14px; color: #3f3f46;">Kami telah berjaya menerima e-mel anda, dan pasukan kami sedang menyemaknya. Kami akan maklum balas secepat mungkin, biasanya dalam tempoh 24 jam perniagaan.</p>
            
            <div style="background-color: #f3f1e9; border-left: 4px solid #d4af37; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin-top: 0; font-weight: bold; font-size: 14px; color: #1c2d24;">Adakah pertanyaan anda mendesak?</p>
              <p style="font-size: 13px; color: #52525b; margin-bottom: 8px;">Sila hubungi kami terus melalui Telefon atau WhatsApp di:</p>
              <p style="margin: 4px 0; font-weight: bold;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">🟢 +60 12-2717147</a></p>
              <p style="margin: 4px 0; font-weight: bold;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">🟢 +60 18-3220883</a></p>
            </div>
          ` : `
            <p style="font-size: 15px;">Hello <strong>${formData.name}</strong>,</p>
            <p style="font-size: 14px; color: #3f3f46;">Thank you for contacting <b>MASSAR IMPORT EXPORT TRADING SDN. BHD.</b></p>
            <p style="font-size: 14px; color: #3f3f46;">We have successfully received your email, and our team is currently reviewing it. We will get back to you as soon as possible, usually within 24 business hours.</p>
            
            <div style="background-color: #f3f1e9; border-left: 4px solid #d4af37; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin-top: 0; font-weight: bold; font-size: 14px; color: #1c2d24;">If your inquiry is urgent, please feel free to reach out to us via Phone or WhatsApp at:</p>
              <p style="margin: 6px 0 4px 0; font-weight: bold;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">🟢 +60 12-2717147</a></p>
              <p style="margin: 4px 0; font-weight: bold;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">🟢 +60 18-3220883</a></p>
            </div>
          `}

          <br />
          <p style="margin-bottom: 0; font-size: 14px;">Best regards,</p>
          <p style="margin-top: 5px; font-weight: bold; color: #d4af37; font-size: 14px;">Customer Support Team | MASSAR IMPORT EXPORT TRADING SDN. BHD.</p>
        </div>
      `;

      await resend.emails.send({
        from: "Massar Trading <info@massartrading.com>",
        to: formData.email, 
        subject: autoReplySubject,
        html: autoReplyHtml,
      });
      console.log("Customer professional corporate HTML auto-reply sent.");
    } catch (userErr) {
      console.error("Failed to send customer auto-reply template:", userErr);
    }

  } catch (err: any) {
    console.error("Critical Resend wrapper crash:", err?.message || err);
  }
}
