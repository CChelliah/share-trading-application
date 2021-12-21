const tailwindcss = require('tailwindcss')
module.exprts = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer')
  ]
}