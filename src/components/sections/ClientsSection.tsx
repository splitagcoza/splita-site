"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/lib/useInView";

const CLIENT_CATEGORIES = [
  "Independent Artists",
  "Music Producers",
  "Record Labels",
  "Sync Agencies",
  "DSP Platforms",
  "Collection Societies",
];

export default function ClientsSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="clients" className="bg-white">
      {/* Heading block */}
      <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          Who We Serve
        </p>
        <h2 className="font-serif font-bold text-dark text-3xl md:text-4xl leading-snug">
          Trusted by Creators Across Africa
        </h2>
        <p className="text-dark/60 text-base leading-relaxed">
          From bedroom producers to independent labels - SPLITA protects
          everyone who makes music together.
        </p>
      </div>

      {/* Category pills */}
      <div
        ref={ref}
        className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {CLIENT_CATEGORIES.map((cat) => (
          <div
            key={cat}
            className="px-6 py-3 rounded-full border border-dark/10 bg-light text-dark/70 text-sm font-medium"
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Tagline */}
      <p className="text-center text-dark/50 text-sm mt-10">
        From independent artists to major labels.
      </p>
    </SectionWrapper>
  );
}
