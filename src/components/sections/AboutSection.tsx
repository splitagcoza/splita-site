"use client";

import { useInView } from "@/lib/useInView";

export default function AboutSection() {
  const [ref, inView] = useInView();

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-32"
      style={{
        backgroundColor: "#1B4D3E",
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(201,146,10,0.05) 0px, rgba(201,146,10,0.05) 1px, transparent 1px, transparent 60px)",
      }}
    >
      <div
        ref={ref}
        className={`mx-auto max-w-3xl flex flex-col gap-10 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Eyebrow */}
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          About Us
        </p>

        {/* Heading */}
        <h1 className="font-serif font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
          Protecting African Creators Since Day One
        </h1>

        {/* Divider */}
        <div className="w-16 h-0.5" style={{ backgroundColor: "#C9920A" }} />

        {/* Body */}
        <div className="flex flex-col gap-6">
          <p className="text-white/75 text-lg md:text-xl leading-relaxed">
            SPLITA is an African, web-first platform designed to simplify and
            secure music collaboration agreements. We provide instant, legally
            recognised digital split sheets - eliminating disputes and ensuring
            fair royalty distribution for every contributor.
          </p>
          <p className="text-white/75 text-lg md:text-xl leading-relaxed">
            Our mission is to empower independent artists, producers, and labels
            in South Africa and beyond with transparent, accessible tools that
            protect their creative work and income before a single stream is
            counted.
          </p>
        </div>
      </div>
    </section>
  );
}

