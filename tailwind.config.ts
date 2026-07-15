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
          DEFAULT: "#1E40AF",
          deep: "#1E3A8A",
          light: "#60A5FA",
        },
        sky: "#EAF1FF",
        line: "#D7E3FF",
        "sky-dark": "#101F3D",
        surface: "#16294E",
        status: {
          walkin: "#0F9D58",
          booked: "#F57C00",
          none: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      fontSize: {
        "hero-mobile": ["2.25rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "hero-desktop": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "section-header": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
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
