/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Quicksand: ["'Quicksand'", "serif"],
        Roboto: ["'Roboto'", "sans-serif"],
      },
      colors: {
        primary: "#5B4B8A",
        secondary: "E8B7D4",
        accent: "A0C3D2",
        customWhite: "#f8f8f8",
        background: "F7F5F2",
        text: "2D2D34",
      },
    },
  },
  plugins: [],
}

