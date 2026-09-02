import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedPageProps {
  children: ReactNode;
}

function AnimatedPage({ children }: AnimatedPageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 1.5 }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;
