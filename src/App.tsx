import { LangProvider } from "./context/LangContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Menu from "./components/Menu";
import SignatureDishes from "./components/SignatureDishes";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-cream-50 text-ink-900 overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <Highlights />
          <SignatureDishes />
          <Menu />
          <About />
          <Gallery />
          <Reviews />
          <Location />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
