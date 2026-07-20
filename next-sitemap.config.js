/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://splita.co.za",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
};
