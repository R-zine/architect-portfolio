import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useNavigate, useParams } from "react-router";

import type { GalleryItem, Language, LocalizedText } from "../../types";
import AnimatedPage from "../AnimatedPage";
import GalleryPicture from "./GalleryPicture";
import data, { getCategoryLabel } from "./galleryData";
import "./Buildings.scss";

interface PictureModalProps {
  currentPicture: GalleryItem;
  hide: () => void;
  language: Language;
}

interface GalleryProps {
  language: Language;
  setCategoryLabel: Dispatch<SetStateAction<string>>;
  setFooterLabel: Dispatch<SetStateAction<LocalizedText>>;
}

function PictureModal({ currentPicture, hide, language }: PictureModalProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    buttonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") hide();
      if (event.key === "Tab") {
        event.preventDefault();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
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
        tabIndex={0}
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

function Gallery({ language, setCategoryLabel, setFooterLabel }: GalleryProps) {
  const [currentPicture, setCurrentPicture] = useState<GalleryItem | null>(
    null,
  );
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const pictures = category ? data[category] : undefined;
  const closeModal = useCallback(() => setCurrentPicture(null), []);

  useEffect(() => {
    if (!category || !pictures) {
      void navigate("/", { replace: true });
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

  if (!category || !pictures) return null;

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
