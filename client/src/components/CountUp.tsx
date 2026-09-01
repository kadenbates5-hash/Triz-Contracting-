import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export default function CountUp({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const match = value.match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  const [display, setDisplay] = useState(numeric === null ? value : (0).toFixed(decimals));

  useEffect(() => {
    if (!isInView || numeric === null) return;
    const controls = animate(0, numeric, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [isInView, numeric, duration, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
