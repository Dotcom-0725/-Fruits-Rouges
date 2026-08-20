import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLang } from "./context/LangContext";

/* ═══════════════════════════════════════════════════════════════════════════
   FRUITS ROUGES AHLAN — TANGER
   Données vérifiées : Google Business Profile (4.1★ · 38 avis · 50–100 MAD),
   Instagram @cremerie_fruits_rouges, Facebook Crémerie Fruits Rouges.
   Toute la configuration (menu, galerie, avis) est éditable ici, sans toucher
   aux composants ci-dessous. Chaque texte visible est bilingue { fr, ar }.
═══════════════════════════════════════════════════════════════════════════ */

const IMG = {
  hero: "/images/hero.webp",
  interior: "/images/interior.webp",
  juices: "/images/juices.webp",
  smoothieBowl: "/images/smoothie-bowl.webp",
  pancakes: "/images/pancakes.webp",
  baghrir: "/images/baghrir.webp",
  fruitSalad: "/images/fruit-salad.webp",
  counter: "/images/counter.webp",
  coffee: "/images/coffee.webp",
  tangier: "/images/tangier.webp",
};

const SITE = {
  name: "Fruits Rouges ahlan",
  brand: "Crèmerie Fruits Rouges",
  tagline: { fr: "Une expérience fraîche et gourmande à Tanger.", ar: "تجربة منعشة ولذيذة في طنجة." },
  city: "Tanger, Maroc",
  plusCode: "P5W8+25G",
  address: { fr: "P5W8+25G, Route Arabie Saoudite, Tanger, Maroc", ar: "P5W8+25G، طريق العربية السعودية، طنجة، المغرب" },
  phoneDisplay: "+212 6 17 67 58 56",
  phoneHref: "tel:+212617675856",
  whatsappHref: "https://wa.me/212617675856",
  mapsUrl: "https://maps.app.goo.gl/3VGwq5zPXGZEjzde8",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=35.7450616,-5.8345694",
  mapEmbed: "https://maps.google.com/maps?q=35.7450616,-5.8345694&z=16&hl=fr&output=embed",
  instagramUrl: "https://www.instagram.com/cremerie_fruits_rouges/",
  rating: 4.1,
  reviewCount: 38,
  priceRange: "50–100 MAD",
  coords: { lat: 35.7450616, lng: -5.8345694 },
};

const NAV_LINKS = [
  { id: "accueil", label: { fr: "Accueil", ar: "الرئيسية" } },
  { id: "apropos", label: { fr: "À propos", ar: "من نحن" } },
  { id: "menu", label: { fr: "Menu", ar: "القائمة" } },
  { id: "galerie", label: { fr: "Galerie", ar: "المعرض" } },
  { id: "avis", label: { fr: "Avis", ar: "التقييمات" } },
  { id: "contact", label: { fr: "Contact", ar: "اتصل بنا" } },
];

/* ── Menu : éditable librement (name / description / tag / price / image) ── */
const MENU_CATEGORIES = [
  {
    id: "jus",
    label: { fr: "Jus & Smoothies", ar: "عصائر وسموذي" },
    note: { fr: "Pressés et mixés à la minute", ar: "تُعصر وتُخلط في اللحظة" },
    items: [
      {
        name: { fr: "Jus frais du jour", ar: "عصير طازج اليوم" },
        desc: { fr: "Orange, avocat, fraise, panaché… pressés à la minute.", ar: "برتقال، أفوكادو، فراولة، مشكّل… يُعصر في اللحظة." },
        tag: { fr: "100% fruits", ar: "100% فواكه" },
      },
      {
        name: { fr: "Cocktail de fruits", ar: "كوكتيل الفواكه" },
        desc: { fr: "Le mélange signature de la maison, mixé minute.", ar: "مزيج المحل المميز، يُحضّر في اللحظة." },
      },
      {
        name: { fr: "Smoothies onctueux", ar: "سموذي كريمي" },
        desc: { fr: "Fruits rouges, mangue, banane… selon la saison.", ar: "فواكه حمراء، مانجو، موز… حسب الموسم." },
        tag: { fr: "Frais", ar: "طازج" },
      },
    ],
  },
  {
    id: "petitdej",
    label: { fr: "Petit-déjeuner", ar: "الفطور" },
    note: { fr: "Chaque matin, dès l'ouverture", ar: "كل صباح، منذ الافتتاح" },
    items: [
      {
        name: { fr: "Formule petit-déjeuner", ar: "فورمولا الفطور" },
        desc: { fr: "Pancakes, bol de fruits de saison, fruits secs, fruit frais et jus.", ar: "بان كيك، طبق فواكه الموسم، فواكه مجففة، فاكهة طازجة وعصير." },
        tag: { fr: "Formule", ar: "فورمولا" },
      },
      {
        name: { fr: "Pancakes à la Nutella", ar: "بان كيك بالنوتيلا" },
        desc: { fr: "Moelleux et généreux, garnis de fruits frais.", ar: "طري وسخي، مزين بفواكه طازجة." },
      },
      {
        name: { fr: "Baghrir, miel & amlou", ar: "بغرير، عسل وأمّلو" },
        desc: { fr: "Le classique marocain de la maison.", ar: "الكلاسيكية المغربية للمحل." },
      },
      {
        name: { fr: "Khlii & œufs brouillés", ar: "خليع وبيض مخفوق" },
        desc: { fr: "Saveur traditionnelle, assiette copieuse.", ar: "نكهة تقليدية، طبق دسم." },
      },
    ],
  },
  {
    id: "fraicheur",
    label: { fr: "Salades & Fraîcheur", ar: "سلطات وطزاجة" },
    note: { fr: "Fruits et légumes de saison", ar: "فواكه وخضروات الموسم" },
    items: [
      {
        name: { fr: "Salade de fruits frais", ar: "سلطة فواكه طازجة" },
        desc: { fr: "Fruits de saison coupés minute.", ar: "فواكه الموسم مقطعة في اللحظة." },
        tag: { fr: "Végétarien", ar: "نباتي" },
      },
      {
        name: { fr: "Bol de fruits de saison", ar: "طبق فواكه الموسم" },
        desc: { fr: "Généreux, coloré, rafraîchissant.", ar: "سخي، ملوّن، منعش." },
      },
      {
        name: { fr: "Salade César au poulet", ar: "سلطة سيزار بالدجاج" },
        desc: { fr: "La version gourmande de la maison.", ar: "النسخة الشهية الخاصة بالمحل." },
      },
    ],
  },
  {
    id: "plats",
    label: { fr: "Déjeuner & Plats", ar: "الغداء والأطباق" },
    note: { fr: "Préparés chaque jour avec des produits frais", ar: "تُحضّر يومياً بمنتجات طازجة" },
    items: [
      { name: { fr: "Émincé de poulet", ar: "دجاج مشرّح" }, desc: { fr: "Préparé avec soin, servi chaud.", ar: "يُحضّر بعناية، يُقدّم ساخناً." } },
      { name: { fr: "Pâtes bolognaise", ar: "معكرونة بولونيز" }, desc: { fr: "Généreuses et réconfortantes.", ar: "سخية ومريحة." } },
      { name: { fr: "Tacos poulet", ar: "تاكوس بالدجاج" }, desc: { fr: "Le rendez-vous des gourmands.", ar: "موعد محبي الأكل الشهي." } },
      { name: { fr: "Pizza poulet", ar: "بيتزا بالدجاج" }, desc: { fr: "Fine et garnie.", ar: "رقيقة ومحشوة." } },
      { name: { fr: "Croque dinde-fromage", ar: "كروك ديك رومي وجبن" }, desc: { fr: "Doré, fondant, rapide.", ar: "ذهبي، ذائب، سريع." } },
      { name: { fr: "Mixed grill", ar: "مشاوي مشكّلة" }, desc: { fr: "Pour les grandes faims.", ar: "للجوع الكبير." } },
    ],
  },
];

