/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ourcolors: {
          purple: "#b577d5",
          green: "#6ABEA6",
          yellow: "#FBEE7B",
          white: "#F3F3F3",
          offWhite: "#F8F8F8",
          red: "#C53C2A",
          font: "#646464",
        },
      },
    },
  },
  plugins: [],
}