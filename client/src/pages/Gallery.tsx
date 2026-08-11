import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import MagneticButton from "../components/MagneticButton";
import { galleryCategories, placeholderGallery, type GalleryItem as LocalItem } from "../data/content";
import { api } from "../lib/api";
import { usePageTitle } from "../lib/usePageTitle";

type Item = LocalItem;

export default function Gallery() {
  usePageTitle("Gallery");
  const [items, setItems] = useState<Item[]>(placeholderGallery);
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    api
      .getGallery()
      .then((data) => {
        if (data.length) {
          setItems(
            data.map((g) => ({
              id: String(g.id),
              title: g.title,
              category: g.category as Item["category"],
              before: g.before_image,
              after: g.after_image,
            }))
          );
        }
      })
      .catch(() => {
        // backend not reachable — keep placeholder gallery so the page still works
      });
  }, []);

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  useEffect(() => {
    setLightboxIndex(null);
  }, [category]);

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const showPrev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const showNext = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filtered.length]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Gallery"
        title="See the transformation."
        subtitle="Drag any slider to compare before and after. Every project below was completed by the Triz Contracting crew."
        image="https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=1800&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((c) => (
            <MagneticButton
              key={c}
              as="button"
              strength={0.5}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === c
                  ? "bg-accent text-white"
                  : "bg-paper-soft text-ink-soft hover:bg-accent-soft hover:text-accent"
              }`}
            >
              {c}
            </MagneticButton>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}
              >
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="block w-full text-left"
                  aria-label={`Open ${item.title}`}
                >
                  <BeforeAfterSlider before={item.before} after={item.after} title={item.title} />
                </button>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-ink-soft">No projects in this category yet.</p>
        )}
      </section>

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-5 backdrop-blur"
            onClick={() => setLightboxIndex(null)}
          >
            {filtered.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous project"
                className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 sm:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
                </svg>
              </button>
            )}

            <motion.div
              key={lightboxItem.id}
              initial={{ scale: 0.92, opacity: 0, rotateY: 8 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
              style={{ perspective: "1200px" }}
            >
              <BeforeAfterSlider before={lightboxItem.before} after={lightboxItem.after} title={lightboxItem.title} />
              <div className="mt-4 flex items-center justify-between text-white">
                <div>
                  <p className="font-display text-lg font-700">{lightboxItem.title}</p>
                  {filtered.length > 1 && (
                    <p className="text-xs text-white/50">
                      {(lightboxIndex ?? 0) + 1} / {filtered.length}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {filtered.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next project"
                className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 sm:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
