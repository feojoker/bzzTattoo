const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'modernist': ['Modernist'],
      'garamond': ['Cormorant Garamond'],
      'regular': ['Mukta Mahee', 'Arial', 'sans-serif'],
      'playfair': ['Playfair Display'],
    },
    colors: {
      primary: '#d2a200',
      secondary: '#18181b',
      white: colors.white,
      black: colors.black,
      yellow: colors.yellow,
      zinc: colors.zinc,
      red: colors.red,
    }
  },
  plugins: [],
}