import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Spotlight({
  size = 500,
  color = "rgba(242,89,12,0.18)",
}: {
  size?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const rect = ref.current?.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      opacity.set(inside ? 1 : 0);
      if (inside) {
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y, opacity]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{
          x: sx,
          y: sy,
          opacity,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
    </div>
  );
}
