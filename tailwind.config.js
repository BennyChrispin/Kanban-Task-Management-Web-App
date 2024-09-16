/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#635FC7",
        primaryLight: "#A8A4FF",
        black: "#000112",
        darkGray: "#20212C",
        mediumGray: "#2B2C37",
        lightGray: "#3E3F4E",
        softGray: "#828FA3",
        lightBlue: "#E4EBFA",
        paleBlue: "#F4F7FD",
        white: "#FFFFFF",
        red: "#EA5555",
        lightRed: "#FF9898",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontWeight: {
        medium: "500",
        bold: "700",
        extraBold: "800",
      },
    },
  },
  plugins: [],
};
