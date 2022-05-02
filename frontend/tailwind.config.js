const tailwindcss = require('tailwindcss');


module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#369FFF',
      },
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
