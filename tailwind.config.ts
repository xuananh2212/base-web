import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-50": "var(--color-50)",
        "color-100": "var(--color-100)",
        "color-200": "var(--color-200)",
        "color-300": "var(--color-300)",
        "color-400": "var(--color-400)",
        "color-500": "var(--color-500)",
        "color-600": "var(--color-600)",
        "color-700": "var(--color-700)",
        "color-800": "var(--color-800)",
        "color-900": "var(--color-900)",
        "neutral-50": "#f0f1f2",
        "neutral-100": "#F3F4F6",
        "neutral-300": "#D1D5DB",
        "neutral-400": "#9CA3AF",
        "neutral-500": "#6B7280",
        "neutral-600": "#4B5563",
        "neutral-800": "#1F2937",
        "info-50": "#ecfafe",
        "info-100": "#c5eefb",
        "info-300": "#5AD7FF",
        "info-500": "#45C8F1",
        "info-700": "#318eab",
        "warning-100": "#ffdec5",
        "warning-300": "#ffb781",
        "warning-500": "#ff9443",
        "warning-700": "#b56930",
        "success-100": "#b0edcc",
        "success-300": "#54d991",
        "success-500": "#00c65b",
        "success-700": "#008d41",
        "error-50": "#FEF3F2",
        "error-100": "#fccbcb",
        "error-300": "#f98e8e",
        "error-500": "#f65757",
        "error-700": "#af3e3e",
        "support-50": "#BBC6FF",
        "support-100": "#8D9FFF",
        "support-300": "#5E76FA",
        "support-500": "#475ED7",
        "support-700": "#364BBE",
      },
      boxShadow: {
        "2xl": "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
    container: {
      center: true,
      screens: {
        "2xl": "1200px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
};
export default config;
