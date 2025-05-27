/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: "var(--tw-prose-body)",
            a: {
              color: "var(--tw-prose-links)",
              "&:hover": {
                color: theme("colors.inkspire.navy"),
              },
            },
            maxWidth: "100%",
          },
        },
      }),
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography"), require("tailwindcss-animate")],
  daisyui: {
    themes: [
      {
        inkspire: {
          primary: "#0E2438",          // Deep navy from the feather
          "primary-focus": "#173A5C",  // Slightly lighter navy
          "primary-content": "#FFFFFF",
          secondary: "#F7F3EC",        // Cream background from logo
          "secondary-focus": "#EFE9DE", // Slightly darker cream
          "secondary-content": "#0E2438",
          accent: "#244E70",           // Medium blue accent
          "accent-focus": "#1B3A54",   // Darker accent
          "accent-content": "#FFFFFF",
          neutral: "#3D4451",
          "base-100": "#F7F3EC",       // Cream background
          "base-200": "#EFE9DE",       // Slightly darker cream
          "base-300": "#E5DFD5",       // Even darker cream
          "base-content": "#0E2438",   // Navy for text
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
        dark: {
          primary: "#0E2438",          // Deep navy from the feather
          "primary-focus": "#173A5C",  // Slightly lighter navy
          "primary-content": "#F7F3EC",
          secondary: "#395B76",        // Medium blue-gray
          "secondary-focus": "#2D4A61",
          "secondary-content": "#F7F3EC",
          accent: "#7A95AA",           // Light blue-gray accent
          "accent-focus": "#678599",
          "accent-content": "#0E2438",
          neutral: "#374151",
          "base-100": "#1A2430",       // Dark navy background
          "base-200": "#131B24",       // Darker navy
          "base-300": "#0C1218",       // Very dark navy
          "base-content": "#F7F3EC",   // Cream for text
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
}