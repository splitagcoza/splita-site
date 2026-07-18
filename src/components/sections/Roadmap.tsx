"use client";

import { useInView } from "@/lib/useInView";

const HORIZONS = [
  {
    label: "Now",
    period: "0 – 12 months",
    color: "#C9920A",
    items: [
      { text: "Split Sheet Generator", done: true },
      { text: "Beat Sale Certificates", done: true },
      { text: "Song Link Generator" },
      { text: "Bio / One-Page Generator" },
      { text: "Pilot with select SA labels" },
      { text: "iOS & Android app" },
    ],
  },
  {
    label: "Next",
    period: "12 – 24 months",
    color: "#1A3A6B",
    items: [
      { text: "Music Metadata Database" },
      { text: "Direct integration with SAMRO, SAMPRA & CAPASSO" },
      { text: "Pan-African expansion" },
      { text: "Partnerships with labels, schools & music camps" },
      { text: "Beat Selling Platform" },
    ],
  },
  {
    label: "Future",
    period: "24 – 36 months",
    color: "#1B4D3E",
    items: [
      { text: "Advanced royalty analytics dashboard" },
      { text: "SPLITA Charts" },
      { text: "Digital Music Magazine" },
      { text: "Global PRO integrations (ASCAP, BMI, SESAC)" },
      { text: "International expansion — India, Brazil, China" },
    ],
  },
];

export default function Roadmap() {
  const [ref, inView] = useInView();

  return (
    <section id="roadmap" className="py-20" style={{ backgroundColor: "#2C1810" }}>
      <div className="mx-auto max-w-6xl px-6 text-white">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          Where We&rsquo;re Headed
        </p>
        <h2 className="font-serif font-bold text-white text-3xl md:text-4xl leading-snug">
          Built to Grow With You
        </h2>
        <p className="text-white/50 text-base leading-relaxed">
          Split sheets are just the beginning. SPLITA is building the complete
          legal and business toolkit for African music creators.
        </p>
      </div>

      {/* Horizon cards */}
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {HORIZONS.map((h) => (
          <div
            key={h.label}
            className="rounded-2xl border border-white/10 p-8 flex flex-col gap-6"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            {/* Horizon label */}
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: h.color }}
                aria-hidden="true"
              />
              <div>
                <p className="font-bold text-white text-lg leading-tight">
                  {h.label}
                </p>
                <p className="text-xs text-white/40 mt-0.5">{h.period}</p>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              aria-hidden="true"
            />

            {/* Items */}
            <ul className="flex flex-col gap-3">
              {h.items.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-2.5 text-sm leading-relaxed"
                >
                  {item.done ? (
                    <svg
                      className="shrink-0 mt-0.5"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C9920A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span
                      className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: h.color, opacity: 0.7 }}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={
                      item.done ? "text-white/80" : "text-white/50"
                    }
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
