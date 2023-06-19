import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Gallery from "./components/Buildings/Buildings.jsx";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Scroll from "./components/Scroll";

function App() {
  const [currentPage, setCurrentPage] = useState("");
  const [footer, setFooter] = useState("");
  const [category, setCategory] = useState("");
  const [galleryMode, setGalleryMode] = useState(false);
  const [lg, setLg] = useState(1);

  const location = useLocation();

  return (
    <div className="App">
      <Menu
        setCurrentPage={setCurrentPage}
        setCategory={setCategory}
        setGalleryMode={setGalleryMode}
        setLg={setLg}
        lg={lg}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home lg={lg} />} />
          <Route path="/about" element={<About lg={lg} />} />
          <Route path="/contact" element={<Contact lg={lg} />} />
          <Route
            path="/gallery"
            element={
              <Gallery
                page={currentPage}
                setCurrentPage={setCurrentPage}
                setFooter={setFooter}
                setCategory={setCategory}
                lg={lg}
              />
            }
          />
          <Route path="*" element={<Home lg={lg} />} />
        </Routes>
      </AnimatePresence>
      <Scroll mode={galleryMode} />
      <Footer label={footer} category={category} mode={galleryMode} lg={lg} />
    </div>
  );
}

export default App;
