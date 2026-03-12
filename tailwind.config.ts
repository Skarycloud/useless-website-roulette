import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class", "dark"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"],
      },
      colors: {
        border: "var(--border-default)",
        "border-hover": "var(--border-hover)",
        input: "var(--border-default)",
        ring: "var(--border-hover)",
        background: "var(--background)",
        foreground: "var(--text-primary)",
        card: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-primary)",
        },
        primary: {
          DEFAULT: "#FFC83D",
          dark: "#c99a00",
          hover: "#FFD54F",
          foreground: "#7A3E00",
        },
        secondary: {
          DEFAULT: "var(--text-secondary)",
          foreground: "var(--bg-card)",
        },
        muted: {
          DEFAULT: "var(--placeholder-bg)",
          foreground: "var(--icon-muted)",
        },
        accent: {
          DEFAULT: "#58A6FF",
          foreground: "#ffffff",
          yellow: "#FFC83D",
          green: "#58cc02",
          red: "#ef4444",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-primary)",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

