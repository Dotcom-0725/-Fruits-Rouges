import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LangContext";
import { SIGNATURE_DISHES } from "../data/restaurant";

export default function SignatureDishes() {
  const { t } = useLang();

  return (
    <section className="relative py-20 md:py-28 bg-ink-900 text-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-brand-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-brand-900/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16 gap-4"
        >
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-brand-400 mb-3">
              {t({ fr: "Signatures de la maison", ar: "تواقيع المنزل" })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05]">
              {t({
                fr: "Nos plats les plus appréciés.",
                ar: "أكثر أطباقنا استحسانًا.",
              })}
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-sm md:text-base">
            {t({
              fr: "Les préférés de nos habitués, préparés avec soin chaque jour.",
              ar: "مفضلات زبائننا الدائمين، محضّرة بعناية كل يوم.",
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SIGNATURE_DISHES.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-ink-800 aspect-[3/4] cursor-pointer"
            >
              <img
                src={dish.image}
                alt={t(dish.name)}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
              <div className="absolute top-4 end-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
                <div className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-2">
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-1.5">
                  {t(dish.name)}
                </h3>
                <p className="text-xs md:text-sm text-white/70 line-clamp-2">
                  {t(dish.description)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
