import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import StarRating from "../components/StarRating";
import TiltCard from "../components/TiltCard";
import { api, type Review } from "../lib/api";

const fallbackReviews: Review[] = [
  { id: -1, name: "Sarah M.", rating: 5, text: "Andrew and his crew redid our kitchen and it looks incredible. On time, on budget, no surprises.", created_at: "", status: "approved" },
  { id: -2, name: "Mike R.", rating: 5, text: "Full roof replacement after storm damage. Fast, professional, and cleaned up every day.", created_at: "", status: "approved" },
  { id: -3, name: "Jen K.", rating: 5, text: "We've used Triz for three different projects now. Always our first call.", created_at: "", status: "approved" },
  { id: -4, name: "Tom B.", rating: 5, text: "Poured a new driveway and patio for us. Clean lines, finished ahead of schedule.", created_at: "", status: "approved" },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  useEffect(() => {
    api
      .getReviews()
      .then((data) => {
        if (data.length) setReviews(data);
      })
      .catch(() => {});
  }, []);

  const avg = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !text.trim()) {
      setError("Please fill out your name and review.");
      return;
    }
    setSubmitting(true);
    try {
      await api.submitReview({ name: name.trim(), rating, text: text.trim() });
      setSubmitted(true);
      setName("");
      setText("");
      setRating(5);
    } catch {
      setError("Something went wrong submitting your review. Please try again, or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Reviews"
        title="What clients are saying."
        image="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1800&auto=format&fit=crop"
      >
        <div className="mt-6 flex items-center justify-center gap-3">
          <StarRating rating={Math.round(Number(avg))} size={22} />
          <span className="text-lg font-semibold">{avg} / 5</span>
          <span className="text-white/50">· {reviews.length} reviews</span>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-display text-2xl font-700 text-ink">Recent reviews</h2>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {showForm ? "Close" : "Leave a Review"}
          </button>
        </div>

        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-12 overflow-hidden rounded-2xl border border-paper-line bg-paper-soft p-6 sm:p-8"
          >
            {submitted ? (
              <div className="py-6 text-center">
                <p className="font-display text-xl font-700 text-ink">Thanks for the review!</p>
                <p className="mt-2 text-ink-soft">
                  It's been submitted and will appear here once approved.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Your name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-paper-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Rating</label>
                    <StarRating rating={rating} interactive onChange={setRating} size={24} />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Your review</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-paper-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
                    placeholder="Tell us about your project..."
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </motion.div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={(i % 6) * 0.05}>
              <TiltCard className="flex h-full flex-col rounded-2xl border border-paper-line p-6">
                <StarRating rating={r.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">"{r.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-700 text-accent">
                    {r.name.charAt(0)}
                  </span>
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
