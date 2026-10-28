import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";

export default function PageWipe() {
  const { pathname } = useLocation();
  const controls = useAnimationControls();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    controls.set({ scaleY: 1, originY: 0 });
    controls.start({ scaleY: 0, originY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } });
  }, [pathname, controls]);

  return (
    <motion.div
      aria-hidden
      initial={{ scaleY: 0 }}
      animate={controls}
      className="pointer-events-none fixed inset-0 z-[90] origin-top bg-accent"
    />
  );
}
