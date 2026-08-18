import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { useLang } from "../context/LangContext";
import { RESTAURANT } from "../data/restaurant";

export default function Location() {
  const { t, lang } = useLang();

  return (
    <section id="location" className="relative py-20 md:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-brand-700 mb-3">
            {t({ fr: "Nous trouver", ar: "موقعنا" })}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-ink-900 leading-[1.05]">
            {t({ fr: "Venez nous", ar: "تفضّلوا" })}
            <br />
            <span className="italic font-light text-brand-700">
              {t({ fr: "rendre visite.", ar: "بزيارتنا." })}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-6">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-ink-900/5 flex flex-col"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-700 text-white mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink-900 mb-2">
                {RESTAURANT.name}
              </h3>
              <div className="text-sm font-medium text-brand-700 uppercase tracking-wider">
                {RESTAURANT.branch} · Tanger
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brand-700" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/60 mb-1">
                    {t({ fr: "Adresse", ar: "العنوان" })}
                  </div>
                  <div className="text-sm text-ink-900">{t(RESTAURANT.address as any)}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-brand-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/60 mb-1">
                    {t({ fr: "Téléphone", ar: "الهاتف" })}
                  </div>
                  <a href={`tel:${RESTAURANT.phone.tel}`} className="block text-sm text-ink-900 hover:text-brand-700">
                    {RESTAURANT.phone.display}
                  </a>
                  <a href={`tel:${RESTAURANT.mobile.tel}`} className="block text-sm text-ink-900 hover:text-brand-700">
                    {RESTAURANT.mobile.display}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-brand-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/60 mb-2">
                    {t({ fr: "Horaires", ar: "أوقات العمل" })}
                  </div>
                  <div className="space-y-1">
                    {RESTAURANT.hours.map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-ink-900">{t(h.day)}</span>
                        <span className="text-ink-700/70 font-mono">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-ink-900/5 space-y-2">
              <a
                href={RESTAURANT.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full bg-brand-700 text-white font-medium hover:bg-brand-800 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                {t({ fr: "Itinéraire Google Maps", ar: "الاتجاهات على خرائط Google" })}
              </a>
              <a
                href={`tel:${RESTAURANT.phone.tel}`}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-ink-900/10 text-ink-900 font-medium hover:bg-ink-900 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                {t({ fr: "Appeler", ar: "اتصل" })}
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl md:rounded-3xl overflow-hidden border border-ink-900/5 bg-cream-200 min-h-[400px] lg:min-h-[600px] relative"
          >
            <iframe
              title="Fruits Rouges Ahlan Map"
              src={`https://www.google.com/maps?q=Cremerie+Fruits+Rouges+Ahlan+Tanger&output=embed${lang === "ar" ? "&language=ar" : ""}`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
