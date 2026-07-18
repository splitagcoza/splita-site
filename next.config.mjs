/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/artists",
        destination: "/",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
