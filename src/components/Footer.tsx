import { Camera, MapPin, Phone, Clock, Heart } from "lucide-react";
import { useLang } from "../context/LangContext";
import { RESTAURANT, NAV_LINKS } from "../data/restaurant";

export default function Footer() {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-cream-50 text-ink-900 pt-16 md:pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-900/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: big logo */}
        <div className="text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-xl shadow-brand-700/30">
              <span className="font-display text-white font-bold text-xl md:text-2xl">FR</span>
            </div>
          </div>
          <h3 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-none mb-3">
            {t({ fr: "Fruits Rouges", ar: "فروت روج" })}
          </h3>
          <div className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-700 font-medium">
            Ahlan · Tanger
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700/60 mb-3">
              {t({ fr: "Le restaurant", ar: "المطعم" })}
            </div>
            <p className="text-sm text-ink-700/80 max-w-sm leading-relaxed mb-4">
              {t({
                fr: "Crèmerie et restaurant à Tanger, spécialisé en petit-déjeuner, jus frais et cuisine savoureuse. Deux adresses pour mieux vous servir.",
                ar: "كريمري ومطعم في طنجة، متخصّص في الفطور، العصائر الطازجة والمأكولات الشهية. فرعان لخدمتكم.",
              })}
            </p>
            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-brand-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
              {RESTAURANT.instagramHandle}
            </a>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700/60 mb-3">
              {t({ fr: "Navigation", ar: "التنقّل" })}
            </div>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-ink-700/80 hover:text-brand-700 transition-colors"
                  >
                    {t(link.label)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700/60 mb-3">
              {t({ fr: "Contact", ar: "التواصل" })}
            </div>
            <ul className="space-y-3 text-sm text-ink-700/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                <span>{t(RESTAURANT.address as any)}</span>
              </li>
              <li>
                <a href={`tel:${RESTAURANT.phone.tel}`} className="flex items-center gap-2 hover:text-brand-700 transition-colors">
                  <Phone className="w-4 h-4 text-brand-700 flex-shrink-0" />
                  {RESTAURANT.phone.display}
                </a>
              </li>
              <li>
                <a href={`tel:${RESTAURANT.mobile.tel}`} className="flex items-center gap-2 hover:text-brand-700 transition-colors">
                  <Phone className="w-4 h-4 text-brand-700 flex-shrink-0" />
                  {RESTAURANT.mobile.display}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                <span>07:00 — 01:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ink-900/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-700/60">
          <div>
            © {new Date().getFullYear()} {RESTAURANT.name} {RESTAURANT.branch}. {t({ fr: "Tous droits réservés.", ar: "جميع الحقوق محفوظة." })}
          </div>
          <div className="flex items-center gap-1.5">
            {t({ fr: "Fait avec", ar: "صُنع بـ" })}
            <Heart className="w-3.5 h-3.5 fill-brand-700 text-brand-700" />
            {t({ fr: "à Tanger", ar: "في طنجة" })}
          </div>
        </div>
      </div>
    </footer>
  );
}
