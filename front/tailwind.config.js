/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        sm: "320px",
        md: "768px",
        lg: "1400px",
        xl: "1920px",
      },
    },

    fontSize: {
      xs: "0.5rem",
      sm: "0.75rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      etcWord: "#A49393",
      cusGray: "#E5E0E0",
      blueButton: {
        default: "#87CEEB",
        long: "#3FC1F6",
      },
      orangeButton: "#FFA500",
      redButton: "#EE98A7",
      greenButton: "#35D835",
      yellow: "#fcd34d",
      red: "#dc2626",
      realRed: "#FF0000",
      chatRed: "#FDF3F3",
    },
    container: {
      center: true,
      padding: {
        sm: "0.75rem",
      },
    },
    screens: {
      sm: { min: "320px", max: "767px" },
      md: { min: "768px", max: "1399px" },
      lg: { min: "1400px", max: "1919px" },
      xl: { min: "1920px" },
    },
  },
  plugins: [],
};
