import { motion } from "framer-motion";
import { Phone, MessageCircle, Navigation, ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LangContext";
import { RESTAURANT } from "../data/restaurant";

export default function Contact() {
  const { t } = useLang();

  const actions = [
    {
      icon: Phone,
      title: { fr: "Appelez-nous", ar: "اتصل بنا" },
      subtitle: RESTAURANT.phone.display,
      href: `tel:${RESTAURANT.phone.tel}`,
      color: "from-brand-600 to-brand-800",
      external: false,
    },
    {
      icon: MessageCircle,
      title: { fr: "WhatsApp", ar: "واتساب" },
      subtitle: RESTAURANT.mobile.display,
      href: `https://wa.me/${RESTAURANT.mobile.tel.replace(/\D/g, "")}`,
      color: "from-green-500 to-green-700",
      external: true,
    },
    {
      icon: Navigation,
      title: { fr: "Itinéraire", ar: "الاتجاهات" },
      subtitle: { fr: "Google Maps", ar: "خرائط Google" },
      href: RESTAURANT.directionsUrl,
      color: "from-blue-500 to-blue-700",
      external: true,
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-ink-900 text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <img src="/images/hero.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-900/95 to-ink-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-brand-400 mb-4">
            {t({ fr: "Réservation & Contact", ar: "الحجز والتواصل" })}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.05] mb-6">
            {t({ fr: "Une table", ar: "طاولة" })}
            <br />
            <span className="italic font-light text-brand-400">
              {t({ fr: "vous attend.", ar: "بانتظارك." })}
            </span>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            {t({
              fr: "Passez nous voir, appelez-nous ou écrivez-nous sur WhatsApp. Notre équipe vous accueille avec plaisir.",
              ar: "تفضّل بزيارتنا، اتصل بنا أو راسلنا عبر واتساب. فريقنا يستقبلك بكل سرور.",
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {actions.map((a, i) => {
            const Icon = a.icon;
            const Wrapper: any = a.external ? "a" : "a";
            return (
              <Wrapper
                key={i}
                href={a.href}
                target={a.external ? "_blank" : undefined}
                rel={a.external ? "noopener noreferrer" : undefined}
                className="group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all overflow-hidden"
              >
                <div className={`absolute -top-16 -end-16 w-40 h-40 bg-gradient-to-br ${a.color} rounded-full opacity-20 group-hover:opacity-40 blur-2xl transition-opacity`} />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
                    {t(a.title)}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-semibold mb-4">
                    {typeof a.subtitle === "string" ? a.subtitle : t(a.subtitle)}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {t({ fr: "Contactez-nous", ar: "تواصل معنا" })}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-180" />
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
