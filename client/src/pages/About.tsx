import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import { company, services } from "../data/content";

const values = [
  { title: "Straight answers", text: "No upsells, no runaround. If we can't do something well, we'll tell you." },
  { title: "Quality work", text: "Every job is done to code and to last — not just to pass inspection." },
  { title: "One point of contact", text: "You talk to the crew actually doing the work, start to finish." },
  { title: "Local & accountable", text: `Based in ${company.city}. We live here — our name is on every job.` },
];

export default function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title={`Built by ${company.owner}.`}
        image="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1800&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"
              alt="Contractor at a job site"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Our Story</span>
            <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-ink">
              Quality work, done right.
            </h2>
            <div className="mt-5 space-y-4 text-ink-soft">
              <p>
                {company.owner} founded Triz Contracting out of {company.city}, Wisconsin
                with a simple idea: homeowners shouldn't have to hire five different contractors
                for one project. [PLACEHOLDER — replace with Andrew's real background/story.]
              </p>
              <p>
                Since then, the crew has taken on everything from full kitchen remodels to
                roof replacements, additions, concrete work, and the dozens of smaller jobs
                that come with owning a home. If it's construction, there's a good chance
                Triz Contracting has done it — and done it well.
              </p>
              <p>
                Today, Triz Contracting serves {company.serviceArea}, with the same
                hands-on approach it started with: real answers, fair pricing, and work
                that holds up.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Start a Conversation
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-soft py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">How we work</span>
            <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-ink">What you can expect</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <TiltCard className="h-full rounded-2xl bg-white p-6 shadow-sm">
                  <span className="font-display text-2xl font-800 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-lg font-700 text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{v.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <Reveal className="grid grid-cols-3 gap-3 sm:gap-4">
          {services.slice(0, 3).map((s) => (
            <img
              key={s.slug}
              src={s.image}
              alt={s.name}
              className="aspect-square w-full rounded-2xl object-cover"
              loading="lazy"
            />
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-2xl font-800 tracking-tight text-ink sm:text-3xl">
            Proudly serving {company.serviceArea}.
          </h2>
          <p className="mt-4 text-ink-soft">
            Not sure if you're in the service area? Reach out — we're happy to talk it through.
          </p>
        </Reveal>
      </section>
    </PageShell>
  );
}
