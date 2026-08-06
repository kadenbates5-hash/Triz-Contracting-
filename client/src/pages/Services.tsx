import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/PageShell";
import Reveal from "../components/Reveal";
import { services } from "../data/content";

export default function Services() {
  const [openSlug, setOpenSlug] = useState<string | null>(services[0].slug);

  return (
    <PageShell>
      <section className="bg-charcoal py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-light">Services</span>
          <h1 className="mt-3 font-display text-4xl font-800 tracking-tight sm:text-5xl">
            Full-scope contracting, one crew.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            Tap a service to see what's included. Don't see your project listed? We probably
            still do it — reach out and ask.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="flex flex-col divide-y divide-paper-line border-y border-paper-line">
          {services.map((s, i) => {
            const open = openSlug === s.slug;
            return (
              <Reveal key={s.slug} delay={Math.min(i * 0.04, 0.3)}>
                <div>
                  <button
                    onClick={() => setOpenSlug(open ? null : s.slug)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-sm font-700 text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl font-700 text-ink sm:text-2xl">{s.name}</span>
                    </div>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-8 md:grid-cols-2 md:items-center">
                          <div className="order-2 md:order-1">
                            <p className="text-ink-soft">{s.description}</p>
                            <ul className="mt-5 space-y-2">
                              {s.bullets.map((b) => (
                                <li key={b} className="flex items-center gap-2 text-sm text-ink">
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </span>
                                  {b}
                                </li>
                              ))}
                            </ul>
                            <Link
                              to={`/contact?project=${encodeURIComponent(s.name)}`}
                              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                            >
                              Get a Quote for This
                            </Link>
                          </div>
                          <div className="order-1 overflow-hidden rounded-2xl md:order-2">
                            <img
                              src={s.image}
                              alt={s.name}
                              className="h-56 w-full object-cover md:h-64"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
