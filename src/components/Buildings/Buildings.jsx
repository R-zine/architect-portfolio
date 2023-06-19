import React, { useEffect } from "react";
import GalleryPicture from "./GalleryPicture";
import data from "./buildings.js";
import { useNavigate } from "react-router-dom";
import "./Buildings.scss";
import { useState } from "react";
import { useTransition, animated } from "react-spring";
import AnimatedPage from "../AnimatedPage";

const PictureModal = (props) => {
  const modalTransition = useTransition(props.show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      {modalTransition((style, item) => {
        if (item)
          return (
            <animated.div style={style} className="pictureModal">
              <img className="modalImg" src={props.currentPicture} />
              <div className="modal-btn" onClick={() => props.hide(false)}>
                {props.lg ? "Back" : "Връщане"}
              </div>
            </animated.div>
          );
      })}
    </>
  );
};

const Gallery = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [mount, setMount] = useState(true);
  const [currentPicture, setCurrentPicture] = useState("");

  const navigate = useNavigate();

  const backHome = () => {
    if (!show) navigate("../", { replace: true });
  };

  useEffect(() => {
    setShow(mount && props.page && !modalShow);
    if (!props.page && mount) setTimeout(() => backHome(), 200);
  }, [props, modalShow, mount]);

  return (
    <AnimatedPage>
      <PictureModal
        show={modalShow}
        currentPicture={currentPicture}
        hide={setModalShow}
        lg={props.lg}
      />

      <div
        className="Buildings"
        onClick={() => modalShow && setModalShow(false)}
      >
        {!modalShow && <div className="gallery-top-curtain" />}
        {show &&
          data[props.page].map((b, i) => (
            <GalleryPicture
              key={i}
              order={i}
              building={b}
              setFooter={props.setFooter}
              setCategory={props.setCategory}
              setPage={props.setCurrentPage}
              openModal={setModalShow}
              setPicture={setCurrentPicture}
              setMount={setMount}
              lg={props.lg}
            />
          ))}
      </div>
    </AnimatedPage>
  );
};

export default Gallery;