/* ── Galerie : photos d'illustration en attendant le shooting officiel ── */
const GALLERY_ITEMS = [
  { src: IMG.juices, alt: { fr: "Deux jus frais pressés à la minute sur un comptoir", ar: "عصيران طازجان مُعصوران في اللحظة على منضدة" }, cat: "boissons", caption: { fr: "Jus pressés minute", ar: "عصائر معصورة في اللحظة" } },
  { src: IMG.smoothieBowl, alt: { fr: "Bowl de smoothie aux fruits rouges, granola et menthe", ar: "طبق سموذي بالفواكه الحمراء والغرانولا والنعناع" }, cat: "fruits", caption: { fr: "Bowl fruits rouges & granola", ar: "طبق الفواكه الحمراء والغرانولا" } },
  { src: IMG.counter, alt: { fr: "Cagettes de fraises, framboises, cerises et oranges", ar: "صناديق فراولة وتوت وكرز وبرتقال" }, cat: "fruits", caption: { fr: "Fruits choisis avec soin", ar: "فواكه مختارة بعناية" } },
  { src: IMG.fruitSalad, alt: { fr: "Salade de fruits frais colorée en bol de verre", ar: "سلطة فواكه طازجة ملونة في طبق زجاجي" }, cat: "fruits", caption: { fr: "Salade de fruits de saison", ar: "سلطة فواكه الموسم" } },
  { src: IMG.pancakes, alt: { fr: "Pancakes nappés de chocolat et fruits frais", ar: "بان كيك مغطى بالشوكولاطة وفواكه طازجة" }, cat: "petitdej", caption: { fr: "Pancakes & fruits frais", ar: "بان كيك وفواكه طازجة" } },
  { src: IMG.baghrir, alt: { fr: "Baghrir marocain au miel et amlou, thé à la menthe", ar: "بغرير مغربي بالعسل والأمّلو مع أتاي بالنعناع" }, cat: "petitdej", caption: { fr: "Baghrir, miel & amlou", ar: "بغرير، عسل وأمّلو" } },
  { src: IMG.coffee, alt: { fr: "Cappuccino, jus d'orange et fraises fraîches", ar: "كابتشينو، عصير برتقال وفراولة طازجة" }, cat: "boissons", caption: { fr: "Le rituel du matin", ar: "طقس الصباح" } },
  { src: IMG.interior, alt: { fr: "Intérieur lumineux d'une crèmerie avec comptoir de fruits", ar: "داخل مضيء لكريمري مع منضدة فواكه" }, cat: "ambiance", caption: { fr: "L'espace de la maison", ar: "فضاء المحل" } },
  { src: IMG.tangier, alt: { fr: "Tanger au coucher du soleil, terrasses et médina blanche", ar: "طنجة عند الغروب، تراسات ومدينة بيضاء" }, cat: "ambiance", caption: { fr: "Tanger, notre ville", ar: "طنجة، مدينتنا" } },
];

const GALLERY_FILTERS = [
  { id: "tout", label: { fr: "Tout", ar: "الكل" } },
  { id: "fruits", label: { fr: "Fruits", ar: "فواكه" } },
  { id: "boissons", label: { fr: "Boissons", ar: "مشروبات" } },
  { id: "petitdej", label: { fr: "Petit-déjeuner", ar: "الفطور" } },
  { id: "ambiance", label: { fr: "Ambiance", ar: "الأجواء" } },
];

/* ── Avis réels publiés en ligne (Crémerie Fruits Rouges, Tanger) — non traduits, cités tels quels ── */
const REVIEWS = [
  {
    author: "Fatima Zahrae B.",
    text: "Their smoothies and fresh juices are a daily treat for me, always vibrant and full of flavor. Breakfast here is one of my favorites in Tangier.",
    stars: 5,
  },
  {
    author: "Sonia H.",
    text: "The best place I ever visited in Tangier… we tried pasta and pizza and that was super delicious. Thanks for making my last day in Morocco unforgettable.",
    stars: 5,
  },
  {
    author: "Aya D.",
    text: "My new favorite place, I really enjoyed my food here, also the service is so good. 10/10.",
    stars: 5,
  },
];

const SERVICES = [
  { fr: "Sur place", ar: "في المكان" },
  { fr: "À emporter", ar: "للطلب الخارجي" },
  { fr: "Livraison", ar: "التوصيل" },
  { fr: "Petit-déjeuner", ar: "الفطور" },
  { fr: "Déjeuner", ar: "الغداء" },
  { fr: "Café", ar: "قهوة" },
  { fr: "Options végétariennes", ar: "خيارات نباتية" },
  { fr: "Idéal familles", ar: "مناسب للعائلات" },
  { fr: "Paiement par carte", ar: "الدفع بالبطاقة" },
];

