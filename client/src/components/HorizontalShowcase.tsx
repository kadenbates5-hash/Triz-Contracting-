import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export type ShowcaseItem = { id: string; title: string; subtitle: string; image: string; to: string };

export default function HorizontalShowcase({
  items,
  eyebrow,
  heading,
}: {
  items: ShowcaseItem[];
  eyebrow: string;
  heading: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative bg-charcoal">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 w-full max-w-7xl px-5 sm:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-light">{eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-white sm:text-4xl">
            {heading}
          </h2>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 px-5 sm:px-8">
          {items.map((s, i) => (
            <Link
              key={s.id}
              to={s.to}
              className="group relative block h-[48vh] w-[78vw] shrink-0 overflow-hidden rounded-3xl bg-charcoal-soft sm:w-[420px]"
            >
              <img
                src={s.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
              <span className="absolute left-5 top-4 font-display text-6xl font-800 text-white/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="font-display text-2xl font-800 leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-accent-light">
                  View project
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="mx-auto mt-8 h-0.5 w-full max-w-7xl px-5 sm:px-8">
          <div className="h-full w-full bg-white/10">
            <motion.div style={{ width: bar }} className="h-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
