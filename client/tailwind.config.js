/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a0f1e",
          800: "#0d1526",
          700: "#111d35",
          600: "#162340",
        },
        electric: {
          500: "#3b82f6",
          400: "#60a5fa",
          300: "#93c5fd",
        },
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
};
