import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0B0B0D",
        orange: "#FF7A00",
        satin: "#D4A24C",
        warm: "#F8F6F2"
      },
      fontFamily: {
        display: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(255,122,0,.22)",
        card: "0 24px 80px rgba(0,0,0,.32)"
      }
    }
  },
  plugins: []
};

export default config;
