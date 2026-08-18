import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame } from "lucide-react";
import { useLang } from "../context/LangContext";
import { MENU, type MenuCategory } from "../data/restaurant";

export default function MenuSection() {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>(MENU[0].id);

  const currentCategory: MenuCategory =
    MENU.find((c) => c.id === activeCategory) || MENU[0];

  return (
    <section id="menu" className="relative py-20 md:py-28 bg-cream-100/60">
      {/* Decorative */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-900/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-brand-700 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {t({ fr: "Notre Menu", ar: "قائمتنا" })}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-ink-900 leading-[1.05] mb-4">
            {t({
              fr: "Des saveurs fraîches,",
              ar: "نكهات طازجة،",
            })}
            <br />
            <span className="italic font-light text-brand-700">
              {t({ fr: "toute la journée.", ar: "طوال اليوم." })}
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-ink-700/80 text-sm md:text-base">
            {t({
              fr: "Du petit-déjeuner aux plats gourmands, en passant par nos jus signature aux fruits rouges.",
              ar: "من الفطور إلى الأطباق الشهية، مرورًا بعصائرنا المميزة بالفواكه الحمراء.",
            })}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-8 md:mb-12">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
            {MENU.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-ink-900 text-white shadow-lg shadow-ink-900/20"
                    : "bg-white text-ink-800 hover:bg-brand-50 border border-ink-900/5"
                }`}
              >
                {t(cat.title)}
              </button>
            ))}
          </div>
        </div>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentCategory.description && (
              <p className="text-center text-ink-700/70 text-sm md:text-base mb-8 max-w-2xl mx-auto">
                {t(currentCategory.description)}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              {currentCategory.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative flex gap-4 p-4 md:p-5 rounded-2xl bg-white border border-ink-900/5 hover:border-brand-700/30 hover:shadow-lg hover:shadow-brand-700/5 transition-all overflow-hidden"
                >
                  {item.image ? (
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 bg-cream-200">
                      <img
                        src={item.image}
                        alt={t(item.name)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {item.popular && (
                        <div className="absolute top-1.5 start-1.5 px-1.5 py-0.5 rounded-md bg-brand-700 text-white text-[9px] font-bold flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" />
                          TOP
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-50 to-cream-200 flex-shrink-0 flex items-center justify-center">
                      <span className="font-display text-2xl md:text-3xl text-brand-700">
                        {t(item.name).charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1.5">
                      <h3 className="font-display text-base md:text-lg font-semibold text-ink-900 leading-tight">
                        {t(item.name)}
                      </h3>
                      {item.popular && !item.image && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-brand-700 text-white text-[9px] font-bold flex-shrink-0 mt-0.5">
                          <Flame className="w-2.5 h-2.5" />
                          POP
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs md:text-sm text-ink-700/70 line-clamp-2">
                        {t(item.description)}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <p className={`text-center mt-10 text-xs md:text-sm text-ink-700/60 ${lang === "ar" ? "font-arabic" : ""}`}>
          {t({
            fr: "Les prix peuvent varier selon la saison. Contactez-nous pour plus d'informations.",
            ar: "قد تختلف الأسعار حسب الموسم. تواصلوا معنا لمزيد من المعلومات.",
          })}
        </p>
      </div>
    </section>
  );
}
