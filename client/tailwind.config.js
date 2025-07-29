/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(262, 83%, 58%)",
          foreground: "hsl(210, 40%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(220, 14%, 96%)",
          foreground: "hsl(220, 9%, 46%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(210, 40%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(220, 14%, 96%)",
          foreground: "hsl(220, 9%, 46%)",
        },
        accent: {
          DEFAULT: "hsl(220, 14%, 96%)",
          foreground: "hsl(220, 9%, 46%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(222.2, 84%, 4.9%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(222.2, 84%, 4.9%)",
        },
        success: {
          DEFAULT: "hsl(142, 76%, 36%)",
          foreground: "hsl(355.7, 100%, 97.3%)",
        },
        warning: {
          DEFAULT: "hsl(32, 95%, 44%)",
          foreground: "hsl(355.7, 100%, 97.3%)",
        },
        info: {
          DEFAULT: "hsl(221, 83%, 53%)",
          foreground: "hsl(355.7, 100%, 97.3%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
