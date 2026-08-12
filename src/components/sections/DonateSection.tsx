"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/lib/useInView";

export default function DonateSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="donate" className="!py-24 bg-gold">
      <div
        ref={ref}
        className={`flex flex-col items-center text-center gap-6 max-w-2xl mx-auto transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Heading */}
        <h2 className="font-serif font-bold text-dark text-4xl leading-snug">
          Support the Mission
        </h2>

        <p className="text-dark/80 text-lg leading-relaxed">
          Most music tech tools are built for North America and Europe. SPLITA
          was built for the rest of us. Your donation helps us keep the core
          platform free for emerging African artists who can&apos;t yet afford
          legal fees - but still deserve legal protection.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <a
            href={process.env.NEXT_PUBLIC_PAYFAST_URL ?? "#donate"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 ease-in-out px-6 py-3 bg-dark text-light hover:bg-dark/90"
          >
            Donate via PayFast
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 ease-in-out px-6 py-3 border-2 border-dark text-dark hover:bg-dark hover:text-light"
          >
            Become a Sponsor
          </a>
        </div>

        {/* Small print */}
        <p className="text-dark/60 text-xs mt-2">
          All donations go directly to platform maintenance and creator-support
          programmes. We are a proudly South African startup.
        </p>
      </div>
    </SectionWrapper>
  );
}
