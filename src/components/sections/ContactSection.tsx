"use client";

import { useState } from "react";
import { SITE_TAGLINE, SOCIAL_LINKS } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

const SOCIALS = [
  {
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: SOCIAL_LINKS.tiktok,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: SOCIAL_LINKS.twitter,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const SUBJECTS = [
  "General Enquiry",
  "Partnership",
  "Artist Support",
  "Media & Press",
  "Sponsorship",
];

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<SubmitStatus>("idle");
  const [formStatus, setFormStatus] = useState<SubmitStatus>("idle");

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    setWaitlistStatus("sending");
    try {
      const res = await fetch(
        FORMSPREE_URL || "https://formspree.io/f/placeholder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: waitlistEmail, _subject: "Early Access Waitlist" }),
        }
      );
      setWaitlistStatus(res.ok ? "sent" : "error");
    } catch {
      setWaitlistStatus("error");
    }
  }

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(
        FORMSPREE_URL || "https://formspree.io/f/placeholder",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        }
      );
      setFormStatus(res.ok ? "sent" : "error");
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-20"
      style={{ backgroundColor: "#2C1810" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* ── Left column: contact info ── */}
          <div className="flex flex-col gap-8">
            <Logo variant="light" size={40} />

            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              {SITE_TAGLINE}
            </p>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                Email Us
              </span>
              <a
                href="mailto:hello@splita.co.za"
                className="text-white hover:text-gold transition-colors duration-150 text-sm"
              >
                hello@splita.co.za
              </a>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                Follow Us
              </span>
              <ul className="flex gap-4" aria-label="Social media links">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors duration-150"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right column: waitlist + form ── */}
          <div className="flex flex-col gap-8">

            {/* Early Access callout */}
            <div
              className="rounded-xl p-6 flex flex-col gap-4"
              style={{ backgroundColor: "rgba(201,146,10,0.12)", border: "1px solid rgba(201,146,10,0.3)" }}
            >
              <div className="flex flex-col gap-1">
                <p className="text-gold font-semibold text-sm uppercase tracking-widest">
                  Early Access
                </p>
                <p className="text-white text-base leading-relaxed">
                  Be the first to know when SPLITA launches. Drop your email and we&apos;ll reach out.
                </p>
              </div>

              {waitlistStatus === "sent" ? (
                <p className="text-gold text-sm font-semibold">You&apos;re on the list! We&apos;ll be in touch.</p>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                  <input
                    id="waitlist-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@email.com"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="flex-1 rounded-lg px-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold transition-colors duration-150"
                  />
                  <button
                    type="submit"
                    disabled={waitlistStatus === "sending"}
                    className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 px-5 py-2.5 text-sm bg-gold text-dark hover:bg-gold/90 flex-shrink-0 disabled:opacity-60"
                  >
                    {waitlistStatus === "sending" ? "Joining…" : "Join Waitlist"}
                  </button>
                </form>
              )}
              {waitlistStatus === "error" && (
                <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
              )}
            </div>

            {/* Contact form */}
            {formStatus === "sent" ? (
              <div className="rounded-xl p-8 text-center" style={{ backgroundColor: "rgba(27,77,62,0.3)", border: "1px solid rgba(27,77,62,0.5)" }}>
                <p className="text-white font-semibold text-lg">Message sent!</p>
                <p className="text-white/60 text-sm mt-2">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-5"
                onSubmit={handleContactSubmit}
                noValidate
              >
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide" htmlFor="contact-name">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="rounded-lg px-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold transition-colors duration-150"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="rounded-lg px-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold transition-colors duration-150"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide" htmlFor="contact-subject">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className="rounded-lg px-4 py-2.5 bg-dark border border-white/20 text-white text-sm focus:outline-none focus:border-gold transition-colors duration-150 appearance-none"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us how we can help…"
                    className="rounded-lg px-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold transition-colors duration-150 resize-none"
                  />
                </div>

                {formStatus === "error" && (
                  <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 px-6 py-3 bg-gold text-dark hover:bg-gold/90 w-full disabled:opacity-60"
                >
                  {formStatus === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
