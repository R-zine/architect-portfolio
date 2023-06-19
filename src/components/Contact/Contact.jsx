import { Suspense } from "react";
import AnimatedPage from "../AnimatedPage";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Model } from "./assets/Model";
import "./contact.css";
import { useEffect } from "react";


const Contact = () => {
  useEffect(() => {
    setTimeout(() => {
      const icons = document.querySelectorAll(".icon-cont");
      icons.forEach((icon, i) => {
        setTimeout(() => {
          icon.classList.add("show");
        }, 600 * i);
      });
    }, 600);
  }, []);
  return (
    <AnimatedPage>
      <div className="Contact">
        <Canvas
          shadows
          camera={{
            fov: 50,
          }}
        >
          <Suspense fallback={null}>
            <Stage
              preset="rembrandt"
              intensity={0.8}
              environment="city"
              contactShadow
              shadows
            >
              <Model scale={0.2} />
              <OrbitControls
                makeDefault
                autoRotate
                autoRotateSpeed={1.5}
                target={(0, 0, 0)}
                enablePan={false}
                enableZoom={false}
                maxPolarAngle={1.2}
              />
            </Stage>
          </Suspense>
        </Canvas>
      </div>
      <div className="icons">
        <div
          className="icon-cont"
          onClick={() => (window.location = "tel:+359894696679")}
        >
          <img src="./assets/phone.svg" />
          <div className="phone">+359 894 696679</div>
        </div>

        <div
          className="icon-cont"
          onClick={() => (window.location = "mailto:globalarh@abv.bg")}
        >
          <img src="./assets/envelope.svg" />
          <div className="email">globalarh@abv.bg</div>
        </div>

        <div
          className="icon-cont"
          onClick={() =>
            window.open("https://www.linkedin.com/in/diana-radeva/", "_blank")
          }
        >
          <img src="./assets/linkedin.svg" />
          <div className="linked">@diana-radeva</div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Contact;
