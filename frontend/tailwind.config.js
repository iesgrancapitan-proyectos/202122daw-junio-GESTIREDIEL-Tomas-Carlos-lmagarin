const tailwindcss = require('tailwindcss');


module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '1024px',
      xl: '1224px',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
