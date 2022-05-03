const tailwindcss = require('tailwindcss');


module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#369FFF',
        'secondary-color': '#D1E5FE',
      },
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
