import { useState } from "react";
import { Link } from "react-router-dom";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-accent px-10 py-2.5 text-center text-sm font-semibold text-white">
      <Link to="/contact" className="hover:underline">
        Now booking projects for this season — get a free estimate <span aria-hidden>→</span>
      </Link>
      <button
        aria-label="Dismiss announcement"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/80 hover:bg-white/15 hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
