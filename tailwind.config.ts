import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: "#1B4D3E",
        blue: "#1A3A6B",
        gold: "#C9920A",
        red: "#B84A2E",
        dark: "#2C1810",
        light: "#FAF7F2",
      },
    },
  },
  plugins: [],
};
export default config;
