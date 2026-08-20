import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import Reveal from "../components/Reveal";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FlipCard from "../components/FlipCard";
import TiltCard from "../components/TiltCard";
import ParallaxImage from "../components/ParallaxImage";
import MagneticButton from "../components/MagneticButton";
import CountUp from "../components/CountUp";
import Spotlight from "../components/Spotlight";
import AmbientParticles from "../components/AmbientParticles";
import TestimonialCarousel from "../components/TestimonialCarousel";
import FaqAccordion from "../components/FaqAccordion";
import { company, services, placeholderGallery } from "../data/content";
import { api, type Review } from "../lib/api";

const fallbackTestimonials = [
  { name: "Sarah M.", rating: 5, text: "Andrew and his crew redid our kitchen and it looks incredible. On time, on budget, no surprises." },
  { name: "Mike R.", rating: 5, text: "Full roof replacement after storm damage. Fast, professional, and cleaned up every day." },
  { name: "Jen K.", rating: 5, text: "We've used Triz for three different projects now. Always our first call." },
  { name: "Tom B.", rating: 5, text: "Poured a new driveway and patio for us. Clean lines, finished ahead of schedule." },
  { name: "Dana P.", rating: 4, text: "Great communication throughout our addition project. Would hire again." },
];

const faqs = [
  {
    q: "Are you licensed and insured?",
    a: "Yes — Triz Contracting is fully licensed and insured for every trade we take on. Certificates are available on request.",
  },
  {
    q: "How do I get an estimate?",
    a: "Call, text, or fill out the contact form with a bit about your project. We'll set up a time to walk the job and follow up with a written quote — free, no obligation.",
  },
  {
    q: "What areas do you serve?",
    a: `We're based in ${company.city}, WI and serve ${company.serviceArea}. Not sure if you're in range? Reach out and ask.`,
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope — a bathroom refresh might take a week, while a full addition can run several months. You'll get a realistic timeline with your quote, before any work starts.",
  },
  {
    q: "Do you offer a warranty on your work?",
    a: "Yes, every project is backed by a workmanship warranty. We stand behind what we build.",
  },
];

