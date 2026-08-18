import { motion } from "framer-motion";
import { Star, Clock, MapPin, Utensils, Leaf, Truck } from "lucide-react";
import { useLang } from "../context/LangContext";
import { RESTAURANT } from "../data/restaurant";

const highlights = [
  {
    icon: Star,
    title: { fr: "Notation Google", ar: "تقييم Google" },
    value: "4.0/5",
    sub: { fr: `${RESTAURANT.rating.count} avis vérifiés`, ar: `${RESTAURANT.rating.count} تقييم موثّق` },
  },
  {
    icon: Utensils,
    title: { fr: "Cuisine", ar: "المطبخ" },
    value: { fr: "Crèmerie & Fast Food", ar: "كريمري ووجبات سريعة" },
    sub: { fr: "Frais, halal, végétarien", ar: "طازج، حلال، نباتي" },
  },
  {
    icon: Clock,
    title: { fr: "Horaires", ar: "أوقات العمل" },
    value: "07:00 — 01:00",
    sub: { fr: "7j/7 · Ouvert tard", ar: "كل أيام الأسبوع · مفتوح لوقت متأخر" },
  },
  {
    icon: MapPin,
    title: { fr: "Adresse", ar: "العنوان" },
    value: { fr: "Ahlan, Tanger", ar: "أهلان، طنجة" },
    sub: { fr: "Route Arabie Saoudite", ar: "طريق العربية السعودية" },
  },
  {
    icon: Leaf,
    title: { fr: "Options saines", ar: "خيارات صحية" },
    value: { fr: "Végétarien & Vegan", ar: "نباتي وصحي" },
    sub: { fr: "Fruits rouges signature", ar: "فواكه حمراء مميزة" },
  },
  {
    icon: Truck,
    title: { fr: "Services", ar: "الخدمات" },
    value: { fr: "Sur place · Livraison", ar: "داخل المطعم · توصيل" },
    sub: { fr: "À emporter disponible", ar: "طلب خارجي متوفر" },
  },
];

export default function Highlights() {
  const { t } = useLang();

  return (
    <section className="relative py-16 md:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10 md:mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-brand-700 mb-3">
            {t({ fr: "Pourquoi nous choisir", ar: "لماذا نحن" })}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink-900 leading-tight">
            {t({
              fr: "Une expérience gourmande, chaque jour.",
              ar: "تجربة شهية، كل يوم.",
            })}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative p-5 md:p-7 rounded-2xl md:rounded-3xl bg-white border border-ink-900/5 hover:border-brand-700/30 hover:shadow-xl hover:shadow-brand-700/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4 md:mb-5">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center group-hover:from-brand-700 group-hover:to-brand-800 transition-all">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-brand-700 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <div className="text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase text-ink-700/60 mb-1.5 md:mb-2">
                  {t(h.title)}
                </div>
                <div className="font-display text-lg md:text-xl font-semibold text-ink-900 mb-1">
                  {typeof h.value === "string" ? h.value : t(h.value)}
                </div>
                <div className="text-xs md:text-sm text-ink-700/70">{t(h.sub)}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
