import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StarRating from "./StarRating";

type Testimonial = { name: string; rating: number; text: string };

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4500);
    return () => clearInterval(id);
  }, [paused, items.length]);

  function go(i: number) {
    setIndex(((i % items.length) + items.length) % items.length);
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative"
      style={{ perspective: "1400px" }}
    >
      <div className="relative flex h-[300px] items-center justify-center sm:h-[260px]">
        {items.map((t, i) => {
          let offset = i - index;
          if (offset > items.length / 2) offset -= items.length;
          if (offset < -items.length / 2) offset += items.length;
          if (Math.abs(offset) > 2) return null;

          const isCenter = offset === 0;
          return (
            <motion.div
              key={t.name + i}
              onClick={() => !isCenter && go(i)}
              className={`absolute w-[88%] max-w-md rounded-2xl border border-paper-line bg-paper-soft p-6 shadow-sm sm:p-8 ${
                isCenter ? "" : "cursor-pointer"
              }`}
              style={{ transformStyle: "preserve-3d" }}
              animate={{
                x: `${offset * 60}%`,
                rotateY: offset * -22,
                scale: isCenter ? 1 : 0.82,
                opacity: Math.abs(offset) > 1 ? 0 : isCenter ? 1 : 0.45,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <StarRating rating={t.rating} />
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">"{t.text}"</p>
              <p className="mt-4 text-sm font-semibold text-ink">{t.name}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-2 bg-paper-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
