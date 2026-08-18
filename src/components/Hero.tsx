import { motion } from "framer-motion";
import { MapPin, ArrowRight, Star } from "lucide-react";
import { useLang } from "../context/LangContext";
import { RESTAURANT } from "../data/restaurant";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Fruits Rouges Ahlan"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-900/40 to-ink-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/50 to-transparent" />
      </div>

      {/* Top floating bar */}
      <div className="relative z-10 pt-24 md:pt-28 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{RESTAURANT.rating.value}</span>
            </span>
            <span className="text-white/40">·</span>
            <span className="text-white/80">
              {RESTAURANT.rating.count} {t({ fr: "avis", ar: "تقييم" })} · Google
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-end min-h-[85svh] px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-700/90 backdrop-blur text-white text-xs font-medium mb-5 md:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {t({ fr: "Ouvert maintenant · Tanger, Ahlan", ar: "مفتوح الآن · طنجة، أهلان" })}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-5 md:mb-6"
            >
              {t({ fr: "Fruits", ar: "فروت" })}
              <br />
              <span className="italic font-light text-cream-200">
                {t({ fr: "Rouges", ar: "روج" })}
              </span>
              <br />
              <span className="text-brand-400">Ahlan.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base md:text-xl text-white/85 max-w-xl mb-8 md:mb-10 leading-relaxed"
            >
              {t({
                fr: "Crèmerie, petit-déjeuner raffiné et saveurs fraîches au cœur de Tanger. Jus pressés, plats gourmands et ambiance chaleureuse.",
                ar: "كريمري، فطور راقٍ ونكهات طازجة في قلب طنجة. عصائر معصورة، أطباق شهية وأجواء دافئة.",
              })}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <a
                href="#menu"
                className="group inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-white text-ink-900 font-semibold hover:bg-cream-100 transition-all shadow-2xl shadow-ink-900/40"
              >
                {t({ fr: "Voir le menu", ar: "اكتشف القائمة" })}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </a>
              <a
                href={RESTAURANT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 backdrop-blur-md transition-all"
              >
                <MapPin className="w-4 h-4" />
                {t({ fr: "Nous trouver", ar: "دليل الموقع" })}
              </a>
            </motion.div>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs md:text-sm text-white/70"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {RESTAURANT.address.short.fr}
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {t({ fr: "07:00 — 01:00", ar: "07:00 — 01:00" })}
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
              <div>{RESTAURANT.priceRange.fr}</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60 text-xs"
      >
        <span className="tracking-[0.3em] uppercase">{t({ fr: "Scroll", ar: "تابع" })}</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
