import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import SessionProvider from "@/components/providers/SessionProvider";
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
  metadataBase: new URL("https://www.splita.co.za"),
  alternates: {
    canonical: "https://www.splita.co.za",
  },
  openGraph: {
    title: "SPLITA — Split Sheets for African Music Creators",
    description:
      "Create legally recognised split sheets and beat sale certificates — simple, affordable, and built for Africa.",
    url: "https://www.splita.co.za",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </SessionProvider>
      </body>
    </html>
  );
}
