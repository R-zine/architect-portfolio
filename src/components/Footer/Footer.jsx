import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";
import logoMobile from "../../assets/logoMobile.png";
import "./footer.css";
import { useTransition, animated } from "react-spring";

const Footer = ({ label, category, mode, lg }) => {
  const [initial, setInitial] = useState(true);

  const bottomLine = !initial && !mode;
  const location = useLocation();

  useEffect(() => {
    mode && document.querySelector(".fl2").classList.add("none");
  }, [mode]);

  const transition1 = useTransition(bottomLine, {
    initial: { width: 400 },
    from: { width: 0, bottom: "78px", left: "calc(74.5vw + 400px)" },
    enter: { width: 400, left: "calc(74.5vw + 0px)" },
    leave: { width: 0, left: "calc(74.5vw + 400px)" },
    exitBeforeEnter: true,
    config: { duration: 500 },
  });

  useEffect(() => {
    setTimeout(() => {
      const fl1 = document.querySelector(".fl1");
      const fl2 = document.querySelector(".fl2");
      fl1.classList.remove("transitionfl1");
      setInitial(false);
      setTimeout(() => {
        fl1.classList.add("transitionfl11");
        fl2.classList.remove("transitionfl2");

        setTimeout(() => {
          fl1.classList.add("none");
        }, 1000);
      }, 1000);
    }, 250);
  }, []);

  return (
    <div className="Footer">
      <div className="fl1 transitionfl1" />
      <div className="fl2 transitionfl2" />
      {transition1((style, item) =>
        item ? (
          <animated.div style={style} className="fl1 transitionfl11" />
        ) : null
      )}

      <img className="logo" src={logo} />
      <div className="footer-banner">
        {location.pathname === "/gallery" && category ? category : label[lg]}
        &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <img className="logo-mobile" src={logoMobile} />
      <div className="footer-curtain" />
    </div>
  );
};

export default Footer;
