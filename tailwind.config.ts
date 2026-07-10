import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A1628",
        primary: {
          DEFAULT: "#1E4FFF",
          deep: "#0B2A9E",
          light: "#6E93FF",
        },
        sky: "#EAF1FF",
        line: "#D7E3FF",
        "sky-dark": "#101F3D",
        surface: "#16294E",
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      fontSize: {
        "hero-mobile": ["48px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-desktop": ["112px", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "section-header": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "pulse-line": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        scan: "scan 2.4s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "pulse-line": "pulse-line 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
