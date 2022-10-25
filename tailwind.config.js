/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      boxShadow: {
        'header': '0px 4px 7px rgba(150, 87, 41, 0.67)',
        'orangelg': '0px 0px 3px 1px #E5670B',
        'orangeButton': '0px 0px 3px 3px #E5670B',
        'insetBottom': 'inset 0px 0px 4px 2px rgba(117, 53, 17, 0.281)',
        'innerName': 'inset 0px 2px 4px rgba(49, 24, 3, 0.425)'
      },
      colors: {
        'orange': {
          300: '#FD9434',
          600: '#eb6f17'
        }
      }
    },
  },
  plugins: [],
}