const FONT_URLS = [
  "https://cdn.jsdelivr.net/fontsource/css/fraunces@latest/latin-400-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/fraunces@latest/latin-500-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/fraunces@latest/latin-600-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/fraunces@latest/latin-700-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/fraunces@latest/latin-400-italic.css",
  "https://cdn.jsdelivr.net/fontsource/css/outfit@latest/latin-300-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/outfit@latest/latin-400-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/outfit@latest/latin-500-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/outfit@latest/latin-600-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/outfit@latest/latin-700-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/cairo@latest/arabic-400-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/cairo@latest/arabic-500-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/cairo@latest/arabic-600-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/cairo@latest/arabic-700-normal.css",
  "https://cdn.jsdelivr.net/fontsource/css/cairo@latest/arabic-800-normal.css",
];

/* ═══════════════════════ ICONS (SVG inline) ═══════════════════════ */

const Svg = ({ children, className = "w-5 h-5", filled = false }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);
const IconPhone = (p) => (<Svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Svg>);
const IconPin = (p) => (<Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></Svg>);
const IconNav = (p) => (<Svg {...p}><path d="M3 11l19-9-9 19-2-8-8-2z"/></Svg>);
const IconStar = (p) => (<Svg filled {...p}><path d="M12 2l2.92 6.62 7.08.61-5.37 4.72 1.58 6.94L12 17.27l-6.21 3.62 1.58-6.94L2 9.23l7.08-.61z"/></Svg>);
const IconClock = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></Svg>);
const IconArrowUpRight = (p) => (<Svg {...p}><path d="M7 17L17 7"/><path d="M7 7h10v10"/></Svg>);
const IconArrowDown = (p) => (<Svg {...p}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></Svg>);
const IconX = (p) => (<Svg {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Svg>);
const IconChevronL = (p) => (<Svg {...p}><path d="m15 18-6-6 6-6"/></Svg>);
const IconChevronR = (p) => (<Svg {...p}><path d="m9 18 6-6-6-6"/></Svg>);
const IconBurger = (p) => (<Svg {...p}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></Svg>);
const IconLeaf = (p) => (<Svg {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></Svg>);
const IconCheck = (p) => (<Svg {...p}><path d="M20 6 9 17l-5-5"/></Svg>);
const IconInstagram = (p) => (<Svg {...p}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></Svg>);
const IconGlobe = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></Svg>);
const IconWhatsApp = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

/* ═══════════════════════ HELPERS UI ═══════════════════════ */

const EASE = [0.22, 1, 0.36, 1];

const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.8, delay, ease: EASE }}>
    {children}
  </motion.div>
);

