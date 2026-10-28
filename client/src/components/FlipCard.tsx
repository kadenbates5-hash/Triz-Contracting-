import { useState, type KeyboardEvent, type ReactNode } from "react";

export default function FlipCard({
  front,
  back,
  className = "",
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  function toggle() {
    setFlipped((f) => !f);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className={`group relative cursor-pointer outline-none ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-accent"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          {front}
        </div>
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
