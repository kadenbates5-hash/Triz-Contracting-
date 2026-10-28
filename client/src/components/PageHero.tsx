import type { ReactNode } from "react";
import { motion } from "framer-motion";
import ParallaxImage from "./ParallaxImage";
import Spotlight from "./Spotlight";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-white sm:py-32">
      <ParallaxImage src={image} range={12} />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/75 to-charcoal" />
      <Spotlight />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-widest text-accent-light"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-display text-4xl font-800 tracking-tight sm:text-5xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-white/70"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}
