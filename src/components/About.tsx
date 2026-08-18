import { motion } from "framer-motion";
import { useLang } from "../context/LangContext";
import { RESTAURANT } from "../data/restaurant";

export default function About() {
  const { t } = useLang();

  const stats = [
    { value: "4.0", label: { fr: "Sur Google", ar: "على Google" } },
    { value: "600+", label: { fr: "Avis clients", ar: "تقييم عملاء" } },
    { value: "12K", label: { fr: "Followers", ar: "متابع" } },
    { value: "7/7", label: { fr: "Jours", ar: "أيام" } },
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-3 md:space-y-4">
                <div className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden bg-cream-200">
                  <img
                    src="/images/interior.jpg"
                    alt={t({ fr: "Intérieur", ar: "الداخل" })}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-brand-700 flex items-center justify-center p-6">
                  <div className="text-center text-white">
                    <div className="font-display text-5xl md:text-6xl font-bold mb-2">FR</div>
                    <div className="text-xs md:text-sm uppercase tracking-[0.3em] opacity-80">
                      Ahlan · Tanger
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 pt-10 md:pt-16">
                <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-cream-200">
                  <img
                    src="/images/juices.jpg"
                    alt={t({ fr: "Jus frais", ar: "عصائر طازجة" })}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden bg-cream-200">
                  <img
                    src="/images/breakfast.jpg"
                    alt={t({ fr: "Petit-déjeuner", ar: "الفطور" })}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-brand-700 mb-3">
              {t({ fr: "À propos de nous", ar: "من نحن" })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-ink-900 leading-[1.05] mb-6">
              {t({
                fr: "Un rendez-vous",
                ar: "موعد",
              })}
              <br />
              <span className="italic font-light text-brand-700">
                {t({ fr: "gourmand", ar: "شهي" })}
              </span>{" "}
              {t({ fr: "à Tanger.", ar: "في طنجة." })}
            </h2>
            <div className="space-y-4 text-ink-700/85 text-sm md:text-base leading-relaxed">
              <p>{t(RESTAURANT.description)}</p>
              <p>
                {t({
                  fr: "Deux adresses pour mieux vous servir : Route Rahrah (Complex Kawacim) et Route Arabie Saoudite (Ahlan). Une équipe passionnée, des produits frais et une cuisine qui mélange tradition et modernité.",
                  ar: "فرعان لخدمتكم بشكل أفضل: طريق رحرح (مجمع الكواسم) وطريق العربية السعودية (أهلان). فريق شغوف، منتجات طازجة ومطبخ يمزج بين التقليد والحداثة.",
                })}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 md:gap-6 mt-10 pt-8 border-t border-ink-900/10">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="font-display text-2xl md:text-4xl font-bold text-ink-900 mb-1">
                    {s.value}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-ink-700/60 font-medium">
                    {t(s.label)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
