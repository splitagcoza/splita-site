import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import SessionProvider from "@/components/providers/SessionProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPLITA — Split Sheets for African Music Creators",
  description:
    "SPLITA helps African musicians and producers create legally recognised split sheets and beat sale certificates in minutes. Trusted across South Africa and beyond.",
  keywords: [
    "split sheet",
    "music split sheet",
    "beat sale certificate",
    "music rights South Africa",
    "African music creators",
    "music publishing",
    "royalty split",
    "SPLITA",
  ],
  metadataBase: new URL("https://splita.co.za"),
  alternates: {
    canonical: "https://splita.co.za",
  },
  openGraph: {
    title: "SPLITA — Split Sheets for African Music Creators",
    description:
      "Create legally recognised split sheets and beat sale certificates — simple, affordable, and built for Africa.",
    url: "https://splita.co.za",
    siteName: "SPLITA",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "SPLITA — Split Sheets for African Music Creators",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPLITA — Split Sheets for African Music Creators",
    description:
      "Create legally recognised split sheets and beat sale certificates — simple, affordable, and built for Africa.",
    images: ["/images/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2C1810",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA">
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </>
      )}
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "SPLITA",
                url: "https://splita.co.za",
                logo: "https://splita.co.za/images/splita-logo.png",
                description:
                  "SPLITA helps African musicians and producers create legally recognised split sheets and beat sale certificates in minutes.",
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "info@splita.co.za",
                  contactType: "customer service",
                },
                areaServed: "ZA",
                knowsLanguage: "en-ZA",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "SPLITA",
                url: "https://splita.co.za",
              },
            ]),
          }}
        />
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
