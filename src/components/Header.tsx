import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "../context/LangContext";
import { NAV_LINKS, RESTAURANT } from "../data/restaurant";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { lang, toggleLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
  }, [isMobileOpen]);

  const handleNavClick = (id: string) => {
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-cream-50/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-lg shadow-brand-700/20 group-hover:shadow-brand-700/40 transition-shadow">
                  <span className="font-display text-white font-bold text-sm md:text-base">FR</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-cream-50" />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className={`font-display text-sm md:text-base font-semibold ${isScrolled ? "text-ink-900" : "text-white drop-shadow-sm"} transition-colors`}>
                  Fruits Rouges
                </div>
                <div className={`text-[10px] md:text-xs uppercase tracking-[0.2em] ${isScrolled ? "text-brand-700" : "text-cream-200"} transition-colors`}>
                  {RESTAURANT.branch} · Tanger
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium transition-colors relative group ${
                    isScrolled ? "text-ink-800 hover:text-brand-700" : "text-white/90 hover:text-white"
                  }`}
                >
                  {t(link.label)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-700 transition-all group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={toggleLang}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isScrolled
                    ? "border-ink-900/10 text-ink-800 hover:bg-ink-900 hover:text-white"
                    : "border-white/30 text-white hover:bg-white/10"
                }`}
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{lang === "fr" ? "العربية" : "FR"}</span>
              </button>

              <a
                href={`tel:${RESTAURANT.phone.tel}`}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors shadow-lg shadow-brand-700/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {lang === "fr" ? "Appeler" : "اتصل"}
              </a>

              <button
                onClick={() => setIsMobileOpen(true)}
                className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isScrolled ? "text-ink-900 hover:bg-ink-900/5" : "text-white hover:bg-white/10"
                }`}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-ink-900/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: lang === "ar" ? -400 : 400 }}
              animate={{ x: 0 }}
              exit={{ x: lang === "ar" ? -400 : 400 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 bottom-0 z-[70] w-[85%] max-w-sm bg-cream-50 lg:hidden shadow-2xl"
              style={{ [lang === "ar" ? "left" : "right"]: 0 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-ink-900/5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-brand-700 flex items-center justify-center">
                    <span className="font-display text-white font-bold text-sm">FR</span>
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-ink-900">Fruits Rouges</div>
                    <div className="text-[10px] uppercase tracking-widest text-brand-700">{RESTAURANT.branch}</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-10 h-10 rounded-full hover:bg-ink-900/5 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-5 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: lang === "ar" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.id)}
                    className="text-start px-4 py-3 rounded-xl hover:bg-brand-50 text-ink-900 font-medium text-lg transition-colors"
                  >
                    {t(link.label)}
                  </motion.button>
                ))}
                <div className="mt-4 pt-4 border-t border-ink-900/5 space-y-2">
                  <a
                    href={`tel:${RESTAURANT.phone.tel}`}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full bg-brand-700 text-white font-medium hover:bg-brand-800 transition-colors"
                  >
                    {lang === "fr" ? "Appeler" : "اتصل"} · {RESTAURANT.phone.display}
                  </a>
                  <a
                    href={`https://wa.me/${RESTAURANT.mobile.tel.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                  >
                    WhatsApp · {RESTAURANT.mobile.display}
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
