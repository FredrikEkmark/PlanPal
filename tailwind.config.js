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
    fontSize: {
      xs: "0.875rem",
      s: "1rem",
      m: "1.25rem",
      l: "1.5rem",
      xl: "2rem",
    },
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      colors: {
        ourcolors: {
          purple: "#A353CA",
          green: "#6ABEA6",
          black: "#000000",
          blue: "#057FA8",
          yellow: "#FBEE7B",
          grey: "#F8F8F8",
          white: "#FFFFFF",
          offWhite: "#F8F8F8",
          red: "#C53C2A",
          font: "#646464",
        },
      },
    },
  },
  plugins: [],
}
