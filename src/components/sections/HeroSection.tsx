import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{
        backgroundColor: "#2C1810",
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(201,146,10,0.05) 0px, rgba(201,146,10,0.05) 1px, transparent 1px, transparent 60px)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto gap-6">
        {/* Eyebrow */}
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          Built for African Music Creators
        </p>

        {/* Headline */}
        <h1 className="font-serif font-bold text-white text-4xl md:text-6xl lg:text-7xl leading-tight">
          Your Music.
          <br />
          Your Rights.
          <br />
          Your Money.
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          SPLITA is the fastest way for African musicians, producers, and
          songwriters to create a legally recognised split sheet for every
          collaboration - approved, signed, and delivered in minutes. Beat sale
          certificates are next.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
          {/* Primary - Create Split Sheet */}
          <Link
            href="/split"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 px-6 py-3 text-sm bg-gold text-dark hover:bg-gold/90"
          >
            Create Split Sheet
          </Link>

          {/* External - Create Song Link */}
          <a
            href="https://song.link"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 px-6 py-3 text-sm border-2 border-white text-white hover:bg-white hover:text-dark"
          >
            Create Song Link
          </a>

          {/* Join Splita - Sign up */}
          <Link
            href="/sign-up"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 px-6 py-3 text-sm border-2 border-gold text-gold hover:bg-gold hover:text-dark"
          >
            Join Splita
          </Link>
        </div>

        {/* Social proof */}
        <p className="text-sm font-semibold italic text-gray-300 mt-4">
          The split sheet platform built for African creators.
        </p>
      </div>

      {/* Scroll-down chevron */}
      <a
        href="#how-it-works"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gold animate-bounce"
        aria-label="Scroll to How It Works"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
