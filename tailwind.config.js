/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "m-2xl": { max: "1535px" },
        "m-xl": { max: "1279px" },
        "m-lg": { max: "1023px" },
        "m-md": { max: "767px" },
        "m-sm": { max: "639px" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
