import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useNavigate, useParams } from "react-router";

import AnimatedPage from "../AnimatedPage";
import GalleryPicture from "./GalleryPicture";
import data, { getCategoryLabel } from "./buildings.js";
import "./Buildings.scss";

function PictureModal({ currentPicture, hide, language }) {
  const buttonRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousFocus = document.activeElement;
    buttonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") hide();
      if (event.key === "Tab") {
        event.preventDefault();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [hide]);

  const alt =
    currentPicture.desc?.[language] ??
    (language ? "Expanded portfolio image" : "Увеличено портфолио изображение");

  return (
    <motion.div
      className="pictureModal"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) hide();
      }}
    >
      <img
        className="modalImg"
        src={currentPicture.full}
        srcSet={currentPicture.srcSet}
        sizes="90vw"
        width={currentPicture.width}
        height={currentPicture.height}
        alt={alt}
        decoding="async"
      />
      <div
        ref={buttonRef}
        role="button"
        tabIndex="0"
        className="modal-btn"
        onClick={hide}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            hide();
          }
        }}
      >
        {language ? "Back" : "Връщане"}
      </div>
    </motion.div>
  );
}

function Gallery({ language, setCategoryLabel, setFooterLabel }) {
  const [currentPicture, setCurrentPicture] = useState(null);
  const { category } = useParams();
  const navigate = useNavigate();
  const pictures = data[category];
  const closeModal = useCallback(() => setCurrentPicture(null), []);

  useEffect(() => {
    if (!pictures) {
      navigate("/", { replace: true });
      return;
    }
    setCategoryLabel(getCategoryLabel(category, language));
    setFooterLabel(["", ""]);
  }, [
    category,
    language,
    navigate,
    pictures,
    setCategoryLabel,
    setFooterLabel,
  ]);

  if (!pictures) return null;

  return (
    <AnimatedPage>
      <main>
        <AnimatePresence>
          {currentPicture && (
            <PictureModal
              currentPicture={currentPicture}
              hide={closeModal}
              language={language}
            />
          )}
        </AnimatePresence>
        <section
          className="Buildings"
          aria-label={getCategoryLabel(category, language)}
        >
          {!currentPicture && (
            <div className="gallery-top-curtain" aria-hidden="true" />
          )}
          {pictures.map((building, index) => (
            <GalleryPicture
              key={building.source}
              order={index}
              building={building}
              language={language}
              setFooterLabel={setFooterLabel}
              openModal={setCurrentPicture}
            />
          ))}
        </section>
      </main>
    </AnimatedPage>
  );
}

export default Gallery;
