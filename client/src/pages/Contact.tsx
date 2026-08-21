import { useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import ServiceAreaMap from "../components/ServiceAreaMap";
import { company, services } from "../data/content";
import { api } from "../lib/api";
import { usePageTitle } from "../lib/usePageTitle";

const steps = ["Project", "Details", "Contact Info"];

export default function Contact() {
  usePageTitle("Contact");
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [projectType, setProjectType] = useState(params.get("project") ?? "");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) {
      setPhotoError("Please choose a JPG, PNG, WEBP, or GIF image.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setPhotoError("Photo must be under 8MB.");
      return;
    }
    setPhotoError("");
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhoto(null);
    setPhotoPreview(null);
    setPhotoError("");
  }

  const canNext =
    (step === 0 && projectType.trim().length > 0) ||
    (step === 1 && message.trim().length > 0) ||
    step === 2;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      setError("Please provide your name and either an email or phone number.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await api.submitContact({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        projectType,
        message: message.trim(),
        photo,
      });
      setSubmitted(true);
    } catch {
      setError(
        `Something went wrong sending your request. Please call us directly at ${company.phoneDisplay} or email ${company.email}.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project."
        subtitle="Fill out the form, call, or email — whatever's easiest. We respond fast."
        image="https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=1800&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Quick contact options */}
          <Reveal className="lg:col-span-2">
            <div className="space-y-4">
              <TiltCard max={6}>
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-4 rounded-2xl border border-paper-line bg-paper p-5 shadow-sm transition-colors hover:border-accent"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <PhoneIcon />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Call</p>
                    <p className="font-display text-lg font-700 text-ink">{company.phoneDisplay}</p>
                  </div>
                </a>
              </TiltCard>
              <TiltCard max={6}>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-paper-line bg-paper p-5 shadow-sm transition-colors hover:border-accent"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <MailIcon />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Email</p>
                    <p className="font-display text-lg font-700 text-ink break-all">{company.email}</p>
                  </div>
                </a>
              </TiltCard>
              <TiltCard max={6}>
                <a
                  href={`sms:${company.phoneHref.replace("tel:", "")}`}
                  className="flex items-center gap-4 rounded-2xl border border-paper-line bg-paper p-5 shadow-sm transition-colors hover:border-accent"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <MessageIcon />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Text Message</p>
                    <p className="font-display text-lg font-700 text-ink">{company.phoneDisplay}</p>
                  </div>
                </a>
              </TiltCard>

              <div className="h-64 overflow-hidden rounded-2xl border border-paper-line">
                <ServiceAreaMap />
              </div>
              <p className="text-xs text-ink-faint">Serving {company.serviceArea}. {company.hours}.</p>
            </div>
          </Reveal>

          {/* Multi-step form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border border-paper-line p-6 sm:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-700 text-ink">Request sent!</h2>
                  <p className="mt-2 text-ink-soft">
                    Thanks, {name.split(" ")[0]}. We'll be in touch shortly. For anything urgent,
                    call us at {company.phoneDisplay}.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8 flex items-center gap-2">
                    {steps.map((s, i) => (
                      <div key={s} className="flex flex-1 items-center gap-2">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                            i <= step ? "bg-accent text-white" : "bg-paper-soft text-ink-faint"
                          }`}
                        >
                          {i + 1}
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`h-0.5 flex-1 ${i < step ? "bg-accent" : "bg-paper-line"}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {step === 0 && (
                        <motion.div
                          key="step0"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <h2 className="font-display text-xl font-700 text-ink">What do you need done?</h2>
                          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {services.map((s) => (
                              <button
                                type="button"
                                key={s.slug}
                                onClick={() => setProjectType(s.name)}
                                className={`rounded-xl border p-3 text-left text-sm font-medium transition-colors ${
                                  projectType === s.name
                                    ? "border-accent bg-accent-soft text-accent"
                                    : "border-paper-line text-ink-soft hover:border-accent/50"
                                }`}
                              >
                                {s.name}
                              </button>
                            ))}
                          </div>
                          <input
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            placeholder="Or type your own..."
                            className="mt-4 w-full rounded-lg border border-paper-line px-4 py-2.5 text-sm outline-none focus:border-accent"
                          />
                        </motion.div>
                      )}

                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <h2 className="font-display text-xl font-700 text-ink">Tell us more</h2>
                          <p className="mt-1 text-sm text-ink-soft">
                            Timeline, scope, address, or anything else that'll help us understand the job.
                          </p>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={6}
                            placeholder="e.g. Looking to redo our kitchen, roughly 200 sq ft, hoping to start this fall..."
                            className="mt-4 w-full rounded-lg border border-paper-line px-4 py-3 text-sm outline-none focus:border-accent"
                          />

                          <label className="mb-1.5 mt-4 block text-sm font-medium text-ink">
                            Photo <span className="font-normal text-ink-faint">(optional)</span>
                          </label>
                          {photoPreview ? (
                            <div className="flex items-center gap-3">
                              <img
                                src={photoPreview}
                                alt="Selected upload preview"
                                className="h-16 w-16 rounded-lg object-cover"
                              />
                              <button
                                type="button"
                                onClick={removePhoto}
                                className="text-xs font-semibold text-ink-soft underline hover:text-accent"
                              >
                                Remove photo
                              </button>
                            </div>
                          ) : (
                            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-paper-line px-4 py-3 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.5-4.5a2 2 0 0 1 2.8 0L16 16M14 14l1.5-1.5a2 2 0 0 1 2.8 0L20 14M4 6h16v14H4V6Z" />
                              </svg>
                              Attach a photo of the project or area
                              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                            </label>
                          )}
                          {photoError && <p className="mt-1.5 text-xs text-red-600">{photoError}</p>}
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <h2 className="font-display text-xl font-700 text-ink">How can we reach you?</h2>
                          <div className="mt-5 space-y-4">
                            <div>
                              <label className="mb-1.5 block text-sm font-medium text-ink">Name</label>
                              <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border border-paper-line px-4 py-2.5 text-sm outline-none focus:border-accent"
                                placeholder="Jane Doe"
                              />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full rounded-lg border border-paper-line px-4 py-2.5 text-sm outline-none focus:border-accent"
                                  placeholder="jane@email.com"
                                />
                              </div>
                              <div>
                                <label className="mb-1.5 block text-sm font-medium text-ink">Phone</label>
                                <input
                                  type="tel"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="w-full rounded-lg border border-paper-line px-4 py-2.5 text-sm outline-none focus:border-accent"
                                  placeholder="(414) 555-0100"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                    <div className="mt-8 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        className={`text-sm font-semibold text-ink-soft ${step === 0 ? "invisible" : ""}`}
                      >
                        Back
                      </button>
                      {step < steps.length - 1 ? (
                        <button
                          type="button"
                          disabled={!canNext}
                          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
                        >
                          {submitting ? "Sending..." : "Send Request"}
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .97.76l1.1 4.4a1 1 0 0 1-.5 1.12l-1.6.8a12 12 0 0 0 6.63 6.63l.8-1.6a1 1 0 0 1 1.12-.5l4.4 1.1a1 1 0 0 1 .76.97V19a2 2 0 0 1-2 2h-1C9.16 21 3 14.84 3 7V5Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4zM4 7l8 6 8-6" />
    </svg>
  );
}
function MessageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
