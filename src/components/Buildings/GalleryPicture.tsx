import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useReducedMotion } from "motion/react";
import { useNavigate } from "react-router";

import type {
  CSSPropertiesWithVariables,
  GalleryItem,
  Language,
  LocalizedText,
} from "../../types";

interface GalleryPictureProps {
  building: GalleryItem;
  language: Language;
  openModal: Dispatch<SetStateAction<GalleryItem | null>>;
  order: number;
  setFooterLabel: Dispatch<SetStateAction<LocalizedText>>;
}

function GalleryPicture({
  building,
  language,
  openModal,
  order,
  setFooterLabel,
}: GalleryPictureProps) {
  const navigate = useNavigate();
  const revealRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const supportsIntersectionObserver =
    typeof IntersectionObserver !== "undefined";
  const label =
    building.desc?.[language] ??
    (language ? "Open portfolio image" : "Отвори портфолио изображение");

  const open = () => {
    if (building.path === "none") openModal(building);
    else void navigate(`/gallery/${building.path}`);
  };

  useEffect(() => {
    const picture = revealRef.current;
    if (reduceMotion || !supportsIntersectionObserver || !picture) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsVisible(entry.isIntersecting);
      },
      {
        root: picture.closest(".Buildings"),
        rootMargin: "-150px 0px",
      },
    );

    observer.observe(picture);
    return () => observer.disconnect();
  }, [reduceMotion, supportsIntersectionObserver]);

  const revealPicture =
    reduceMotion || !supportsIntersectionObserver || isVisible;
  const animationStyle: CSSPropertiesWithVariables = {
    "--animation-order": order,
  };

  return (
    <article
      ref={revealRef}
      className={`animated ${revealPicture ? "fadeIn" : "fadeOut"}`}
    >
      {building.desc && (
        <div className="mobile-label">{building.desc[language]}</div>
      )}
      <div className="BuildingPicture" style={animationStyle}>
        <div className="box">
          <div
            role="button"
            tabIndex={0}
            className="box-inner"
            aria-label={label}
            onMouseEnter={() => {
              if (building.desc) setFooterLabel(building.desc);
            }}
            onMouseLeave={() => setFooterLabel(["", ""])}
            onFocus={() => {
              if (building.desc) setFooterLabel(building.desc);
            }}
            onBlur={() => setFooterLabel(["", ""])}
            onClick={open}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open();
              }
            }}
          >
            <img
              src={building.img}
              srcSet={building.srcSet}
              sizes="400px"
              width={building.width}
              height={building.height}
              alt={building.desc?.[language] ?? ""}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default GalleryPicture;
