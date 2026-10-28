import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [visible, setVisible] = useState(false);
  const [dashoffset, setDashoffset] = useState(CIRCUMFERENCE);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.08);
  });
  useMotionValueEvent(progress, "change", (v) => {
    setDashoffset(CIRCUMFERENCE * (1 - v));
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-charcoal/90 text-white shadow-lg backdrop-blur lg:bottom-8"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
        <circle cx="20" cy="20" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <circle
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke="#f2590c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashoffset}
        />
      </svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </motion.button>
  );
}
