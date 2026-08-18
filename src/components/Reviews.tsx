import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import { useLang } from "../context/LangContext";
import { REVIEWS, RESTAURANT } from "../data/restaurant";

export default function Reviews() {
  const { t } = useLang();

  return (
    <section id="reviews" className="relative py-20 md:py-28 bg-cream-100/60 overflow-hidden">
      {/* Marquee background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
        <div className="whitespace-nowrap animate-marquee font-display text-[20rem] font-bold text-ink-900">
          Reviews · Reviews · Reviews · Reviews · Reviews · Reviews · Reviews · Reviews ·
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16"
        >
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-brand-700 mb-3">
              {t({ fr: "Ils nous ont aimés", ar: "أحبنا زبائننا" })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-ink-900 leading-[1.05]">
              {t({ fr: "L'avis de", ar: "آراء" })}
              <br />
              <span className="italic font-light text-brand-700">
                {t({ fr: "nos clients.", ar: "عملائنا." })}
              </span>
            </h2>
          </div>

          {/* Rating card */}
          <div className="inline-flex items-center gap-5 p-5 md:p-6 rounded-2xl bg-white border border-ink-900/5 shadow-sm">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-4 h-4 fill-yellow-400/40 text-yellow-400/40" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl md:text-4xl font-bold text-ink-900">
                  {RESTAURANT.rating.value}
                </span>
                <span className="text-xs text-ink-700/60">/5</span>
              </div>
              <div className="text-xs text-ink-700/60 mt-0.5">
                {RESTAURANT.rating.count} {t({ fr: "avis", ar: "تقييم" })} · {RESTAURANT.rating.source}
              </div>
            </div>
            <a
              href={RESTAURANT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-brand-700 hover:text-brand-800"
            >
              {t({ fr: "Voir", ar: "عرض" })}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-ink-900/5 hover:border-brand-700/20 hover:shadow-xl hover:shadow-brand-700/5 transition-all"
            >
              <Quote className="absolute top-6 end-6 w-8 h-8 text-brand-100" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-ink-900 text-sm md:text-base leading-relaxed mb-6">
                "{t(r.text)}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-ink-900/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-semibold text-sm">
                    {r.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-ink-900">{r.author}</div>
                    <div className="text-xs text-ink-700/60">{r.source}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
