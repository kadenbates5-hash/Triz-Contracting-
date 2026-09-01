import { useId } from "react";
import { motion } from "framer-motion";

export default function LogoSeal({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const pathId = useId();

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
      >
        <defs>
          <path id={pathId} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <text fill="currentColor" fontSize="12.5" fontWeight="700" letterSpacing="3">
          <textPath href={`#${pathId}`}>
            TRIZ CONTRACTING &#8226; FRANKLIN, WI &#8226; LICENSED &amp; INSURED &#8226;
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl font-800 text-accent">T</span>
      </div>
    </div>
  );
}
