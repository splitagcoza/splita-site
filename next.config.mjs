/** @type {import('next').NextConfig} */
const nextConfig = {
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
