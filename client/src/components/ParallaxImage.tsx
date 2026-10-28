import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  range = 10,
}: {
  src: string;
  alt?: string;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        loading="lazy"
        className={`h-[120%] w-full object-cover ${className}`}
      />
    </div>
  );
}