export default function Home() {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    api
      .getReviews()
      .then((data) => {
        if (data.length) setReviews(data);
      })
      .catch(() => {});
  }, []);

  const testimonialTeaser = reviews ?? fallbackTestimonials;
  const avgRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const stats = [
    { value: "250+", label: "Projects completed" },
    { value: "100%", label: "Licensed & insured" },
    { value: avgRating, label: "Avg. client rating" },
    { value: "Free", label: "Estimates" },
  ];

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-charcoal text-white">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop"
          range={12}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
        <div className="bg-noise absolute inset-0" />
        <Spotlight size={600} />
        <AmbientParticles />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-6 top-28 z-10 hidden sm:right-10 sm:top-32 sm:block"
          style={{ perspective: "600px" }}
        >
          <motion.div
            animate={{ rotateY: [0, 12, 0, -12, 0], rotate: [-6, -3, -6, -9, -6], y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-accent bg-charcoal/80 text-center shadow-xl backdrop-blur"
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2 4 5v6c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V5l-8-3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
            </svg>
            <span className="text-[9px] font-bold uppercase leading-tight tracking-wider text-white/80">
              Licensed<br />&amp; Insured
            </span>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl rounded-3xl border border-white/10 bg-charcoal/50 p-8 shadow-2xl backdrop-blur-xl sm:p-12"
          >
            <p className="mb-3 font-display text-base italic text-white/60 sm:text-lg">
              Franklin, Wisconsin's full-service contractor for
            </p>
            <h1 className="font-display text-4xl font-800 leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Built right,
              <br />
              <span className="text-accent">the first time.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              From full remodels to roofing, additions, and everything between —
              {" "}{company.owner.split(" ")[0]} and the Triz Contracting crew handle it, start to finish.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                as={Link}
                to="/contact"
                className="block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105"
              >
                Get a Free Quote
              </MagneticButton>
              <MagneticButton
                as={Link}
                to="/gallery"
                className="block rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See Our Work
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 sm:flex"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-8 w-px bg-white/40"
          />
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-paper-line bg-paper-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 sm:px-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-display text-3xl font-800 text-accent sm:text-4xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-soft">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">What we do</span>
          <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-ink sm:text-4xl">
            One contractor. Every trade.
          </h2>
          <p className="mt-4 text-ink-soft">
            We handle the full scope of your project so you're not juggling five different
            crews and five different schedules.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.08}>
              <FlipCard
                className="h-56"
                front={
                  <div className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl p-5 text-white">
                    <img
                      src={s.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                    <span className="relative font-display text-lg font-700 leading-tight">{s.name}</span>
                    <span className="relative mt-1 flex items-center gap-1 text-xs font-medium text-accent-light">
                      Tap to preview
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                }
                back={
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-accent/30 bg-charcoal p-5 text-white">
                    <div>
                      <span className="font-display text-lg font-700 leading-tight">{s.name}</span>
                      <p className="mt-2 text-xs leading-relaxed text-white/70">{s.short}</p>
                    </div>
                    <Link
                      to="/services"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-accent-light"
                    >
                      View details
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            View All Services
          </Link>
        </Reveal>
      </section>

      {/* How it works */}
      <section className="bg-paper-soft py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">How it works</span>
            <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-ink sm:text-4xl">
              From first call to final walkthrough.
            </h2>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-paper-line sm:block" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
              className="absolute left-0 right-0 top-6 hidden h-0.5 bg-accent sm:block"
            />
            <div className="grid gap-10 sm:grid-cols-4 sm:gap-6">
              {[
                { title: "Reach Out", text: "Call, text, or fill out the form — tell us what you need done.", icon: "phone" },
                { title: "Free Estimate", text: "We walk the job, talk through options, and give you a straight written quote.", icon: "clipboard" },
                { title: "We Build", text: "A dedicated crew, a clear timeline, and updates along the way — no surprises.", icon: "hammer" },
                { title: "Final Walkthrough", text: "We sign off together, and stand behind the work with a workmanship warranty.", icon: "check" },
              ].map((step, i) => (
                <Reveal key={step.title} delay={i * 0.12}>
                  <TiltCard max={6} className="h-full">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-paper-soft font-display text-lg font-800 text-accent sm:mx-0">
                      {i + 1}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-700 text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed pull-quote */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-charcoal text-white">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1800&auto=format&fit=crop"
          className="opacity-45"
          range={14}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />
        <Spotlight size={550} />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:px-8">
          <Reveal>
            <p className="font-display text-3xl font-800 leading-tight tracking-tight sm:text-4xl md:text-5xl">
              We'd rather do one job right for a family that calls us back
              {" "}<span className="text-accent">than five jobs fast</span> for one that never does.
            </p>
            <MagneticButton
              as={Link}
              to="/gallery"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-105"
            >
              Our Work
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="bg-charcoal py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-light">Recent work</span>
            <h2 className="mt-3 font-display text-3xl font-800 tracking-tight sm:text-4xl">
              Drag the slider. See the difference.
            </h2>
            <p className="mt-4 text-white/60">
              A few finished jobs from around {company.city} and the greater Milwaukee area.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {placeholderGallery.slice(0, 3).map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <BeforeAfterSlider before={item.before} after={item.after} title={item.title} />
                <p className="mt-3 text-sm font-medium text-white/80">{item.title}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              View Full Gallery
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured deck / outdoor living showcase */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <TiltCard max={8} className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=1200&auto=format&fit=crop"
                alt="Custom backyard deck and pergola build"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </TiltCard>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Featured Work</span>
            <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-ink sm:text-4xl">
              Outdoor living, built to last.
            </h2>
            <p className="mt-4 text-ink-soft">
              Decks, pergolas, and covered porches designed around how you actually use your
              backyard — not just how it photographs. Every build is engineered for Wisconsin
              winters and finished to look just as good in year ten as it did on day one.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { value: "2–3", label: "Week builds" },
                { value: "10+", label: "Yr warranty" },
                { value: "100%", label: "Custom design" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-paper-soft p-4 text-center">
                  <div className="font-display text-xl font-800 text-accent">{s.value}</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-ink-faint">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <MagneticButton
              as={Link}
              to="/services"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Explore Outdoor Living
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* Reviews teaser */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Client reviews</span>
          <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-ink sm:text-4xl">
            Don't take our word for it.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <TestimonialCarousel items={testimonialTeaser} />
        </Reveal>

        <Reveal className="mt-10 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Read All Reviews
          </Link>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">FAQ</span>
          <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-ink sm:text-4xl">
            Questions? Answered.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <FaqAccordion items={faqs} />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-blueprint py-24 text-white">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1800&auto=format&fit=crop"
          className="opacity-20"
          range={14}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blueprint via-blueprint/90 to-blueprint/70" />
        <div className="bg-noise absolute inset-0" />
        <Spotlight size={550} />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-800 tracking-tight sm:text-4xl">
            Ready to start your project?
          </h2>
          <p className="mt-4 text-white/70">
            Tell us what you need done — we'll get back to you fast with a straight answer,
            not a runaround.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              as={Link}
              to="/contact"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Request a Quote
            </MagneticButton>
            <MagneticButton
              as="a"
              href={company.phoneHref}
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              Call {company.phoneDisplay}
            </MagneticButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
