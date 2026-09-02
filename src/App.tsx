import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Navigate, Route, Routes, useLocation } from "react-router";

import "./App.css";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Scroll from "./components/Scroll";
import type { Language, LocalizedText } from "./types";

const About = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Gallery = lazy(() => import("./components/Buildings/Buildings"));
const Home = lazy(() => import("./components/Home/Home"));

function App() {
  const [footerLabel, setFooterLabel] = useState<LocalizedText>(["", ""]);
  const [categoryLabel, setCategoryLabel] = useState("");
  const [language, setLanguage] = useState<Language>(1);
  const location = useLocation();
  const galleryMode = location.pathname.startsWith("/gallery/");

  useEffect(() => {
    document.documentElement.lang = language ? "en" : "bg";
  }, [language]);

  return (
    <div className="App">
      <Menu language={language} setLanguage={setLanguage} />
      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/about" element={<About language={language} />} />
            <Route path="/contact" element={<Contact language={language} />} />
            <Route
              path="/gallery/:category"
              element={
                <Gallery
                  language={language}
                  setCategoryLabel={setCategoryLabel}
                  setFooterLabel={setFooterLabel}
                />
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Scroll mode={galleryMode} />
      <Footer
        category={galleryMode ? categoryLabel : ""}
        label={galleryMode ? footerLabel : ["", ""]}
        mode={galleryMode}
        language={language}
      />
    </div>
  );
}

export default App;
