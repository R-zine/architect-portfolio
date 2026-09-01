import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

function Card({ num, text, id }) {
  const reduceMotion = useReducedMotion();
  const value = useMotionValue(reduceMotion ? num : 0);
  const displayValue = useTransform(
    value,
    (latest) => `${Math.round(latest).toLocaleString("bg-BG")}+`,
  );

  useEffect(() => {
    if (reduceMotion) {
      value.set(num);
      return undefined;
    }

    const controls = animate(value, num, {
      delay: 0.35 * id,
      duration: 1.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [id, num, reduceMotion, value]);

  return (
    <div className="Card" style={{ "--animation-order": id }}>
      <motion.span className="number">{displayValue}</motion.span>
      <div className="cardText">{text}</div>
    </div>
  );
}

export default Card;