const SectionHead = ({ overline, title, sub, align = "center" }) => {
  const { t } = useLang();
  return (
    <Reveal className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase font-semibold text-[#8E2A3C] mb-4 flex items-center gap-3 justify-center">
        <span className="inline-block w-8 h-px bg-[#8E2A3C]/50" aria-hidden="true"></span>
        {t(overline)}
        <span className="inline-block w-8 h-px bg-[#8E2A3C]/50" aria-hidden="true"></span>
      </p>
      <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#241A1D] leading-[1.05] tracking-tight">{t(title)}</h2>
      {sub && <p className="mt-5 text-[#5C5154] text-base sm:text-lg font-light leading-relaxed">{t(sub)}</p>}
    </Reveal>
  );
};

const Stars = ({ value, size = "w-4 h-4" }) => (
  <span className="relative inline-flex" role="img" aria-label={`${value} / 5`}>
    <span className="flex gap-0.5 text-[#E4D8C8]">{[0,1,2,3,4].map((i) => <IconStar key={i} className={size}/>)}</span>
    <span className="absolute inset-0 overflow-hidden flex gap-0.5 text-[#C98A2D]" style={{ width: `${(value / 5) * 100}%` }}>
      {[0,1,2,3,4].map((i) => <IconStar key={i} className={`${size} shrink-0`}/>)}
    </span>
  </span>
);

const LangToggle = ({ className = "" }) => {
  const { lang, toggleLang } = useLang();
  return (
    <button onClick={toggleLang} aria-label="Switch language / تبديل اللغة"
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all duration-300 ${className}`}>
      <IconGlobe className="w-3.5 h-3.5" />
      {lang === "fr" ? "العربية" : "Français"}
    </button>
  );
};

/* ═══════════════════════ HEADER ═══════════════════════ */

const Header = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#FAF6EF]/95 backdrop-blur-md shadow-[0_1px_0_rgba(36,26,29,0.08),0_10px_30px_-18px_rgba(36,26,29,0.25)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
          <a href="#accueil" className="flex items-center" aria-label="Fruits Rouges ahlan">
            <img src="/logo.png" alt="Fruits Rouges ahlan" className={`h-11 sm:h-14 w-auto rounded-lg bg-white p-1 shadow-sm transition-all duration-500 ${scrolled ? "" : "shadow-md"}`} />
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`} className={`text-[13px] font-medium tracking-wide transition-colors hover:text-[#C6405A] ${scrolled ? "text-[#4A3F42]" : "text-[#FAF6EF]/90"}`}>
                {t(link.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LangToggle className={`hidden sm:inline-flex border ${scrolled ? "border-[#D9C9B4] text-[#4A3F42] hover:border-[#8E2A3C]/50" : "border-white/25 text-[#FAF6EF] hover:border-white/50"}`} />
            <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${scrolled ? "bg-[#8E2A3C] text-[#FAF6EF] hover:bg-[#7A1F30]" : "bg-[#FAF6EF] text-[#241A1D] hover:bg-white"}`}>
              <IconPin className="w-4 h-4" /> {t({ fr: "Nous trouver", ar: "موقعنا" })}
            </a>
            <button onClick={() => setOpen(true)} aria-label="Menu" aria-expanded={open}
              className={`lg:hidden p-2 rounded-full transition-colors ${scrolled ? "text-[#241A1D]" : "text-[#FAF6EF]"}`}>
              <IconBurger className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] bg-[#241A1D] flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <div className="flex items-center justify-between px-5 h-16">
              <img src="/logo.png" alt="Fruits Rouges ahlan" className="h-11 w-auto rounded-lg bg-white p-1" />
              <div className="flex items-center gap-2">
                <LangToggle className="border border-white/20 text-[#FAF6EF]" />
                <button onClick={() => setOpen(false)} aria-label={t({ fr: "Fermer le menu", ar: "إغلاق القائمة" })} className="p-2 text-[#FAF6EF]"><IconX className="w-6 h-6" /></button>
              </div>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1" aria-label="Navigation">
              {NAV_LINKS.map((link, idx) => (
                <motion.a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + idx * 0.06, duration: 0.5, ease: EASE }}
                  className="font-display text-4xl font-medium text-[#FAF6EF] py-3 border-b border-white/5 hover:text-[#C6405A] transition-colors">
                  {t(link.label)}
                </motion.a>
              ))}
            </nav>
            <div className="px-8 pb-10 flex flex-col gap-3">
              <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 bg-[#8E2A3C] text-[#FAF6EF] rounded-full py-3.5 font-semibold text-sm"><IconPhone className="w-4 h-4" /> {SITE.phoneDisplay}</a>
              <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-white/20 text-[#FAF6EF] rounded-full py-3.5 font-semibold text-sm"><IconNav className="w-4 h-4" /> {t({ fr: "Itinéraire", ar: "الاتجاهات" })}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ═══════════════════════ HERO ═══════════════════════ */

const Hero = () => {
  const { t } = useLang();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="accueil" ref={heroRef} className="relative min-h-[100svh] flex items-end overflow-hidden" aria-label="Fruits Rouges ahlan">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <motion.img src={IMG.hero} alt={t({ fr: "Composition de fruits rouges frais, smoothie et bowl gourmand", ar: "تشكيلة من الفواكه الحمراء الطازجة، سموذي وطبق شهي" })}
          className="w-full h-full object-cover" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: EASE }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E12]/90 via-[#1A0E12]/35 to-[#1A0E12]/20" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0E12]/55 via-transparent to-transparent" aria-hidden="true"></div>
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pb-24 sm:pb-28 pt-32">
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
          className="text-[#F3D9C4] text-[11px] sm:text-xs tracking-[0.4em] uppercase font-semibold mb-5">
          {t({ fr: "Crèmerie · Jus frais · Petit-déjeuner — Tanger", ar: "كريمري · عصائر طازجة · فطور — طنجة" })}
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
          className="font-display text-[#FAF6EF] font-semibold tracking-tight leading-[0.98] text-5xl sm:text-7xl lg:text-8xl max-w-4xl">
          Fruits Rouges <span className="italic font-medium text-[#E8A0AE]">ahlan</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
          className="mt-6 text-[#F5EBE2]/90 text-lg sm:text-xl font-light max-w-xl leading-relaxed">
          {t(SITE.tagline)}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
          className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-[#FAF6EF] text-xs font-medium">
            <Stars value={SITE.rating} size="w-3.5 h-3.5" /> {SITE.rating.toFixed(1)} · {SITE.reviewCount} {t({ fr: "avis Google", ar: "تقييم من جوجل" })}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-[#FAF6EF] text-xs font-medium">
            <IconLeaf className="w-3.5 h-3.5 text-[#9DBB8A]" /> {SITE.priceRange} / {t({ fr: "personne", ar: "شخص" })}
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
          className="mt-9 flex flex-wrap gap-3">
          <a href="#menu" className="group inline-flex items-center gap-2.5 bg-[#8E2A3C] hover:bg-[#A63446] text-[#FAF6EF] rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#8E2A3C]/30">
            {t({ fr: "Voir le menu", ar: "شاهد القائمة" })} <IconArrowDown className="w-4 h-4 rotate-[-90deg] rtl:rotate-90 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#FAF6EF] hover:bg-white text-[#241A1D] rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5">
            <IconPin className="w-4 h-4" /> {t({ fr: "Nous trouver", ar: "موقعنا" })}
          </a>
          <a href={SITE.phoneHref} className="inline-flex items-center gap-2.5 border border-white/30 hover:border-white/60 text-[#FAF6EF] rounded-full px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5">
            <IconPhone className="w-4 h-4" /> {t({ fr: "Appeler", ar: "اتصل" })}
          </a>
          <a href="#apropos" className="inline-flex items-center gap-2.5 text-[#FAF6EF]/85 hover:text-white px-4 py-3.5 text-sm font-medium transition-colors">
            {t({ fr: "Découvrir", ar: "اكتشف" })} <IconArrowDown className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>

      <motion.a href="#apropos" aria-label={t({ fr: "Faire défiler vers la section À propos", ar: "التمرير إلى قسم من نحن" })} style={{ opacity: contentOpacity }}
        className="absolute bottom-6 right-6 sm:right-10 rtl:right-auto rtl:left-6 rtl:sm:left-10 z-10 text-[#FAF6EF]/70 hover:text-white transition-colors">
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="block">
          <IconArrowDown className="w-5 h-5" />
        </motion.span>
      </motion.a>
    </section>
  );
};

/* ═══════════════════════ MARQUEE ═══════════════════════ */

const Marquee = () => {
  const { t } = useLang();
  const words = [
    { fr: "Jus pressés minute", ar: "عصائر معصورة في اللحظة" },
    { fr: "Smoothies", ar: "سموذي" },
    { fr: "Petit-déjeuner", ar: "فطور" },
    { fr: "Déjeuner", ar: "غداء" },
    { fr: "Fruits de saison", ar: "فواكه الموسم" },
    { fr: "Tanger — Maroc", ar: "طنجة — المغرب" },
  ];
  const row = [...words, ...words];
  return (
    <div className="bg-[#241A1D] py-4 overflow-hidden" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {row.map((word, idx) => (
          <span key={idx} className="flex items-center gap-6 mx-6 text-[#E8D9C6] text-sm font-light tracking-[0.2em] uppercase">
            {t(word)}
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6405A] inline-block"></span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════ ABOUT ═══════════════════════ */

const About = () => {
  const { t } = useLang();
  return (
    <section id="apropos" className="py-24 sm:py-32 bg-[#FAF6EF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] rounded-tl-[6rem] rtl:rounded-tl-[2rem] rtl:rounded-tr-[6rem]">
              <motion.img src={IMG.interior} alt={t({ fr: "Intérieur lumineux d'une crèmerie à Tanger, comptoir de fruits frais", ar: "داخل مضيء لكريمري في طنجة، منضدة فواكه طازجة" })}
                loading="lazy" decoding="async" className="w-full h-[420px] sm:h-[540px] object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.05]" />
            </div>
            <div className="absolute -bottom-8 -right-3 sm:-right-8 rtl:right-auto rtl:-left-3 rtl:sm:-left-8 bg-[#FAF6EF] rounded-2xl shadow-xl shadow-[#241A1D]/10 border border-[#EBDFCF] px-6 py-5">
              <p className="font-display text-3xl font-semibold text-[#8E2A3C]">{SITE.rating.toFixed(1)}</p>
              <Stars value={SITE.rating} size="w-3.5 h-3.5" />
              <p className="text-xs text-[#5C5154] mt-1.5">{SITE.reviewCount} {t({ fr: "avis Google", ar: "تقييم من جوجل" })}</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase font-semibold text-[#8E2A3C] mb-4 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#8E2A3C]/50"></span> {t({ fr: "À propos", ar: "من نحن" })}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#241A1D] leading-[1.05] tracking-tight">
              {t({ fr: "La fraîcheur, ", ar: "الطزاجة، " })}<span className="italic text-[#8E2A3C]">{t({ fr: "chaque jour", ar: "كل يوم" })}</span>{t({ fr: ", au cœur de Tanger.", ar: "، في قلب طنجة." })}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 text-[#5C5154] text-base sm:text-lg font-light leading-relaxed">
              {t({
                fr: "Fruits Rouges ahlan, maison de la famille Crèmerie Fruits Rouges, est une adresse gourmande de Tanger où l'on vient pour des jus pressés à la minute, des fruits choisis avec soin, des petits-déjeuners généreux et des déjeuners préparés chaque jour avec des produits frais.",
                ar: "فروي روج أهلان، بيت عائلة كريمري فروي روج، عنوان شهي في طنجة يُقصد لعصائر تُعصر في اللحظة، فواكه مختارة بعناية، فطور سخي وأطباق غداء تُحضّر يومياً بمنتجات طازجة.",
              })}
            </p>
            <p className="mt-4 text-[#5C5154] text-base sm:text-lg font-light leading-relaxed">
              {t({
                fr: "Un espace soigné et accueillant, une carte qui suit la saison, et le goût simple des bonnes choses — c'est l'esprit de la maison.",
                ar: "فضاء أنيق ومرحّب، قائمة تتبع الموسم، وطعم الأشياء الجميلة البسيط — هذه روح المحل.",
              })}{" "}
              <span className="italic">Ahlan&nbsp;!</span>
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 grid grid-cols-3 gap-3">
              {[
                { big: `${SITE.rating.toFixed(1)}/5`, small: { fr: "Note Google", ar: "تقييم جوجل" } },
                { big: `${SITE.reviewCount}`, small: { fr: "Avis clients", ar: "آراء العملاء" } },
                { big: SITE.priceRange.split(" ")[0], small: { fr: "MAD / personne*", ar: "درهم / شخص*" } },
              ].map((stat, idx) => (
                <div key={idx} className="rounded-2xl border border-[#EBDFCF] bg-white/60 px-4 py-5 text-center">
                  <p className="font-display text-xl sm:text-2xl font-semibold text-[#241A1D]">{stat.big}</p>
                  <p className="text-[11px] text-[#5C5154] mt-1 tracking-wide uppercase">{t(stat.small)}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-[#8A7E81]">{t({ fr: "* Fourchette indicative publiée sur Google.", ar: "* نطاق تقريبي منشور على جوجل." })}</p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap gap-2">
              {SERVICES.map((srv) => (
                <span key={srv.fr} className="inline-flex items-center gap-1.5 rounded-full border border-[#E3D5C2] bg-white/50 px-3.5 py-1.5 text-xs font-medium text-[#4A3F42]">
                  <IconCheck className="w-3 h-3 text-[#5F7A4E]" /> {t(srv)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ MENU ═══════════════════════ */

const MenuSection = () => {
  const { t } = useLang();
  const [activeCat, setActiveCat] = useState(MENU_CATEGORIES[0].id);
  const current = MENU_CATEGORIES.find((cat) => cat.id === activeCat);

  return (
    <section id="menu" className="py-24 sm:py-32 bg-[#F4EDE2]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHead overline={{ fr: "La carte", ar: "القائمة" }} title={{ fr: "Le menu de la maison", ar: "قائمة المحل" }}
          sub={{ fr: "Jus, petit-déjeuner, fraîcheur et plats du jour — une carte vivante, au rythme des saisons.", ar: "عصائر، فطور، أطباق منعشة وأطباق اليوم — قائمة حية تتبع الفصول." }} />

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2.5">
          {MENU_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              aria-pressed={activeCat === cat.id}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeCat === cat.id ? "bg-[#8E2A3C] border-[#8E2A3C] text-[#FAF6EF] shadow-md shadow-[#8E2A3C]/25" : "border-[#D9C9B4] text-[#4A3F42] hover:border-[#8E2A3C]/50 hover:text-[#8E2A3C] bg-white/40"}`}>
              {t(cat.label)}
            </button>
          ))}
        </Reveal>

        <div className="mt-12" role="tabpanel" aria-label={t(current.label)}>
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: EASE }}>
              <p className="text-center text-sm italic text-[#8A7E81] mb-8 font-display text-base">{t(current.note)}</p>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {current.items.map((item, idx) => (
                  <motion.article key={item.name.fr} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07, duration: 0.5, ease: EASE }}
                    className="group rounded-2xl bg-white/70 border border-[#EBDFCF] p-6 hover:bg-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#241A1D]/8 transition-all duration-300">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold text-[#241A1D] group-hover:text-[#8E2A3C] transition-colors">{t(item.name)}</h3>
                      <span className="shrink-0 text-[11px] uppercase tracking-wider text-[#8A7E81] border-b border-dotted border-[#C9B99F] pb-0.5">{t({ fr: "Prix sur place", ar: "السعر في المحل" })}</span>
                    </div>
                    <p className="mt-2.5 text-sm text-[#5C5154] font-light leading-relaxed">{t(item.desc)}</p>
                    {item.tag && (
                      <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#5F7A4E]/10 text-[#46603A] px-3 py-1 text-[11px] font-semibold">
                        <IconLeaf className="w-3 h-3" /> {t(item.tag)}
                      </span>
                    )}
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-xs text-[#8A7E81] max-w-xl mx-auto leading-relaxed">
            {t({
              fr: `Carte et prix à découvrir sur place ou par téléphone — fourchette indicative Google : ${SITE.priceRange} par personne. La carte évolue selon la saison et les arrivages du jour.`,
              ar: `القائمة والأسعار متوفرة في المحل أو عبر الهاتف — النطاق التقريبي من جوجل: ${SITE.priceRange} للشخص. القائمة تتغير حسب الموسم والوارد اليومي.`,
            })}
          </p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 bg-[#241A1D] hover:bg-black text-[#FAF6EF] rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5">
              <IconPhone className="w-4 h-4" /> {t({ fr: "Appeler maintenant", ar: "اتصل الآن" })}
            </a>
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#241A1D]/20 text-[#241A1D] rounded-full px-6 py-3 text-sm font-semibold hover:border-[#241A1D]/50 transition-all hover:-translate-y-0.5">
              <IconWhatsApp className="w-4 h-4" /> {t({ fr: "Écrire sur WhatsApp", ar: "راسلنا على واتساب" })}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════ GALLERY + LIGHTBOX ═══════════════════════ */

const Gallery = () => {
  const { t } = useLang();
  const [filter, setFilter] = useState("tout");
  const [lightbox, setLightbox] = useState(null);
  const shown = filter === "tout" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === filter);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback((dir) => {
    setLightbox((cur) => (cur === null ? cur : (cur + dir + shown.length) % shown.length));
  }, [shown.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, closeLightbox, stepLightbox]);

  return (
    <section id="galerie" className="py-24 sm:py-32 bg-[#FAF6EF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHead overline={{ fr: "Galerie", ar: "المعرض" }} title={{ fr: "L'œil gourmand", ar: "عين الذواقة" }}
          sub={{ fr: "Sélection d'illustration en attendant le shooting officiel de la maison — fruits, boissons, matins doux et ambiance de Tanger.", ar: "مجموعة توضيحية في انتظار التصوير الرسمي للمحل — فواكه، مشروبات، صباحات هادئة وأجواء طنجة." }} />

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2.5">
          {GALLERY_FILTERS.map((flt) => (
            <button key={flt.id} onClick={() => { setFilter(flt.id); setLightbox(null); }} aria-pressed={filter === flt.id}
              className={`px-4.5 px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border ${filter === flt.id ? "bg-[#241A1D] border-[#241A1D] text-[#FAF6EF]" : "border-[#D9C9B4] text-[#4A3F42] hover:border-[#241A1D]/40 bg-white/40"}`}>
              {t(flt.label)}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          <AnimatePresence>
            {shown.map((pic, idx) => (
              <motion.figure key={pic.src} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, delay: idx * 0.04, ease: EASE }}
                className="break-inside-avoid mb-5">
                <button onClick={() => setLightbox(idx)} className="group relative w-full overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8E2A3C]"
                  aria-label={t(pic.caption)}>
                  <img src={pic.src} alt={t(pic.alt)} loading="lazy" decoding="async"
                    className="w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#1A0E12]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-left rtl:text-right translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[#FAF6EF] font-display text-lg font-medium">{t(pic.caption)}</span>
                    <span className="block text-[#E8D9C6]/80 text-xs mt-0.5 uppercase tracking-widest">{t(GALLERY_FILTERS.find((f) => f.id === pic.cat)?.label ?? { fr: "", ar: "" })}</span>
                  </figcaption>
                </button>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && shown[lightbox] && (
          <motion.div className="fixed inset-0 z-[70] bg-[#12090C]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            role="dialog" aria-modal="true" aria-label={t(shown[lightbox].caption)}
            onClick={closeLightbox}>
            <button onClick={closeLightbox} aria-label={t({ fr: "Fermer la photo", ar: "إغلاق الصورة" })}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <IconX className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }} aria-label={t({ fr: "Photo précédente", ar: "الصورة السابقة" })}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <IconChevronL className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); stepLightbox(1); }} aria-label={t({ fr: "Photo suivante", ar: "الصورة التالية" })}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <IconChevronR className="w-6 h-6" />
            </button>
            <motion.img key={lightbox} src={shown[lightbox].src} alt={t(shown[lightbox].alt)}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: EASE }}
              className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl" />
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
              <p className="text-[#FAF6EF] font-display text-lg">{t(shown[lightbox].caption)}</p>
              <p className="text-[#E8D9C6]/60 text-xs mt-1">{lightbox + 1} / {shown.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ═══════════════════════ REVIEWS ═══════════════════════ */

const Reviews = () => {
  const { t } = useLang();
  return (
    <section id="avis" className="py-24 sm:py-32 bg-[#241A1D] relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#8E2A3C]/20 blur-[120px]" aria-hidden="true"></div>
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#5F7A4E]/10 blur-[120px]" aria-hidden="true"></div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-14 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <p className="text-[11px] tracking-[0.35em] uppercase font-semibold text-[#E8A0AE] mb-4 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#E8A0AE]/50"></span> {t({ fr: "Avis", ar: "التقييمات" })}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FAF6EF] leading-[1.05] tracking-tight">
              {t({ fr: "Ils sont venus, ils ont ", ar: "جاؤوا، و" })}<span className="italic text-[#E8A0AE]">{t({ fr: "goûté", ar: "ذاقوا" })}</span>.
            </h2>
            <div className="mt-8 flex items-end gap-4">
              <p className="font-display text-7xl font-semibold text-[#FAF6EF] leading-none">{SITE.rating.toFixed(1)}</p>
              <div className="pb-1.5">
                <Stars value={SITE.rating} size="w-5 h-5" />
                <p className="text-[#B9A9A0] text-sm mt-1.5">{SITE.reviewCount} {t({ fr: "avis sur Google", ar: "تقييم على جوجل" })}</p>
              </div>
            </div>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 bg-[#FAF6EF] text-[#241A1D] rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-white transition-all hover:-translate-y-0.5">
              {t({ fr: "Voir tous les avis sur Google", ar: "شاهد كل التقييمات على جوجل" })} <IconArrowUpRight className="w-4 h-4" />
            </a>
            <p className="mt-4 text-xs text-[#8A7E81] leading-relaxed">
              {t({ fr: "Citations ci-contre : avis clients publiés en ligne pour la maison Crémerie Fruits Rouges, Tanger.", ar: "الاقتباسات المجاورة: آراء عملاء منشورة على الإنترنت لمحل كريمري فروي روج، طنجة." })}
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-1 gap-5">
            {REVIEWS.map((rev, idx) => (
              <Reveal key={rev.author} delay={idx * 0.1}>
                <blockquote className="rounded-2xl bg-white/[0.05] border border-white/10 p-7 sm:p-8 hover:bg-white/[0.08] transition-colors duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-5xl text-[#C6405A] leading-none select-none" aria-hidden="true">&ldquo;</span>
                    <Stars value={rev.stars} size="w-3.5 h-3.5" />
                  </div>
                  <p dir="ltr" className="mt-3 text-[#EFE4DA] font-light leading-relaxed text-[15px] sm:text-base italic text-left">{rev.text}</p>
                  <footer className="mt-5 text-sm text-[#B9A9A0] font-medium">— {rev.author}</footer>
                </blockquote>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="rounded-2xl border border-dashed border-white/15 p-7 text-center">
                <p className="text-[#EFE4DA] font-display text-xl">{t({ fr: "Votre avis compte.", ar: "رأيك يهمنا." })}</p>
                <p className="text-[#B9A9A0] text-sm mt-2 font-light">{t({ fr: "Passé(e) à la maison ? Partagez votre expérience sur Google Maps.", ar: "زرت المحل؟ شارك تجربتك على خرائط جوجل." })}</p>
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[#E8A0AE] text-sm font-semibold hover:text-white transition-colors">
                  {t({ fr: "Laisser un avis", ar: "اترك تقييماً" })} <IconArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ LOCATION / CONTACT ═══════════════════════ */

const Contact = () => {
  const { t } = useLang();
  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#FAF6EF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHead overline={{ fr: "Nous trouver", ar: "موقعنا" }} title={{ fr: "Au cœur de Tanger", ar: "في قلب طنجة" }}
            sub={{ fr: "Route Arabie Saoudite — à deux pas de la vie de quartier, entre un jus frais et une terrasse de Tanger.", ar: "طريق العربية السعودية — على بعد خطوات من حياة الحي، بين عصير طازج وتراس طنجة." }} />

        <div className="mt-14 grid lg:grid-cols-5 gap-8 items-stretch">
          <Reveal className="lg:col-span-3">
            <div className="relative h-[380px] sm:h-full min-h-[420px] rounded-[2rem] overflow-hidden border border-[#EBDFCF] shadow-lg shadow-[#241A1D]/8">
              <iframe title="Google Maps — Fruits Rouges ahlan, Tanger" src={SITE.mapEmbed}
                className="absolute inset-0 w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 rtl:sm:right-auto rtl:sm:left-4 sm:w-72 bg-[#FAF6EF]/95 backdrop-blur rounded-2xl border border-[#EBDFCF] p-5 shadow-xl">
                <p className="font-display font-semibold text-[#241A1D]">{SITE.name}</p>
                <p className="text-xs text-[#5C5154] mt-1 leading-relaxed">{t(SITE.address)}</p>
                <p className="text-[11px] text-[#8A7E81] mt-1">{t({ fr: "Plus code", ar: "الرمز" })} : {SITE.plusCode} · {SITE.coords.lat}, {SITE.coords.lng}</p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <Reveal delay={0.05}>
              <a href={SITE.phoneHref} className="group flex items-center gap-5 rounded-2xl bg-white/70 border border-[#EBDFCF] p-6 hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <span className="shrink-0 w-12 h-12 rounded-full bg-[#8E2A3C]/10 text-[#8E2A3C] flex items-center justify-center group-hover:bg-[#8E2A3C] group-hover:text-white transition-colors"><IconPhone className="w-5 h-5" /></span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-[#8A7E81]">{t({ fr: "Téléphone", ar: "الهاتف" })}</span>
                  <span dir="ltr" className="block font-semibold text-[#241A1D] mt-1">{SITE.phoneDisplay}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 rounded-2xl bg-white/70 border border-[#EBDFCF] p-6 hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <span className="shrink-0 w-12 h-12 rounded-full bg-[#5F7A4E]/10 text-[#46603A] flex items-center justify-center group-hover:bg-[#5F7A4E] group-hover:text-white transition-colors"><IconNav className="w-5 h-5" /></span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-[#8A7E81]">{t({ fr: "Itinéraire", ar: "الاتجاهات" })}</span>
                  <span className="block font-semibold text-[#241A1D] mt-1">{t({ fr: "Ouvrir dans Google Maps", ar: "افتح في خرائط جوجل" })}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex items-center gap-5 rounded-2xl bg-white/70 border border-[#EBDFCF] p-6">
                <span className="shrink-0 w-12 h-12 rounded-full bg-[#C98A2D]/10 text-[#C98A2D] flex items-center justify-center"><IconClock className="w-5 h-5" /></span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-[#8A7E81]">{t({ fr: "Horaires", ar: "أوقات العمل" })}</span>
                  <span className="block text-sm text-[#4A3F42] mt-1 leading-relaxed">{t({ fr: "Non communiqués sur Google pour le moment — appelez-nous pour préparer votre visite.", ar: "غير معلنة على جوجل حالياً — اتصلوا بنا لتحضير زيارتكم." })}</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl bg-[#8E2A3C] p-7 text-[#FAF6EF] relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true"></div>
                <p className="font-display text-2xl font-semibold">{t({ fr: "Une envie de frais ?", ar: "تشتهي شيئاً منعشاً؟" })}</p>
                <p className="text-sm text-[#F3D9C4] mt-2 font-light">{t({ fr: "Appelez, écrivez, ou passez directement — ahlan !", ar: "اتصل، راسلنا، أو مر مباشرة — أهلاً!" })}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a href={SITE.phoneHref} className="inline-flex items-center gap-2 bg-[#FAF6EF] text-[#8E2A3C] rounded-full px-5 py-2.5 text-[13px] font-semibold hover:bg-white transition-colors"><IconPhone className="w-4 h-4" /> {t({ fr: "Appeler", ar: "اتصل" })}</a>
                  <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/30 rounded-full px-5 py-2.5 text-[13px] font-semibold hover:bg-white/10 transition-colors"><IconWhatsApp className="w-4 h-4" /> WhatsApp</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ FOOTER ═══════════════════════ */

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="bg-[#1A0E12] text-[#B9A9A0] pt-16 pb-28 md:pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-2xl font-semibold text-[#FAF6EF]">Fruits Rouges <span className="italic text-[#E8A0AE]">ahlan</span></p>
            <p className="mt-3 text-sm font-light leading-relaxed">{t({ fr: "Crèmerie & restaurant — jus frais, petit-déjeuner et déjeuner à Tanger, Maroc.", ar: "كريمري ومطعم — عصائر طازجة، فطور وغداء في طنجة، المغرب." })}</p>
            <div className="mt-5 flex items-center gap-2 text-sm"><Stars value={SITE.rating} size="w-3.5 h-3.5" /><span className="text-xs">{SITE.rating.toFixed(1)} · {SITE.reviewCount} {t({ fr: "avis", ar: "تقييم" })}</span></div>
          </div>
          <nav aria-label={t({ fr: "Navigation pied de page", ar: "روابط تذييل الصفحة" })}>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A7E81] mb-4">{t({ fr: "Navigation", ar: "التصفح" })}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}><a href={`#${link.id}`} className="hover:text-[#FAF6EF] transition-colors">{t(link.label)}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A7E81] mb-4">{t({ fr: "Contact", ar: "اتصل بنا" })}</p>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5"><IconPin className="w-4 h-4 mt-0.5 shrink-0 text-[#E8A0AE]" /> {t(SITE.address)}</li>
              <li><a href={SITE.phoneHref} className="flex items-center gap-2.5 hover:text-[#FAF6EF] transition-colors"><IconPhone className="w-4 h-4 shrink-0 text-[#E8A0AE]" /> <span dir="ltr">{SITE.phoneDisplay}</span></a></li>
              <li><a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#FAF6EF] transition-colors"><IconArrowUpRight className="w-4 h-4 shrink-0 text-[#E8A0AE]" /> Google Maps</a></li>
              <li><a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#FAF6EF] transition-colors"><IconInstagram className="w-4 h-4 shrink-0 text-[#E8A0AE]" /> @cremerie_fruits_rouges</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A7E81]">
          <p>© {new Date().getFullYear()} Fruits Rouges ahlan — {t({ fr: "Tanger, Maroc. Tous droits réservés.", ar: "طنجة، المغرب. جميع الحقوق محفوظة." })}</p>
          <p className="italic font-display text-sm">Ahlan wa sahlan.</p>
        </div>
      </div>
    </footer>
  );
};

/* ═══════════════════════ FLOATING ACTIONS ═══════════════════════ */

const FloatingActions = () => {
  const { t } = useLang();
  return (
    <>
      {/* Barre mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#FAF6EF]/95 backdrop-blur-md border-t border-[#EBDFCF] pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-3">
          <a href={SITE.phoneHref} className="flex flex-col items-center gap-1 py-3 text-[#8E2A3C] active:bg-[#8E2A3C]/10">
            <IconPhone className="w-5 h-5" /><span className="text-[11px] font-semibold">{t({ fr: "Appeler", ar: "اتصل" })}</span>
          </a>
          <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-3 text-[#46603A] active:bg-[#5F7A4E]/10 border-x border-[#EBDFCF]">
            <IconNav className="w-5 h-5" /><span className="text-[11px] font-semibold">{t({ fr: "Itinéraire", ar: "الاتجاهات" })}</span>
          </a>
          <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-3 text-[#1FAF57] active:bg-[#1FAF57]/10">
            <IconWhatsApp className="w-5 h-5" /><span className="text-[11px] font-semibold">WhatsApp</span>
          </a>
        </div>
      </div>
      {/* WhatsApp desktop */}
      <motion.a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={t({ fr: "Discuter sur WhatsApp", ar: "تواصل عبر واتساب" })}
        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, duration: 0.5, ease: EASE }}
        whileHover={{ y: -4 }}
        className="hidden md:flex fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 w-14 h-14 rounded-full bg-[#1FAF57] text-white items-center justify-center shadow-xl shadow-[#1FAF57]/30">
        <IconWhatsApp className="w-6 h-6" />
      </motion.a>
    </>
  );
};

/* ═══════════════════════ APP ═══════════════════════ */

export default function App() {
  /* Fonts (Fontsource CDN) */
  useEffect(() => {
    FONT_URLS.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const linkTag = document.createElement("link");
        linkTag.rel = "stylesheet";
        linkTag.href = href;
        document.head.appendChild(linkTag);
      }
    });
  }, []);

  const { t } = useLang();

  return (
    <div className="bg-[#FAF6EF] text-[#241A1D] antialiased">
      <style>{`
        html { scroll-behavior: smooth; }
        body { font-family: "Outfit", system-ui, sans-serif; background: #FAF6EF; }
        .font-display { font-family: "Fraunces", Georgia, serif; }
        [dir="rtl"] body { font-family: "Cairo", system-ui, sans-serif; }
        [dir="rtl"] .font-display { font-family: "Cairo", system-ui, sans-serif; font-weight: 800; letter-spacing: 0; }
        ::selection { background: #8E2A3C; color: #FAF6EF; }
        @keyframes fr-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: fr-marquee 30s linear infinite; }
        [dir="rtl"] .animate-marquee { animation-direction: reverse; }
        :focus-visible { outline: 2px solid #8E2A3C; outline-offset: 3px; border-radius: 4px; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F4EDE2; }
        ::-webkit-scrollbar-thumb { background: #C9B99F; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #8E2A3C; }
      `}</style>

      <a href="#apropos" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-[#8E2A3C] focus:text-white focus:px-4 focus:py-2 focus:rounded-full text-sm">
        {t({ fr: "Aller au contenu", ar: "الذهاب إلى المحتوى" })}
      </a>

      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
