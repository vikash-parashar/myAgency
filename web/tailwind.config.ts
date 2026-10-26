import type { Config } from "tailwindcss";

// Design tokens. Colours and fonts live here and in globals.css only, so a rebrand is a two-file change.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#07070B", 900: "#0B0B12", 800: "#11111A", 700: "#1A1A26", 600: "#26263A" },
        paper: { DEFAULT: "#F4F3EE", dim: "#A9A8B8", mute: "#6E6D80" },
        volt: { DEFAULT: "#D4FF3A", dark: "#A8D400" },
        iris: { DEFAULT: "#7B61FF", light: "#A795FF" },
        flare: { DEFAULT: "#FF5C39" },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "1.25rem", xl3: "1.75rem" },
      boxShadow: {
        glow: "0 0 0 1px rgba(212,255,58,.25), 0 10px 40px -10px rgba(212,255,58,.45)",
        card: "0 1px 0 rgba(255,255,255,.06) inset, 0 20px 50px -20px rgba(0,0,0,.8)",
      },
    },
  },
  plugins: [],
};
export default config;
