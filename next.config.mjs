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
        source: "/artists",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
