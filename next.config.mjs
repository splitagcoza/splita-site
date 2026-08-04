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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.splita.co.za" }],
        destination: "https://splita.co.za/:path*",
        permanent: true,
      },
      {
        source: "/artists",
        destination: "/",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
