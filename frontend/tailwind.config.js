import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#05070C",
          panel: "#0B1220",
          raised: "#101A2C",
          line: "#1B2740",
        },
        signal: {
          cyan: "#2BF3D6",
          cyandim: "#0F5F55",
          amber: "#FFB020",
          red: "#FF4757",
          text: "#E7EEF3",
          muted: "#7C8FA6",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(43,243,214,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(43,243,214,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      keyframes: {
        "grid-pan": {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "44px 44px" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.4, transform: "scale(0.8)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      animation: {
        "grid-pan": "grid-pan 3s linear infinite",
        scanline: "scanline 2.2s ease-in-out infinite",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
