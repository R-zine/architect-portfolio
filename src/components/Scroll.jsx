import React from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";

const Scroll = ({ mode }) => {
  useEffect(() => {
    mode
      ? document.querySelector(".Scroll").classList.add("transform")
      : document.querySelector(".Scroll").classList.remove("transform");

    if (mode)
      setTimeout(() => {
        document.querySelector(".Scroll").style = { opacity: 0 };
      }, 2000);
  }, [mode]);
  return <div className="Scroll"></div>;
};

export default Scroll;
