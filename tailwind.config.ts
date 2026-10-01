import type { Config } from "tailwindcss";
import { brand } from "./lib/brand";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0B0B0D",
        orange: brand.orange,
        satin: "#D4A24C",
        warm: "#F8F6F2"
      },
      fontFamily: {
        display: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(239,80,11,.22)",
        card: "0 24px 80px rgba(0,0,0,.32)"
      }
    }
  },
  plugins: []
};

export default config;
