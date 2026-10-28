import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    function handleMove(e: MouseEvent) {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest('a, button, [role="button"], input, textarea, select'));
    }
    function handleLeave() {
      setVisible(false);
    }
    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full bg-white mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovering ? 44 : 12,
        height: hovering ? 44 : 12,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
