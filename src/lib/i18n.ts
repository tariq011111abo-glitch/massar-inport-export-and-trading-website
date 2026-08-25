import type { Locale, Localized } from "@/lib/types";

export function t(value: Localized | null | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.en || "";
}

export const ui = {
  exploreProducts: {
    en: "Explore our products",
    ar: "استكشف منتجاتنا",
    ms: "Terokai produk kami",
  },
  contactUs: {
    en: "Contact us",
    ar: "تواصل معنا",
    ms: "Hubungi kami",
  },
  shopNow: {
    en: "Shop from our stores",
    ar: "تسوّق من متاجرنا",
    ms: "Beli di kedai kami",
  },
  learnMore: {
    en: "Learn more",
    ar: "اعرف المزيد",
    ms: "Ketahui selanjutnya",
  },
  viewProduct: {
    en: "View details",
    ar: "عرض التفاصيل",
    ms: "Lihat butiran",
  },
  backHome: {
    en: "Back to home",
    ar: "العودة إلى الرئيسية",
    ms: "Kembali ke laman utama",
  },
  origin: {
    en: "Origin",
    ar: "المنشأ",
    ms: "Asal",
  },
  category: {
    en: "Category",
    ar: "التصنيف",
    ms: "Kategori",
  },
  availability: {
    en: "Availability",
    ar: "التوفر",
    ms: "Ketersediaan",
  },
  sourceMarkets: {
    en: "Source markets",
    ar: "أسواق المصدر",
    ms: "Pasaran sumber",
  },
  destination: {
    en: "Destination",
    ar: "الوجهة",
    ms: "Destinasi",
  },
  visitStore: {
    en: "Visit store",
    ar: "زيارة المتجر",
    ms: "Lawati kedai",
  },
  sendMessage: {
    en: "Send message",
    ar: "إرسال الرسالة",
    ms: "Hantar mesej",
  },
  name: {
    en: "Full name",
    ar: "الاسم الكامل",
    ms: "Nama penuh",
  },
  email: {
    en: "Email",
    ar: "البريد الإلكتروني",
    ms: "E-mel",
  },
  phone: {
    en: "Phone",
    ar: "الهاتف",
    ms: "Telefon",
  },
  message: {
    en: "Message",
    ar: "الرسالة",
    ms: "Mesej",
  },
  messageSent: {
    en: "Thank you. Your inquiry has been received.",
    ar: "شكرًا لك. تم استلام استفسارك.",
    ms: "Terima kasih. Pertanyaan anda telah diterima.",
  },
  rights: {
    en: "All rights reserved.",
    ar: "جميع الحقوق محفوظة.",
    ms: "Hak cipta terpelihara.",
  },
  basedIn: {
    en: "Based in Malaysia",
    ar: "مقرّها في ماليزيا",
    ms: "Berpangkalan di Malaysia",
  },
  imported: {
    en: "Imported",
    ar: "مستورد",
    ms: "Diimport",
  },
  sold: {
    en: "Distributed in Malaysia",
    ar: "يُوزَّع في ماليزيا",
    ms: "Diedarkan di Malaysia",
  },
  both: {
    en: "Imported & sold",
    ar: "مستورد ويُباع",
    ms: "Diimport & dijual",
  },
  dates: {
    en: "Dates",
    ar: "تمور",
    ms: "Kurma",
  },
  oils: {
    en: "Oils",
    ar: "زيوت",
    ms: "Minyak",
  },
  other: {
    en: "Food products",
    ar: "منتجات غذائية",
    ms: "Produk makanan",
  },
  notFound: {
    en: "Page not found",
    ar: "الصفحة غير موجودة",
    ms: "Halaman tidak dijumpai",
  },
  productInquiry: {
    en: "Ask about this product",
    ar: "استفسر عن هذا المنتج",
    ms: "Tanya tentang produk ini",
  },
  openMap: {
    en: "Open in Google Maps",
    ar: "افتح في خرائط جوجل",
    ms: "Buka di Google Maps",
  },
  whatsapp: {
    en: "WhatsApp",
    ar: "واتساب",
    ms: "WhatsApp",
  },
} satisfies Record<string, Localized>;

export function labelForCategory(category: string, locale: Locale) {
  if (category === "dates") return ui.dates[locale];
  if (category === "oils") return ui.oils[locale];
  return ui.other[locale];
}

export function labelForStatus(status: string, locale: Locale) {
  if (status === "imported") return ui.imported[locale];
  if (status === "sold") return ui.sold[locale];
  return ui.both[locale];
}

export function labelForOrigin(origin: string, locale: Locale) {
  const map: Record<string, Localized> = {
    "Saudi Arabia": {
      en: "Saudi Arabia",
      ar: "المملكة العربية السعودية",
      ms: "Arab Saudi",
    },
    Palestine: {
      en: "Palestine",
      ar: "فلسطين",
      ms: "Palestin",
    },
    Malaysia: {
      en: "Malaysia",
      ar: "ماليزيا",
      ms: "Malaysia",
    },
  };
  return map[origin]?.[locale] || origin;
}
