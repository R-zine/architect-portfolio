import React from "react";
import { useEffect, useState } from "react";

import ScrollAnimation from "react-animate-on-scroll";

const GalleryPicture = (props) => {
  return (
    <ScrollAnimation
      animateIn="fadeIn"
      animateOut="fadeOut"
      scrollableParentSelector=".Buildings"
    >
      {props.building.desc && (
        <div className="mobile-label">
          {props.building.desc && props.building.desc[props.lg]}
        </div>
      )}
      <div
        className="BuildingPicture"
        style={{ "--animation-order": props.order }}
      >
        <div className="box">
          <div
            className="box-inner"
            onMouseEnter={() => {
              if (props.building.desc) props.setFooter(props.building.desc);
            }}
            onMouseLeave={() => props.setFooter("")}
            onClick={(e) => {
              const mainDiv = document.querySelector(".Buildings");
              mainDiv.classList.toggle("transition");

              props.building.desc &&
                props.setCategory(props.building.desc[props.lg]);

              setTimeout(() => mainDiv.classList.toggle("transition"), 400);
              setTimeout(() => {
                if (e.target.id === "none") {
                  props.setPicture(e.target.src);
                  props.openModal(true);
                } else {
                  console.log(e.target.id);
                  setTimeout(() => props.setMount(true), 400);
                  setTimeout(() => props.setMount(false), 200);
                  setTimeout(() => props.setPage(e.target.id), 300);
                }
              }, 200);
            }}
          >
            <img src={props.building.img} id={props.building.path} />
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default GalleryPicture;
