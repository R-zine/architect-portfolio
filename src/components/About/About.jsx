import React from "react";
import { useEffect } from "react";
import AnimatedPage from "../AnimatedPage";
import Card from "./Card";
import Typewriter from "typewriter-effect/dist/core";
import "./about.css";

const About = ({ lg }) => {
  const Cards = [
    { num: 40, label: ["Проектирани сгради", "Buildings Completed"] },
    { num: 200, label: ["Интериорни разработки", "Interior Projects"] },
    { num: 150000, label: ["кв.м. разгъната площ", "sq.m. of built area"] },
  ];

  useEffect(() => {
    const text = document.querySelector(".text");

    let typewriter = new Typewriter(text, {
      loop: false,
      delay: 75,
    });

    typewriter
      .pauseFor(2500)
      .typeString(lg ? "Hi! My name is Diana." : "Здравей! Аз съм Диана.")
      .pauseFor(300)

      .start();
  }, [lg]);

  return (
    <AnimatedPage>
      <div className="About">
        <div className="profile">
          <div className="texts">
            <div className="text" />
            <p>
              {lg
                ? "I graduated Architecture in 1992 and ever since I've been working in the field. Regardless of whether I'm designing a building or a child's room, I challenge myself to find the balance between functionality, estetics, ergonomics, and practicality - both for the end-user and the contractor. My experience in both a construction and a furniture companies gives me a wide view on all aspects of a project: starting from valuating a construction plot, through building on it, all the way to furnishing the ready estate as per the wishes of the clients."
                : "Завърших архитектура във ВИАС през 1992г. и от тогава работя по специалността. Независимо дали проектирам голяма сграда или детска стая, за мен е предизвикателство да намеря баланса между функционалност, естетика, ергономия и практичност - както за ползвателя, така и за изпълнителя. Опитът ми в строителна и мебелна компания ми дават поглед върху всички аспекти на един проект от пазарното оценяване на парцела, през строителството върху него, до обзавеждането на имотите по желание на клиентите."}
            </p>
          </div>

          <img className="about-img" src="../img/profile.jpg" />
        </div>
        <div className="cards">
          {Cards.map((c, i) => (
            <Card id={i} key={i} num={c.num} text={c.label[lg]} />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default About;
