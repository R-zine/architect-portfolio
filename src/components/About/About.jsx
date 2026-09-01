import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { getGalleryAsset } from "../../utils/galleryAssets";
import AnimatedPage from "../AnimatedPage";
import Card from "./Card";
import "./about.css";

const cards = [
  { num: 40, label: ["Проектирани сгради", "Buildings Completed"] },
  { num: 200, label: ["Интериорни разработки", "Interior Projects"] },
  { num: 150000, label: ["кв.м. разгъната площ", "sq.m. of built area"] },
];

const biography = [
  "Завърших архитектура във ВИАС през 1992 г. и оттогава работя по специалността. Независимо дали проектирам голяма сграда или детска стая, за мен е предизвикателство да намеря баланса между функционалност, естетика, ергономия и практичност — както за ползвателя, така и за изпълнителя. Опитът ми в строителна и мебелна компания ми дава поглед върху всички аспекти на един проект: от пазарното оценяване на парцела, през строителството върху него, до обзавеждането на имота според желанията на клиентите.",
  "I graduated in Architecture in 1992 and have worked in the field ever since. Whether I am designing a building or a child's room, I look for the balance between functionality, aesthetics, ergonomics, and practicality — for both the end user and the contractor. My experience in construction and furniture companies gives me a broad view of every project, from evaluating a plot and building on it to furnishing the completed property around the client's needs.",
];

const profileImage = getGalleryAsset("./img/profile.jpg");

function TypewriterText({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="text" role="heading" aria-level="1" aria-label={children}>
      {reduceMotion ? (
        children
      ) : (
        <AnimatedTypewriter key={children} text={children} />
      )}
    </div>
  );
}

function AnimatedTypewriter({ text: completeText }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    let interval;
    const startTimer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1;
        setText(completeText.slice(0, index));
        if (index >= completeText.length) window.clearInterval(interval);
      }, 55);
    }, 500);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(interval);
    };
  }, [completeText]);

  return text;
}

function About({ language }) {
  const greeting = language
    ? "Hi! My name is Diana."
    : "Здравей! Аз съм Диана.";

  return (
    <AnimatedPage>
      <main
        className="About"
        tabIndex="0"
        aria-label={language ? "About Diana Radeva" : "За Диана Радева"}
      >
        <section className="profile" aria-labelledby="about-heading">
          <div className="texts">
            <TypewriterText>{greeting}</TypewriterText>
            <p id="about-heading">{biography[language]}</p>
          </div>
          <img
            className="about-img"
            src={profileImage.src}
            srcSet={profileImage.srcSet}
            sizes="210px"
            width={profileImage.width}
            height={profileImage.height}
            alt={
              language
                ? "Portrait of architect Diana Radeva"
                : "Портрет на архитект Диана Радева"
            }
            loading="lazy"
            decoding="async"
          />
        </section>
        <section
          className="cards"
          aria-label={language ? "Experience" : "Опит"}
        >
          {cards.map((card, index) => (
            <Card
              id={index}
              key={card.label[1]}
              num={card.num}
              text={card.label[language]}
            />
          ))}
        </section>
      </main>
    </AnimatedPage>
  );
}

export default About;
