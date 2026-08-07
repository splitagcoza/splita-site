/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pictures
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com", // Twitter/X profile pictures
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Force HTTPS for 2 years; include subdomains
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Prevent the site from being embedded in iframes (clickjacking)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Stop browsers from guessing content types (MIME sniffing)
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Only send the origin as referrer when crossing to another site
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Lock down browser features the site doesn't use
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://lh3.googleusercontent.com https://pbs.twimg.com",
              "font-src 'self'",
              "connect-src 'self' https://api.splita.co.za",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/artists",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
