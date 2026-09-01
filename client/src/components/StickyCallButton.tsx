import { motion } from "framer-motion";
import { company } from "../data/content";

export default function StickyCallButton() {
  return (
    <motion.a
      href={company.phoneHref}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 24 }}
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-accent/30 lg:hidden"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      Call Now — {company.phoneDisplay}
    </motion.a>
  );
}
