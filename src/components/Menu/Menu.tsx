import { useEffect, useState } from "react";
import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NavLink, useLocation } from "react-router";

import type { Language, LocalizedText } from "../../types";
import "./menu.css";

interface MenuItem {
  id: string;
  to: string;
  end?: boolean;
  label: LocalizedText;
}

interface MenuProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

const menuItems: readonly MenuItem[] = [
  { id: "home", to: "/", end: true, label: ["Начало", "Home Page"] },
  { id: "about", to: "/about", label: ["За мен", "About"] },
  {
    id: "buildings",
    to: "/gallery/buildings",
    label: ["Архитектура", "Buildings"],
  },
  {
    id: "interior",
    to: "/gallery/interior",
    label: ["Интериори", "Interior Design"],
  },
  {
    id: "furniture",
    to: "/gallery/furniture",
    label: ["Мебели", "Furniture"],
  },
  { id: "contact", to: "/contact", label: ["Контакти", "Contact"] },
];

function Menu({ setLanguage, language }: MenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const galleryFrame = location.pathname.startsWith("/gallery/");
  const [introComplete, setIntroComplete] = useState(galleryFrame);
  const frameOpen = menuOpen || galleryFrame;
  const duration = reduceMotion ? 0 : 0.35;
  const bendDuration = reduceMotion ? 0 : 0.3;
  const snakeDuration = reduceMotion ? 0 : 0.5;
  const tailRetracted = menuOpen || isHovered;

  const activateWithKeyboard = (
    event: KeyboardEvent<HTMLElement>,
    action: () => void,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(
      () => setLoaded(true),
      reduceMotion ? 0 : 1500,
    );
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <nav
      className="Menu"
      aria-label={language ? "Main navigation" : "Основна навигация"}
    >
      <div
        role="button"
        tabIndex={0}
        className="language-btn"
        onClick={() => setLanguage((current) => (current ? 0 : 1))}
        onKeyDown={(event) =>
          activateWithKeyboard(event, () =>
            setLanguage((current) => (current ? 0 : 1)),
          )
        }
        aria-label={language ? "Превключи на български" : "Switch to English"}
      >
        {language ? "bg" : "en"}
      </div>
      <div className="curtain" aria-hidden="true" />
      <div
        role="button"
        tabIndex={0}
        className={
          menuOpen ? "menu--main--btn menu-btn-open" : "menu--main--btn"
        }
        aria-expanded={menuOpen}
        aria-controls="portfolio-menu-items"
        aria-label={language ? "Toggle menu" : "Отвори или затвори менюто"}
        onClick={() => setMenuOpen((current) => !current)}
        onKeyDown={(event) =>
          activateWithKeyboard(event, () => setMenuOpen((current) => !current))
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {language ? "menu" : "меню"}
        <AnimatePresence>
          {frameOpen && (
            <motion.div
              className="l1"
              initial={galleryFrame ? false : { width: 0 }}
              animate={{ width: "93.5vw" }}
              exit={{ width: 0 }}
              transition={{ duration }}
            />
          )}
        </AnimatePresence>
        <motion.div
          className="l2"
          initial={galleryFrame ? false : { height: 0, top: 58 }}
          animate={
            frameOpen || isHovered
              ? { height: 58, top: 0 }
              : { height: 0, top: 58 }
          }
          transition={{
            delay: frameOpen || isHovered || reduceMotion ? 0 : 0.5,
            duration,
          }}
        />
        {loaded && !galleryFrame && (
          <>
            <motion.div
              className="l3"
              initial={
                introComplete ? { left: 0, width: 0 } : { left: 650, width: 0 }
              }
              animate={{ left: 0, width: menuOpen ? 0 : 650 }}
              transition={
                introComplete
                  ? {
                      delay: menuOpen && !reduceMotion ? 0.3 : 0,
                      duration: snakeDuration,
                      ease: "easeOut",
                    }
                  : {
                      delay: reduceMotion ? 0 : 2 * snakeDuration,
                      duration: snakeDuration,
                      ease: "easeOut",
                    }
              }
              onAnimationComplete={() => setIntroComplete(true)}
            />
            <motion.div
              className="l4"
              initial={
                introComplete ? { height: 0, top: 58 } : { height: 0, top: 106 }
              }
              animate={{ height: menuOpen ? 0 : 50, top: 58 }}
              transition={
                introComplete
                  ? {
                      delay: menuOpen || reduceMotion ? 0 : snakeDuration,
                      duration: menuOpen ? bendDuration : snakeDuration,
                      ease: "easeOut",
                    }
                  : {
                      delay: reduceMotion ? 0 : snakeDuration,
                      duration: snakeDuration,
                      ease: "easeOut",
                    }
              }
            />
            <motion.div
              className="l5"
              initial={
                introComplete
                  ? { left: 650, width: 0 }
                  : { left: 480, width: 0 }
              }
              animate={
                tailRetracted
                  ? { left: 650, width: 0 }
                  : { left: 480, width: 170 }
              }
              transition={{
                delay:
                  introComplete && !tailRetracted && !reduceMotion
                    ? 2 * snakeDuration
                    : 0,
                duration: snakeDuration,
                ease: "easeOut",
              }}
            />
          </>
        )}
      </div>
      <motion.div
        aria-hidden="true"
        className="mobile-curtain"
        animate={{ height: menuOpen ? 214 : 1 }}
        transition={{ duration }}
      />
      <div
        className={menuOpen ? "menu-bg bg-open" : "menu-bg"}
        aria-hidden="true"
      />
      <div className="btn-container" id="portfolio-menu-items">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            id={item.id}
            end={item.end}
            to={item.to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `menu--item--btn${menuOpen || isActive ? " menu-open" : ""}`
            }
            style={{ display: "block", opacity: 1, textDecoration: "none" }}
            tabIndex={menuOpen ? 0 : -1}
          >
            {item.label[language]}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Menu;
