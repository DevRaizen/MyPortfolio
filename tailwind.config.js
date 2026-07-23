/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        void: "#07050d",
        surface: "#0e0a1a",
        "surface-2": "#130f22",
        card: "rgba(167, 139, 250, 0.045)",
        "card-border": "rgba(167, 139, 250, 0.14)",
        "card-border-hover": "rgba(167, 139, 250, 0.4)",
        accent: "#8b5cf6",
        "accent-glow": "#a78bfa",
        "accent-bright": "#c4b5fd",
        muted: "#8f8da3",
        "muted-dim": "#605e73",
        success: "#34d399",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
      },
      animation: {
        blink: "blink 1.1s steps(1) infinite",
      },
      boxShadow: {
        glow: "0 10px 30px -8px rgba(139, 92, 246, 0.55)",
        "glow-lg": "0 30px 80px -30px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};