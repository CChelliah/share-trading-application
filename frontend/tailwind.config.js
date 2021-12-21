const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#2B2522',
      green: colors.green,
      purple: colors.purple,
      white: colors.white,
      blue: colors.blue,
      gray: colors.coolGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      orange: colors.orange
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms') // import tailwind forms
  ]
}
