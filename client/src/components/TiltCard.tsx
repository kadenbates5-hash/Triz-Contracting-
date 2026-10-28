import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({
  children,
  className = "",
  max = 10,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 300,
    damping: 30,
  });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleEnter() {
    scale.set(1.03);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d", transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
