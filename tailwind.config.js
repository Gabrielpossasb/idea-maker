/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      boxShadow: {
        'orangelg': '0px 0px 3px 1px #E5670B',
        'header': '0px 4px 7px rgba(150, 87, 41, 0.67)'
      },
      colors: {
        'orange': {
          600: '#eb6f17'
        }
      }
    },
  },
  plugins: [],
}
