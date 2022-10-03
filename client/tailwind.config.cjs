/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: ['class', '[theme-mode="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      tahiti: {
        light: '#67e8f9',
        DEFAULT: '#06b6d4',
        dark: '#0e7490',
      },
      transparent: 'transparent',
      slate: colors.slate,
      stone: colors.stone,
      blue: colors.blue,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      pink: colors.pink,
      orange: colors.orange,
    },
    extend: {},
  },
  plugins: [],
};
