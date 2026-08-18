import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useLang } from "../context/LangContext";
import { GALLERY } from "../data/restaurant";

export default function Gallery() {
  const { t } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-20 md:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14"
        >
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-brand-700 mb-3">
              {t({ fr: "Galerie", ar: "المعرض" })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-ink-900 leading-[1.05]">
              {t({ fr: "Un aperçu", ar: "نظرة" })}
              <br />
              <span className="italic font-light text-brand-700">
                {t({ fr: "de l'expérience.", ar: "على التجربة." })}
              </span>
            </h2>
          </div>
          <a
            href={RESTAURANT_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-brand-700 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
            {t({ fr: "Suivez-nous sur Instagram", ar: "تابعونا على إنستغرام" })}
          </a>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[180px] md:auto-rows-[240px]">
          {GALLERY.map((img, i) => {
            const span =
              i === 0 ? "md:col-span-2 md:row-span-2"
              : i === 3 ? "md:row-span-2"
              : i === 5 ? "md:col-span-2"
              : "";
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setLightboxIndex(i)}
                className={`group relative overflow-hidden rounded-xl md:rounded-2xl bg-cream-200 ${span}`}
              >
                <img
                  src={img.src}
                  alt={t(img.alt)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-ink-900" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] bg-ink-900/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 end-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={GALLERY[lightboxIndex].src}
              alt={t(GALLERY[lightboxIndex].alt)}
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const RESTAURANT_INSTAGRAM_URL = "https://www.instagram.com/cremerie_fruits_rouges/";
