export default function Marquee({ items }: { items: string[] }) {
  const content = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-charcoal py-4">
      <div className="flex w-max animate-marquee items-center gap-3">
        {content.map((item, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap">
            <span className="font-display text-sm font-700 uppercase tracking-widest text-white/70">
              {item}
            </span>
            <span aria-hidden className="text-accent">
              &#10022;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
