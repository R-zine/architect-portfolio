import React from "react";
import Picture1 from "../../assets/CherniVrah26.jpg";
import AnimatedPage from "../AnimatedPage";
import "./Home.css";

const Home = ({ lg }) => {
  return (
    <AnimatedPage>
      <div className="Home">
        <h2 className="buildings">{lg ? "Buildings" : "Архитектура"}</h2>
        <img src={Picture1} alt="Cherni Vrah 26 Picture" className="picture1" />
        <div className="curtain1" />
        <img
          src="../img/furniture/8.jpg"
          alt="Interior Front Page"
          className="picture2"
        />
        <div className="curtain2" />
        <h2 className="interiorDesign">
          {lg ? "Interior Design" : "Интериорни проекти"}
        </h2>
      </div>
    </AnimatedPage>
  );
};

export default Home;
