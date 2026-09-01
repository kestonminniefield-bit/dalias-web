import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Highlights } from "./components/Highlights";
import { MenuSection } from "./components/MenuSection";
import { VisitSection } from "./components/VisitSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingCall } from "./components/FloatingCall";
import Admin from "./pages/Admin";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Highlights />
        <MenuSection />
        <VisitSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCall />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Toaster position="bottom-center" richColors />
    </BrowserRouter>
  );
}

export default App;
