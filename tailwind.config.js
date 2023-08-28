/** @type {import('tailwindcss').Config} */
const { colors } = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // replace default with Rubik
        sans: ["Rubik", ...fontFamily.sans],
      },
      colors: {
        ...colors,
        // primary
        "primary-moderate-blue": "var(--primary-moderate-blue)",
        "primary-soft-red": "hsl(358, 79%, 66%)",
        "primary-light-grayish-blue": "hsl(239, 57%, 85%)",
        "primary-pale-red": "hsl(357, 100%, 86%)",
        // neutral
        "neutral-dark-blue": "hsl(212, 24%, 26%)",
        "neutral-grayish-blue": "hsl(211, 10%, 45%)",
        "neutral-light-gray": "hsl(223, 19%, 93%)",
        "neutral-very-light-gray": "hsl(228, 33%, 97%)",
        "neutral-white": "hsl(0, 0%, 100%)",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};
