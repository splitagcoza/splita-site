"use client";

import { useInView } from "@/lib/useInView";

export default function CtaSection() {
  const [ref, inView] = useInView();

  return (
    <section
      id="cta"
      className="py-24 overflow-hidden"
      style={{
        backgroundColor: "#1B4D3E",
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(201,146,10,0.06) 0px, rgba(201,146,10,0.06) 1px, transparent 1px, transparent 60px)",
      }}
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div
          ref={ref}
          className={`flex flex-col items-center gap-6 transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-100 translate-y-8"
          }`}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#C9920A", fontVariant: "small-caps" }}
          >
            Get Protected Today
          </p>

          <h2 className="font-serif font-bold text-white text-3xl md:text-5xl leading-tight">
            Your Next Collaboration
            <br />
            Deserves a Split Sheet.
          </h2>

          <p className="text-white/70 text-lg leading-relaxed max-w-xl">
            Stop relying on verbal agreements and WhatsApp screenshots. Create
            your first legally recognised split sheet in under 3 minutes - free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <a
              href="/split"
              className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 px-8 py-4 bg-gold text-dark hover:bg-gold/90 text-base"
            >
              Create Your First Split Sheet
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 px-8 py-4 border-2 border-white/30 text-white hover:border-white/60 text-base"
            >
              View Pricing
            </a>
          </div>

          <p className="text-white/40 text-xs mt-2">
            Free forever for up to 3 documents per month. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

