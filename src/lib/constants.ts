export const SITE_NAME = "SPLITA";

export const SITE_TAGLINE =
  "Legally recognised split sheets and beat sale certificates for African musicians.";

export const NAV_LINKS = [
  { label: "Generate Split-Sheet", href: "/split" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Contact Us", href: "/contact" },
];

/** Nav links shown only when the user is authenticated. */
export const APP_NAV_LINKS = [
  { label: "Generate Split-Sheet", href: "/split" },
];

export const CTA_PRIMARY = "Get Started";
export const CTA_SECONDARY = "Learn More";

/** Primary contact email. Update to the team Gmail once it is created. */
export const CONTACT_EMAIL = "info@splita.co.za";

/**
 * Social media profile URLs.
 * Update each value once the accounts are created - this is the single source
 * of truth used by both the Footer and the Contact section.
 */
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/61590665954461/",
  tiktok: "https://www.tiktok.com/@splita.africa",
  twitter: "https://x.com/splitaafrica",
  instagram: "https://www.instagram.com/splita.africa",
} as const;
