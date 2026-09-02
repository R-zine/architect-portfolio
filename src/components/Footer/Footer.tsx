import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocation } from "react-router";

import logo from "../../assets/logo.png";
import logoMobile from "../../assets/logoMobile.png";
import type { Language, LocalizedText } from "../../types";
import "./footer.css";

interface FooterProps {
  label: LocalizedText;
  category: string;
  mode: boolean;
  language: Language;
}

function Footer({ label, category, mode, language }: FooterProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(mode || reduceMotion);
  const travelDuration = 3;
  const horizontalDuration = 0.5;
  const horizontalDelay =
    reduceMotion || mode
      ? 0
      : introComplete
        ? travelDuration - horizontalDuration
        : 1.25;
  const verticalTransition = mode
    ? { delay: 0, duration: 0 }
    : introComplete
      ? { delay: reduceMotion ? 0 : travelDuration, duration: 0 }
      : {
          delay: reduceMotion ? 0 : 1.25,
          duration: reduceMotion ? 0 : 1,
        };
  const displayLabel =
    location.pathname.startsWith("/gallery/") && category
      ? category
      : (label?.[language] ?? "");

  return (
    <footer className="Footer">
      <motion.div
        aria-hidden="true"
        className="fl1 transitionfl11"
        initial={{
          width: 0,
          left: "calc(74.5vw + 400px)",
          bottom: "78px",
        }}
        animate={{
          width: mode ? 0 : 400,
          left: mode ? "calc(74.5vw + 400px)" : "74.5vw",
          bottom: "30px",
        }}
        transition={{
          delay: horizontalDelay,
          duration: reduceMotion ? 0 : horizontalDuration,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="fl2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: mode ? 0 : 1 }}
        transition={verticalTransition}
        style={{ transformOrigin: "bottom" }}
        onAnimationComplete={() => {
          if (!mode) setIntroComplete(true);
        }}
      />
      <img className="logo" src={logo} alt="Diana Radeva" />
      <div className="footer-banner" aria-live="polite">
        {displayLabel}&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <img className="logo-mobile" src={logoMobile} alt="Diana Radeva" />
      <div className="footer-curtain" aria-hidden="true" />
    </footer>
  );
}

export default Footer;
