import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./menu.css";
import gsap from "gsap";
import { useTransition, animated, Globals } from "react-spring";

const Menu = ({ setCurrentPage, setCategory, setGalleryMode, setLg, lg }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("home");

  let screenSize = window.innerWidth;
  const location = useLocation();

  Globals.assign({
    frameLoop: "always",
  });

  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => setLoaded(true), 1500);
    });
  }, []);

  useEffect(() => {
    const btns = document.querySelectorAll(".menu--item--btn");

    btns.forEach((x) => x.id === currentRoute && x.classList.add("menu-open"));
  }, [currentRoute, menuOpen]);

  const leftLine = isHovered || menuOpen;
  const isGallery = location.pathname !== "/gallery" && loaded;

  const transition1 = useTransition(menuOpen, {
    from: { width: 0 },
    enter: { width: 0.935 * screenSize },
    leave: { width: 0 },
  });

  const transition2 = useTransition(leftLine, {
    from: { height: 0, top: 58 },
    enter: { height: 58, top: 0 },
    leave: { height: 0, top: 58, delay: 500 },
  });

  const mobileTransition = useTransition(menuOpen, {
    from: { height: 1 },
    enter: { height: 214 },
    leave: { height: 1 },
  });

  const secondAnim = (direction) => {
    if (direction) {
      gsap.to(".l4", { height: 0, duration: 0.3 });
      gsap.to(".l3", { width: 0, delay: 0.3 });
    } else {
      gsap.to(".l3", { width: 650, duration: 0.3 });
      gsap.to(".l4", { height: 50, delay: 0.3 });
    }
  };

  useEffect(() => {
    if (loaded) {
      const l3 = document.querySelector(".l3");
      const l4 = document.querySelector(".l4");
      const l5 = document.querySelector(".l5");

      const lineAnime = gsap.timeline();
      lineAnime
        .from(l5, { width: 0 })
        .from(l4, { height: 0, top: 106 })
        .from(l3, { width: 0, left: 650 });

      lineAnime.play();

      setTimeout(() => {}, 1500);
    }
  }, [loaded]);

  const navigate = useNavigate();

  const handleClick = (name) => {
    setCurrentPage(name);
    setCurrentRoute(name);
    setMenuOpen(false);
    setIsHovered(false);
    setCategory("");
    setGalleryMode(true);
    navigate(`/gallery`, { replace: true });
  };

  return (
    <div className="Menu">
      <div className="language-btn" onClick={() => setLg((p) => (p ? 0 : 1))}>
        {lg ? "bg" : "en"}
      </div>
      <div className="curtain" />
      <div
        className={
          menuOpen ? "menu--main--btn menu-btn-open" : "menu--main--btn"
        }
        onClick={() => {
          setMenuOpen((p) => !p);
          secondAnim(!menuOpen);
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          !menuOpen && gsap.to(".l5", { width: 0, left: 650 });
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          !menuOpen &&
            gsap.to(".l5", {
              width: 170,
              left: 480,
              delay: 0.5,
            });
        }}
      >
        {lg ? "menu" : "меню"}
        {transition1((style, item) =>
          item ? <animated.div style={style} className="l1" /> : null
        )}
        {transition2((style, item) =>
          item ? <animated.div style={style} className="l2" /> : null
        )}
        {isGallery && <div className="l3" />}
        {isGallery && <div className="l4" />}
        {isGallery && <div className="l5" />}
        {location.pathname === "/gallery" && <div className="l1" />}
        {location.pathname === "/gallery" && <div className="l2" />}
      </div>
      {mobileTransition((style, item) =>
        item ? <animated.div style={style} className="mobile-curtain" /> : null
      )}
      <div className={menuOpen ? "menu-bg bg-open" : "menu-bg"} />
      <div className="btn-container">
        <div
          id="home"
          onClick={() => {
            navigate("./", { replace: true });
            setMenuOpen(false);
            setCategory("");
            setGalleryMode(false);
            setCurrentRoute("home");
            secondAnim(!menuOpen);
            gsap.to(".l5", {
              width: 170,
              left: 480,
              delay: 0.5,
            });
          }}
          className={menuOpen ? "menu--item--btn menu-open" : "menu--item--btn"}
        >
          {lg ? "Home Page" : "Начало"}
        </div>
        <div
          id="about"
          onClick={() => {
            navigate("./about", { replace: true });
            setMenuOpen(false);
            setCategory("");
            setGalleryMode(false);
            setCurrentRoute("about");
            secondAnim(!menuOpen);
            gsap.to(".l5", {
              width: 170,
              left: 480,
              delay: 0.5,
            });
          }}
          className={menuOpen ? "menu--item--btn menu-open" : "menu--item--btn"}
        >
          {lg ? "About" : "За мен"}
        </div>
        <div
          id="buildings"
          onClick={(e) => handleClick(e.target.id)}
          className={menuOpen ? "menu--item--btn menu-open" : "menu--item--btn"}
        >
          {lg ? "Buildings" : "Архитектура"}
        </div>
        <div
          id="interior"
          onClick={(e) => handleClick(e.target.id)}
          className={menuOpen ? "menu--item--btn menu-open" : "menu--item--btn"}
        >
          {lg ? "Interior Design" : "Интериори"}
        </div>
        <div
          id="furniture"
          onClick={(e) => handleClick(e.target.id)}
          className={menuOpen ? "menu--item--btn menu-open" : "menu--item--btn"}
        >
          {lg ? "Furniture" : "Мебели"}
        </div>
        <div
          id="contact"
          onClick={() => {
            navigate("./contact", { replace: true });
            setMenuOpen(false);
            setIsHovered(false);
            setCategory("");
            setGalleryMode(false);
            setCurrentRoute("contact");
            secondAnim(!menuOpen);
            gsap.to(".l5", {
              width: 170,
              left: 480,
              delay: 0.5,
            });
          }}
          className={menuOpen ? "menu--item--btn menu-open" : "menu--item--btn"}
        >
          {lg ? "Contact" : "Контакти"}
        </div>
      </div>
    </div>
  );
};

export default Menu;
