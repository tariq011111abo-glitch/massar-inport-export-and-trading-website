import bcrypt from "bcryptjs";
import { db } from "@/db";
import {
  admins,
  countries,
  highlights,
  navItems,
  products,
  services,
  siteSections,
  siteSettings,
  stores,
  type Localized,
} from "@/db/schema";

function L(en: string, ar: string, ms: string): Localized {
  return { en, ar, ms };
}

let seedPromise: Promise<void> | null = null;

export async function ensureSeeded() {
  const existing = await db.select({ id: admins.id }).from(admins).limit(1);
  if (existing.length > 0) return;
  if (!seedPromise) {
    seedPromise = seedAll().finally(() => {
      seedPromise = null;
    });
  }
  await seedPromise;
}

export async function seedAll() {
  const passwordHash = await bcrypt.hash("MassarAdmin2026!", 10);

  await db.insert(admins).values({
    name: "Massar Administrator",
    email: "admin@massar-group.com",
    passwordHash,
  });

  await db.insert(siteSettings).values({
    logoUrl: "/images/logo.png",
    companyName: L(
      "Massar for Import Export and Trading",
      "مسار للاستيراد والتصدير والتجارة",
      "Massar untuk Import Eksport dan Perdagangan",
    ),
    tagline: L(
      "Premium dates and oils from Saudi Arabia and Palestine, traded into Malaysia.",
      "تمور وزيوت فاخرة من المملكة العربية السعودية وفلسطين إلى ماليزيا.",
      "Kurma dan minyak berkualiti tinggi dari Arab Saudi dan Palestin ke Malaysia.",
    ),
    phone: "+60 12-345 6789",
    email: "hello@massar-group.com",
    whatsapp: "+60123456789",
    address: L(
      "Level 12, Menara Massar, Jalan Sultan Ismail, 50250 Kuala Lumpur, Malaysia",
      "المستوى 12، منارة مسار، جالان سلطان إسماعيل، 50250 كوالالمبور، ماليزيا",
      "Tingkat 12, Menara Massar, Jalan Sultan Ismail, 50250 Kuala Lumpur, Malaysia",
    ),
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Kuala%20Lumpur%2C%20Malaysia&t=&z=12&ie=UTF8&iwloc=&output=embed",
    mapsLink: "https://maps.google.com/?q=Kuala+Lumpur,+Malaysia",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    seoTitle: L(
      "Massar | Dates & Oils Import Export Trading in Malaysia",
      "مسار | استيراد وتصدير وتجارة التمور والزيوت في ماليزيا",
      "Massar | Import Eksport Kurma & Minyak di Malaysia",
    ),
    seoDescription: L(
      "Massar imports and trades premium dates and oils from Saudi Arabia and Palestine into Malaysia. Discover our products, services, and official online stores.",
      "مسار تستورد وتتاجر في أجود التمور والزيوت من السعودية وفلسطين إلى ماليزيا. تعرّف على منتجاتنا وخدماتنا ومتاجرنا الإلكترونية.",
      "Massar mengimport dan memperdagangkan kurma serta minyak premium dari Arab Saudi dan Palestin ke Malaysia. Terokai produk, perkhidmatan dan kedai rasmi kami.",
    ),
    ogImage: "/images/hero.jpg",
    searchConsoleCode: "",
  });

  await db.insert(navItems).values([
    {
      key: "home",
      href: "#home",
      sortOrder: 1,
      label: L("Home", "الرئيسية", "Utama"),
    },
    {
      key: "about",
      href: "#about",
      sortOrder: 2,
      label: L("About us", "من نحن", "Tentang kami"),
    },
    {
      key: "services",
      href: "#services",
      sortOrder: 3,
      label: L("Our services", "خدماتنا", "Perkhidmatan kami"),
    },
    {
      key: "products",
      href: "#products",
      sortOrder: 4,
      label: L("Our products", "منتجاتنا", "Produk kami"),
    },
    {
      key: "stores",
      href: "#stores",
      sortOrder: 5,
      label: L("Shop our stores", "تسوّق من متاجرنا", "Beli di kedai kami"),
    },
    {
      key: "contact",
      href: "#contact",
      sortOrder: 6,
      label: L("Contact us", "اتصل بنا", "Hubungi kami"),
    },
  ]);

  await db.insert(siteSections).values([
    {
      key: "hero",
      sortOrder: 1,
      visible: true,
      imageUrl: "/images/hero.jpg",
      title: L(
        "The trusted path for dates and oils into Malaysia.",
        "المسار الموثوق للتمور والزيوت إلى ماليزيا.",
        "Laluan dipercayai untuk kurma dan minyak ke Malaysia.",
      ),
      subtitle: L(
        "Massar for Import Export and Trading",
        "مسار للاستيراد والتصدير والتجارة",
        "Massar untuk Import Eksport dan Perdagangan",
      ),
      content: L(
        "We specialise in importing, exporting and trading food products — with a focus on premium dates and oils sourced from Saudi Arabia and Palestine, then distributed across Malaysia.",
        "نتخصص في استيراد وتصدير وتجارة المنتجات الغذائية، مع التركيز على التمور والزيوت الفاخرة من المملكة العربية السعودية وفلسطين، ثم توزيعها في ماليزيا.",
        "Kami mengkhusus dalam import, eksport dan perdagangan produk makanan — tertumpu pada kurma dan minyak premium dari Arab Saudi dan Palestin, kemudian diedarkan di seluruh Malaysia.",
      ),
      ctaPrimary: L("Explore our products", "استكشف منتجاتنا", "Terokai produk kami"),
      ctaSecondary: L("Contact us", "تواصل معنا", "Hubungi kami"),
    },
    {
      key: "about",
      sortOrder: 2,
      visible: true,
      imageUrl: "/images/about.jpg",
      title: L("A Malaysia-based trade house for authentic food products.", "بيت تجاري في ماليزيا للمنتجات الغذائية الأصيلة.", "Rumah dagangan berpangkalan di Malaysia untuk produk makanan tulen."),
      subtitle: L("About Massar", "عن مسار", "Tentang Massar"),
      content: L(
        "Massar for Import Export and Trading is a Malaysia-based company dedicated to connecting trusted producers in Saudi Arabia and Palestine with families, retailers and food businesses across Malaysia. We move carefully selected dates, oils and complementary food products through a disciplined import, quality and distribution process.\n\nOur name, Massar, means path. That is our work: building a reliable route from origin farms and presses to Malaysian shelves, with transparency, consistency and respect for the cultures behind every product.",
        "مسار للاستيراد والتصدير والتجارة شركة مقرّها ماليزيا، تعمل على ربط المنتجين الموثوقين في المملكة العربية السعودية وفلسطين بالأسر وتجار التجزئة وشركات الأغذية في ماليزيا. ننقل تمورًا وزيوتًا ومنتجات غذائية مختارة بعناية عبر مسار منضبط للاستيراد والجودة والتوزيع.\n\nاسم مسار يعني الطريق. وهذا عملنا: بناء مسار موثوق من المزارع والمعاصر إلى رفوف ماليزيا، بشفافية واتساق واحترام للثقافات التي تقف خلف كل منتج.",
        "Massar for Import Export and Trading ialah syarikat berpangkalan di Malaysia yang menghubungkan pengeluar dipercayai di Arab Saudi dan Palestin dengan keluarga, peruncit dan perniagaan makanan di seluruh Malaysia. Kami membawa kurma, minyak dan produk makanan terpilih melalui proses import, kualiti dan pengedaran yang teratur.\n\nNama Massar bermaksud laluan. Itulah kerja kami: membina laluan yang boleh dipercayai dari ladang dan kilang penekan ke rak Malaysia, dengan ketelusan, konsistensi dan penghormatan kepada budaya di sebalik setiap produk.",
      ),
    },
    {
      key: "services",
      sortOrder: 3,
      visible: true,
      imageUrl: "/images/trade-route.jpg",
      title: L("Trade services built around food, origin and reliability.", "خدمات تجارية تُبنى حول الغذاء والمنشأ والموثوقية.", "Perkhidmatan perdagangan berteraskan makanan, asal usul dan kebolehpercayaan."),
      subtitle: L("Our services", "خدماتنا", "Perkhidmatan kami"),
      content: L(
        "From sourcing and import documentation to local distribution, Massar manages the full commercial path of premium food products into Malaysia.",
        "من التوريد ومستندات الاستيراد إلى التوزيع المحلي، تدير مسار المسار التجاري الكامل للمنتجات الغذائية الفاخرة إلى ماليزيا.",
        "Dari pencarian sumber dan dokumentasi import hingga pengedaran tempatan, Massar mengurus keseluruhan laluan komersial produk makanan premium ke Malaysia.",
      ),
    },
    {
      key: "products",
      sortOrder: 4,
      visible: true,
      imageUrl: "/images/product-ajwa.jpg",
      title: L("Dates, oils and selected foods from trusted origins.", "تمور وزيوت وأغذية مختارة من مصادر موثوقة.", "Kurma, minyak dan makanan terpilih dari sumber dipercayai."),
      subtitle: L("Our products", "منتجاتنا", "Produk kami"),
      content: L(
        "Every item we present is chosen for origin, taste and suitability for the Malaysian market. Products are shown for discovery — purchases are completed through our official marketplace stores.",
        "كل منتج نقدّمه مختار بعناية حسب المنشأ والمذاق وملاءمته للسوق الماليزية. تُعرض المنتجات للتعريف، ويتم الشراء عبر متاجرنا الرسمية على المنصات الإلكترونية.",
        "Setiap item dipilih berdasarkan asal, rasa dan kesesuaian untuk pasaran Malaysia. Produk dipaparkan untuk pengenalan — pembelian diselesaikan melalui kedai marketplace rasmi kami.",
      ),
    },
    {
      key: "why",
      sortOrder: 5,
      visible: true,
      imageUrl: null,
      title: L("Why companies and families choose Massar.", "لماذا تختار الشركات والعائلات مسار.", "Mengapa syarikat dan keluarga memilih Massar."),
      subtitle: L("Why Massar", "لماذا مسار", "Mengapa Massar"),
      content: L(
        "We combine origin relationships, careful selection and a Malaysia-first distribution mindset.",
        "نجمع بين علاقات المنشأ والاختيار الدقيق وعقلية التوزيع التي تضع ماليزيا أولًا.",
        "Kami menggabungkan hubungan di negara sumber, pemilihan teliti dan minda pengedaran yang mengutamakan Malaysia.",
      ),
    },
    {
      key: "countries",
      sortOrder: 6,
      visible: true,
      imageUrl: "/images/trade-route.jpg",
      title: L("From the Kingdom and Palestine, to Malaysia.", "من المملكة وفلسطين إلى ماليزيا.", "Dari Arab Saudi dan Palestin ke Malaysia."),
      subtitle: L("Origins & destination", "الدول والمصادر", "Asal & destinasi"),
      content: L(
        "Our trade corridor is clear: we source authentic food products from Saudi Arabia and Palestine, then bring them to Malaysian households and businesses.",
        "ممرّنا التجاري واضح: نستورد منتجات غذائية أصيلة من السعودية وفلسطين، ثم نوصلها إلى الأسر والشركات في ماليزيا.",
        "Koridor perdagangan kami jelas: kami mendapatkan produk makanan tulen dari Arab Saudi dan Palestin, kemudian membawanya kepada isi rumah dan perniagaan Malaysia.",
      ),
    },
    {
      key: "stores",
      sortOrder: 7,
      visible: true,
      imageUrl: null,
      title: L("Buy through our official marketplace stores.", "اشترِ عبر متاجرنا الرسمية على المنصات.", "Beli melalui kedai marketplace rasmi kami."),
      subtitle: L("Shop our stores", "تسوّق من متاجرنا", "Beli di kedai kami"),
      content: L(
        "This website is not an online shop. When you are ready to purchase, we direct you to Massar stores on Shopee, Lazada and TikTok Shop.",
        "هذا الموقع ليس متجرًا إلكترونيًا. عند رغبتك في الشراء نوجّهك إلى متاجر مسار على Shopee وLazada وTikTok Shop.",
        "Laman ini bukan kedai dalam talian. Apabila anda ingin membeli, kami akan membawa anda ke kedai Massar di Shopee, Lazada dan TikTok Shop.",
      ),
    },
    {
      key: "contact",
      sortOrder: 8,
      visible: true,
      imageUrl: null,
      title: L("Let’s talk about supply, distribution or a product inquiry.", "لنتحدث عن التوريد أو التوزيع أو الاستفسار عن منتج.", "Mari berbincang tentang bekalan, pengedaran atau pertanyaan produk."),
      subtitle: L("Contact us", "اتصل بنا", "Hubungi kami"),
      content: L(
        "Whether you are a retailer, a food-service partner or a household looking for authentic dates and oils, our team in Malaysia is ready to help.",
        "سواء كنت تاجر تجزئة أو شريك خدمات غذائية أو أسرة تبحث عن تمور وزيوت أصيلة، فريقنا في ماليزيا جاهز لمساعدتك.",
        "Sama ada anda peruncit, rakan perkhidmatan makanan atau isi rumah yang mencari kurma dan minyak tulen, pasukan kami di Malaysia sedia membantu.",
      ),
    },
  ]);

  await db.insert(services).values([
    {
      sortOrder: 1,
      icon: "import",
      imageUrl: "/images/trade-route.jpg",
      title: L("Import", "الاستيراد", "Import"),
      description: L(
        "We import premium food products from Saudi Arabia and Palestine into Malaysia, managing sourcing, compliance and inbound logistics.",
        "نستورد منتجات غذائية فاخرة من السعودية وفلسطين إلى ماليزيا، مع إدارة التوريد والامتثال والخدمات اللوجستية الواردة.",
        "Kami mengimport produk makanan premium dari Arab Saudi dan Palestin ke Malaysia, merangkumi pencarian sumber, pematuhan dan logistik masuk.",
      ),
    },
    {
      sortOrder: 2,
      icon: "export",
      imageUrl: "/images/trade-route.jpg",
      title: L("Export", "التصدير", "Eksport"),
      description: L(
        "We support outbound trade of selected food products and help partners reach new markets with reliable documentation.",
        "ندعم التجارة الصادرة لمنتجات غذائية مختارة ونساعد الشركاء على الوصول إلى أسواق جديدة بوثائق موثوقة.",
        "Kami menyokong perdagangan keluar produk makanan terpilih dan membantu rakan kongsi mencapai pasaran baharu dengan dokumentasi yang boleh dipercayai.",
      ),
    },
    {
      sortOrder: 3,
      icon: "trading",
      imageUrl: "/images/about.jpg",
      title: L("Trading", "التجارة", "Perdagangan"),
      description: L(
        "Massar trades dates, oils and complementary foods between trusted origin suppliers and Malaysian buyers.",
        "تتاجر مسار في التمور والزيوت والأغذية المكمّلة بين مورّدين موثوقين في بلد المنشأ والمشترين في ماليزيا.",
        "Massar memperdagangkan kurma, minyak dan makanan pelengkap antara pembekal asal yang dipercayai dan pembeli Malaysia.",
      ),
    },
    {
      sortOrder: 4,
      icon: "supply",
      imageUrl: "/images/service-distribution.jpg",
      title: L("Food products supply", "توريد المنتجات الغذائية", "Bekalan produk makanan"),
      description: L(
        "We supply retailers, distributors and hospitality partners with consistent lots of selected food products.",
        "نزوّد تجار التجزئة والموزعين وشركاء الضيافة بكميات منتظمة من المنتجات الغذائية المختارة.",
        "Kami membekalkan peruncit, pengedar dan rakan hospitaliti dengan lot produk makanan terpilih secara konsisten.",
      ),
    },
    {
      sortOrder: 5,
      icon: "dates",
      imageUrl: "/images/product-ajwa.jpg",
      title: L("Date products", "منتجات التمور", "Produk kurma"),
      description: L(
        "Ajwa, Medjool and other premium date varieties sourced with attention to origin, grade and freshness.",
        "عجوة ومجدول وأنواع تمور فاخرة أخرى تُختار بعناية حسب المنشأ والدرجة والطزاجة.",
        "Ajwa, Medjool dan varieti kurma premium lain dipilih dengan perhatian kepada asal, gred dan kesegaran.",
      ),
    },
    {
      sortOrder: 6,
      icon: "oils",
      imageUrl: "/images/product-olive-oil.jpg",
      title: L("Oil products", "منتجات الزيوت", "Produk minyak"),
      description: L(
        "Olive oil, date-seed oil and selected cooking oils imported for quality-conscious Malaysian customers.",
        "زيت الزيتون وزيت نوى التمر وزيوت طهي مختارة تُستورد لعملاء ماليزيا الباحثين عن الجودة.",
        "Minyak zaitun, minyak biji kurma dan minyak masak terpilih diimport untuk pelanggan Malaysia yang mementingkan kualiti.",
      ),
    },
    {
      sortOrder: 7,
      icon: "distribution",
      imageUrl: "/images/service-distribution.jpg",
      title: L("Distribution in Malaysia", "التوزيع داخل ماليزيا", "Pengedaran di Malaysia"),
      description: L(
        "We sell and distribute products across Malaysia through wholesale partners and official marketplace stores.",
        "نبيع ونوزّع المنتجات في ماليزيا عبر شركاء الجملة ومتاجرنا الرسمية على المنصات الإلكترونية.",
        "Kami menjual dan mengedar produk di seluruh Malaysia melalui rakan borong dan kedai marketplace rasmi.",
      ),
    },
  ]);

  await db.insert(products).values([
    {
      slug: "ajwa-dates",
      sortOrder: 1,
      category: "dates",
      originCountry: "Saudi Arabia",
      productStatus: "both",
      imageUrl: "/images/product-ajwa.jpg",
      name: L("Ajwa Dates", "تمر العجوة", "Kurma Ajwa"),
      description: L(
        "Soft, dark Ajwa dates associated with Al-Madinah. Selected for aroma, texture and authentic Saudi origin, then imported for Malaysian households and retailers.",
        "تمر عجوة داكن وناعم يُنسب إلى المدينة المنورة. مختار لعطره وقوامه ومنشئه السعودي الأصيل، ثم يُستورد للأسر وتجار التجزئة في ماليزيا.",
        "Kurma Ajwa yang lembut dan gelap dikaitkan dengan Al-Madinah. Dipilih kerana aroma, tekstur dan asal Saudi yang tulen, kemudian diimport untuk isi rumah dan peruncit Malaysia.",
      ),
    },
    {
      slug: "medjool-dates",
      sortOrder: 2,
      category: "dates",
      originCountry: "Saudi Arabia",
      productStatus: "both",
      imageUrl: "/images/product-medjool.jpg",
      name: L("Medjool Dates", "تمر المجدول", "Kurma Medjool"),
      description: L(
        "Large, caramel-sweet Medjool dates. A flagship table date for gifting, hospitality and everyday premium snacking.",
        "تمر مجدول كبير بحلاوة كراميلية. تمر المائدة الأول للإهداء والضيافة والوجبات الخفيفة الفاخرة اليومية.",
        "Kurma Medjool yang besar dan manis seperti karamel. Kurma hidangan unggul untuk hadiah, hospitaliti dan snek premium harian.",
      ),
    },
    {
      slug: "palestinian-dates",
      sortOrder: 3,
      category: "dates",
      originCountry: "Palestine",
      productStatus: "both",
      imageUrl: "/images/product-palestine-dates.jpg",
      name: L("Palestinian Dates", "التمور الفلسطينية", "Kurma Palestin"),
      description: L(
        "Sun-ripened dates from Palestinian groves, chosen for their distinctive character and the story of the land they come from.",
        "تمور نضجت تحت الشمس من بساتين فلسطينية، مختارة لطابعها المميز ولحكاية الأرض التي جاءت منها.",
        "Kurma masak matahari dari kebun Palestin, dipilih kerana wataknya yang tersendiri dan kisah tanah asalnya.",
      ),
    },
    {
      slug: "sukkari-dates",
      sortOrder: 4,
      category: "dates",
      originCountry: "Saudi Arabia",
      productStatus: "imported",
      imageUrl: "/images/product-medjool.jpg",
      name: L("Sukkari Dates", "تمر السكري", "Kurma Sukkari"),
      description: L(
        "Golden Sukkari dates known for their natural sweetness and melt-in-the-mouth texture. Imported in carefully graded lots.",
        "تمر سكري ذهبي يُعرف بحلاوته الطبيعية وقوامه الذي يذوب في الفم. يُستورد على دفعات مُصنَّفة بعناية.",
        "Kurma Sukkari keemasan dikenali kerana kemanisan semula jadi dan tekstur yang cair di mulut. Diimport dalam lot bergred teliti.",
      ),
    },
    {
      slug: "extra-virgin-olive-oil",
      sortOrder: 5,
      category: "oils",
      originCountry: "Palestine",
      productStatus: "both",
      imageUrl: "/images/product-olive-oil.jpg",
      name: L("Extra Virgin Olive Oil", "زيت زيتون بكر ممتاز", "Minyak Zaitun Extra Virgin"),
      description: L(
        "Cold-pressed extra virgin olive oil from Palestinian groves. Bright, peppery and suited to both everyday cooking and finishing.",
        "زيت زيتون بكر ممتاز معصور على البارد من بساتين فلسطين. نكهة مشرقة وفلفلية تناسب الطبخ اليومي والإضافة النهائية.",
        "Minyak zaitun extra virgin tuangan sejuk dari kebun Palestin. Cerah, pedas lembut dan sesuai untuk masakan harian serta sentuhan akhir.",
      ),
    },
    {
      slug: "date-seed-oil",
      sortOrder: 6,
      category: "oils",
      originCountry: "Saudi Arabia",
      productStatus: "sold",
      imageUrl: "/images/product-date-oil.jpg",
      name: L("Date Seed Oil", "زيت نوى التمر", "Minyak Biji Kurma"),
      description: L(
        "A refined oil pressed from date seeds, valued for culinary and specialty uses. Distributed to selected partners in Malaysia.",
        "زيت مكرّر يُستخرج من نوى التمر، ويُقدَّر في الاستخدامات الغذائية والتخصصية. يُوزَّع على شركاء مختارين في ماليزيا.",
        "Minyak tertapis yang diperah daripada biji kurma, dihargai untuk kegunaan kulinari dan khusus. Diedarkan kepada rakan terpilih di Malaysia.",
      ),
    },
  ]);

  await db.insert(stores).values([
    {
      platform: "shopee",
      sortOrder: 1,
      enabled: true,
      url: "https://shopee.com.my",
      label: L("Shopee", "شوبي", "Shopee"),
    },
    {
      platform: "lazada",
      sortOrder: 2,
      enabled: true,
      url: "https://www.lazada.com.my",
      label: L("Lazada", "لازادا", "Lazada"),
    },
    {
      platform: "tiktok",
      sortOrder: 3,
      enabled: true,
      url: "https://www.tiktok.com/shop",
      label: L("TikTok Shop", "تيك توك شوب", "TikTok Shop"),
    },
  ]);

  await db.insert(highlights).values([
    {
      sortOrder: 1,
      icon: "origin",
      title: L("Authentic origin", "منشأ أصيل", "Asal yang tulen"),
      description: L(
        "We source directly from Saudi Arabia and Palestine, keeping the story of the land attached to every shipment.",
        "نستورد مباشرة من السعودية وفلسطين، ونحافظ على حكاية الأرض مع كل شحنة.",
        "Kami mendapatkan sumber terus dari Arab Saudi dan Palestin, mengekalkan kisah tanah itu pada setiap penghantaran.",
      ),
    },
    {
      sortOrder: 2,
      icon: "quality",
      title: L("Careful selection", "اختيار دقيق", "Pemilihan teliti"),
      description: L(
        "Lots are reviewed for grade, moisture, aroma and presentation before they enter our Malaysian catalogue.",
        "تُراجع الدفعات من حيث الدرجة والرطوبة والرائحة والعرض قبل دخولها كتالوجنا في ماليزيا.",
        "Lot disemak dari segi gred, kelembapan, aroma dan persembahan sebelum masuk ke katalog Malaysia kami.",
      ),
    },
    {
      sortOrder: 3,
      icon: "route",
      title: L("A clear trade path", "مسار تجاري واضح", "Laluan dagangan yang jelas"),
      description: L(
        "Import, documentation and inbound handling are managed as one path — fewer surprises, more consistency.",
        "الاستيراد والوثائق والمناولة الواردة تُدار كمسار واحد: مفاجآت أقل واتساق أكبر.",
        "Import, dokumentasi dan pengendalian masuk diurus sebagai satu laluan — lebih kurang kejutan, lebih konsisten.",
      ),
    },
    {
      sortOrder: 4,
      icon: "malaysia",
      title: L("Malaysia-wide reach", "انتشار في ماليزيا", "Liputan seluruh Malaysia"),
      description: L(
        "We sell and distribute inside Malaysia through wholesale relationships and official marketplace stores.",
        "نبيع ونوزّع داخل ماليزيا عبر علاقات الجملة ومتاجرنا الرسمية على المنصات.",
        "Kami menjual dan mengedar di dalam Malaysia melalui rakan borong dan kedai marketplace rasmi.",
      ),
    },
    {
      sortOrder: 5,
      icon: "food",
      title: L("Food-first expertise", "خبرة غذائية أولًا", "Kepakaran berteraskan makanan"),
      description: L(
        "Dates and oils are not a side line. They are the centre of our trade, so the details receive proper attention.",
        "التمور والزيوت ليست نشاطًا جانبيًا. هي محور تجارتنا، لذلك تحظى التفاصيل بالاهتمام اللازم.",
        "Kurma dan minyak bukan sideline. Ia pusat perdagangan kami, jadi butiran diberi perhatian sewajarnya.",
      ),
    },
    {
      sortOrder: 6,
      icon: "trust",
      title: L("A partner you can brief once", "شريك تُبلغه مرة واحدة", "Rakan yang cukup dimaklum sekali"),
      description: L(
        "Retailers and food businesses work with a single counterpart for origin, quality notes and restocking.",
        "يعمل تجار التجزئة وشركات الأغذية مع جهة واحدة للمنشأ وملاحظات الجودة وإعادة التوريد.",
        "Peruncit dan perniagaan makanan berurusan dengan satu rakan untuk asal, nota kualiti dan stok semula.",
      ),
    },
  ]);

  await db.insert(countries).values([
    {
      sortOrder: 1,
      role: "source",
      code: "SA",
      name: L("Saudi Arabia", "المملكة العربية السعودية", "Arab Saudi"),
      description: L(
        "Home of Ajwa, Sukkari and other celebrated date varieties, plus specialty oils from the Kingdom.",
        "موطن العجوة والسكري وأنواع التمور الشهيرة، إضافة إلى زيوت متخصصة من المملكة.",
        "Tanah air Ajwa, Sukkari dan varieti kurma terkenal, serta minyak khusus dari Kingdom.",
      ),
    },
    {
      sortOrder: 2,
      role: "source",
      code: "PS",
      name: L("Palestine", "فلسطين", "Palestin"),
      description: L(
        "Palestinian dates and olive oil, selected for character, heritage and the integrity of the grove.",
        "تمور فلسطينية وزيت زيتون مختار لطابعه وإرثه ونزاهة البستان.",
        "Kurma dan minyak zaitun Palestin, dipilih kerana watak, warisan dan integriti kebun.",
      ),
    },
    {
      sortOrder: 3,
      role: "destination",
      code: "MY",
      name: L("Malaysia", "ماليزيا", "Malaysia"),
      description: L(
        "Our home market. Products are sold and distributed to households, retailers and food partners across Malaysia.",
        "سوقنا المحلي. تُباع المنتجات وتُوزَّع على الأسر وتجار التجزئة وشركاء الأغذية في أنحاء ماليزيا.",
        "Pasaran asal kami. Produk dijual dan diedarkan kepada isi rumah, peruncit dan rakan makanan di seluruh Malaysia.",
      ),
    },
  ]);
}
