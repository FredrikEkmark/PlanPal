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
      hxs: "0.875rem",
      hs: "1rem",
      hm: "1.25rem",
      hl: "1.5rem",
      hxl: "2rem",
      bs: "0.75rem",
      bm: "0.875rem",
      bl: "1rem",
      bxl: "1.25rem",
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
          bluegray: "#E8ECF4",
          font: "#646464",
        },
      },
    },
  },
  plugins: [],
}
