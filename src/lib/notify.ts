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

    // 1️⃣ الإيميل الأول: يرسل تفاصيل رسالة العميل إليك أنت (المدير) لتطلع عليها
    try {
      await resend.emails.send({
        from: "MASSAR IMPORT EXPORT TRADING <info@massartrading.com>", 
        to: "tariq01877abohatem@gmail.com", // 💡 تم الإصلاح: الاستفسار يصل إليك أنت هنا بنسبة 100%
        replyTo: formData.email, // إذا ضغطت "رد" في بريدك سيفتح مسودة لمراسلة العميل مباشرة
        subject: `New Massar Website Inquiry from ${formData.name}`,
        text: `You have received a new message:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nMessage: ${formData.message}\nLocale: ${formData.locale || "en"}`,
      });
      console.log("Admin notification email sent successfully.");
    } catch (adminErr: any) {
      console.error("Failed to send admin notification:", adminErr?.message || adminErr);
    }

    // 2️⃣ الإيميل الثاني: يرسل الرد التلقائي الاحترافي الفخم إلى العميل (المستفسر)
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
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fcfbf7; border-radius: 24px; border: 1px solid #d4af37; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          
          <div style="background-color: #1c2d24; padding: 30px; text-align: center; border-bottom: 3px solid #d4af37;">
            <img src="${logoUrl}" alt="MASSAR Logo" style="height: 70px; width: 70px; border-radius: 50%; object-fit: cover; border: 2px solid #d4af37; background-color: #fcfbf7; padding: 2px;" />
            <h1 style="color: #fcfbf7; font-size: 16px; font-weight: 600; margin: 15px 0 0 0; letter-spacing: 1px;">MASSAR IMPORT EXPORT TRADING SDN. BHD.</h1>
          </div>

          <div style="padding: 40px 30px; color: #1c2d24; line-height: 1.7; direction: ${isArabic ? 'rtl' : 'ltr'}; text-align: ${isArabic ? 'right' : 'left'};">
            
            ${isArabic ? `
              <h2 style="color: #1c2d24; font-size: 22px; margin-top: 0;">مرحباً ${formData.name}،</h2>
              <p style="font-size: 15px; color: #3f3f46;">نشكرك على تواصلك مع <strong>MASSAR IMPORT EXPORT TRADING SDN. BHD.</strong></p>
              <p style="font-size: 15px; color: #3f3f46;">لقد استلمنا بريدك الإلكتروني بنجاح، ويقوم فريقنا حالياً بمراجعته والعمل عليه. سنقوم بالرد عليك في أقرب وقت ممكن، وعادة ما يكون ذلك خلال <strong>24 ساعة عمل</strong>.</p>
              
              <div style="background-color: #f3f1e9; border-right: 4px solid #d4af37; padding: 20px; border-radius: 12px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #1c2d24; font-size: 16px;">هل استفسارك عاجل؟</h3>
                <p style="font-size: 14px; margin-bottom: 10px; color: #52525b;">يرجى عدم التردد في التواصل معنا مباشرة عبر الهاتف أو الواتساب على الأرقام التالية:</p>
                <p style="margin: 5px 0; font-weight: bold; color: #1c2d24;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">📞 +60 12-2717147</a></p>
                <p style="margin: 5px 0; font-weight: bold; color: #1c2d24;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">📞 +60 18-3220883</a></p>
              </div>
            ` : isMalay ? `
              <h2 style="color: #1c2d24; font-size: 22px; margin-top: 0;">Hello ${formData.name},</h2>
              <p style="font-size: 15px; color: #3f3f46;">Terima kasih kerana menghubungi <strong>MASSAR IMPORT EXPORT TRADING SDN. BHD.</strong></p>
              <p style="font-size: 15px; color: #3f3f46;">Kami telah berjaya menerima e-mel anda, dan pasukan kami sedang menyemaknya. Kami akan maklum balas secepat mungkin, biasanya dalam tempoh <strong>24 jam perniagaan</strong>.</p>
              
              <div style="background-color: #f3f1e9; border-left: 4px solid #d4af37; padding: 20px; border-radius: 12px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #1c2d24; font-size: 16px;">Adakah pertanyaan anda mendesak?</h3>
                <p style="font-size: 14px; margin-bottom: 10px; color: #52525b;">Sila hubungi kami terus melalui Telefon atau WhatsApp di:</p>
                <p style="margin: 5px 0; font-weight: bold; color: #1c2d24;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">📞 +60 12-2717147</a></p>
                <p style="margin: 5px 0; font-weight: bold; color: #1c2d24;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">📞 +60 18-3220883</a></p>
              </div>
            ` : `
              <h2 style="color: #1c2d24; font-size: 21px; margin-top: 0; font-weight: 600;">Hello ${formData.name},</h2>
              <p style="font-size: 14px; color: #3f3f46;">Thank you for contacting <strong>MASSAR IMPORT EXPORT TRADING SDN. BHD.</strong></p>
              <p style="font-size: 14px; color: #3f3f46;">We have successfully received your email, and our team is currently reviewing it. We will get back to you as soon as possible, usually within <strong>24 business hours</strong>.</p>
              
              <div style="background-color: #f3f1e9; border-left: 4px solid #d4af37; padding: 20px; border-radius: 12px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #1c2d24; font-size: 15px; font-weight: 600;">If your inquiry is urgent:</h3>
                <p style="font-size: 13px; margin-bottom: 10px; color: #52525b;">Please feel free to reach out to us via Phone or WhatsApp at:</p>
                <p style="margin: 4px 0; font-weight: bold; color: #1c2d24; font-size: 14px;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">🟢 +60 12-2717147</a></p>
                <p style="margin: 4px 0; font-weight: bold; color: #1c2d24; font-size: 14px;"><a href="https://wa.me" style="color: #1c2d24; text-decoration: none;">🟢 +60 18-3220883</a></p>
              </div>
            `}

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1c2d24;">Best regards,</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 600; color: #d4af37;">Customer Support Team</p>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #71717a; font-weight: 500;">MASSAR IMPORT EXPORT TRADING SDN. BHD.</p>
            </div>

          </div>

          <div style="background-color: #1c2d24; padding: 15px; text-align: center;">
            <p style="margin: 0; font-size: 11px; color: #a1a1aa;">&copy; 2026 MASSAR. All rights reserved.</p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: "MASSAR IMPORT EXPORT TRADING <info@massartrading.com>",
        to: formData.email, // 💡 تم الإصلاح: الرد التلقائي الفخم يذهب للعميل الحقيقي هنا بنسبة 100%
        subject: autoReplySubject,
        html: autoReplyHtml,
      });
      console.log("Customer corporate auto-reply email sent successfully.");
    } catch (userErr: any) {
      console.error("Failed to send customer auto-reply:", userErr?.message || userErr);
    }

  } catch (err: any) {
    console.error("Critical Resend wrapper crash:", err?.message || err);
  }
}
