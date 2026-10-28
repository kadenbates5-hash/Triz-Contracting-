import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Segment = { text: string; accent?: boolean };

function Word({
  word,
  accent,
  range,
  progress,
}: {
  word: string;
  accent?: boolean;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${accent ? "text-accent" : ""}`}>
      {word}&nbsp;
    </motion.span>
  );
}

export default function WordReveal({ segments, className = "" }: { segments: Segment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  const words = segments.flatMap((s) =>
    s.text.split(" ").filter(Boolean).map((w) => ({ word: w, accent: s.accent }))
  );

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          word={w.word}
          accent={w.accent}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1) / words.length)]}
        />
      ))}
    </p>
  );
}
