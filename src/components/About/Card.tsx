import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect } from "react";
import type { CSSPropertiesWithVariables } from "../../types";

interface CardProps {
  num: number;
  text: string;
  id: number;
}

function Card({ num, text, id }: CardProps) {
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

  const style: CSSPropertiesWithVariables = { "--animation-order": id };

  return (
    <div className="Card" style={style}>
      <motion.span className="number">{displayValue}</motion.span>
      <div className="cardText">{text}</div>
    </div>
  );
}

export default Card;
