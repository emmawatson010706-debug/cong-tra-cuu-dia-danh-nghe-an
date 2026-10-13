/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fdfbf7",
        card: "#ffffff",
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#d97706",
          600: "#b45309",
          700: "#92400e",
        },
        primaryRed: {
          500: "#dc2626",
          600: "#b91c1c",
          700: "#991b1b",
          800: "#7f1d1d",
        }
      },
      fontFamily: {
        serif: ['"Merriweather"', '"Noto Serif"', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', '"Roboto"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
