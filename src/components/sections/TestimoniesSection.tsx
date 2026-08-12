"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/lib/useInView";

const TESTIMONIALS = [
  {
    quote:
      "SPLITA saved my collaboration from turning into a legal nightmare. We had ownership documented before the track even dropped, and when it hit 2 million streams the split was already locked in.",
    name: "Sipho M.",
    role: "Afrobeats Producer, Johannesburg",
  },
  {
    quote:
      "I deal with dozens of beat deals a year. Before SPLITA I was relying on WhatsApp messages as proof. Now every sale has a signed certificate and I can prove the terms in writing.",
    name: "DJ Kelechi",
    role: "Beat Maker & Songwriter, Lagos",
  },
  {
    quote:
      "Our label now requires SPLITA documents for every release. The SAMRO-compatible format means our artists get registered correctly from day one.",
    name: "Nomsa D.",
    role: "A&R Manager, Cape Town",
  },
];

export default function TestimoniesSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="testimonies" className="bg-light">
      {/* Heading block */}
      <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          Testimonies
        </p>
        <h2 className="font-serif font-bold text-dark text-3xl md:text-4xl leading-snug">
          What Creators Are Saying
        </h2>
      </div>

      {/* Cards */}
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-5"
          >
            {/* Stars */}
            <span className="text-base tracking-wide" aria-label="5 stars">
              ⭐⭐⭐⭐⭐
            </span>

            {/* Quote */}
            <p className="text-gray-700 italic text-sm leading-relaxed flex-1">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              {/* Avatar placeholder - TODO: replace with real photo */}
              <div
                className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="font-bold text-dark text-sm">{t.name}</span>
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#C9920A" }}
                >
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
