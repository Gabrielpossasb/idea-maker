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
        'innerName': 'inset 0px 2px 4px rgba(49, 24, 3, 0.425)',
        'gray': '0px 0px 4px 1px #44403D',
        'nameProject': '0px 0px 4px 1px #44403D',
        'nameProjectBg': '0px 0px 4px 1px #44403D',
      },
      colors: {
        'orange': {
          300: '#FD9434',
          600: '#eb6f17'
        },
      },
      keyframes: {
        bgDistorcao: {
          '0%, 100%': { borderRadius: '30% 70% 42% 58% / 67% 28% 72% 33%' },
          '25%': { borderRadius: '50% 50% 67% 33% / 64% 11% 89% 36%' },
          '50%': { borderRadius: '16% 84% 21% 79% / 48% 16% 84% 52% ' },
          '75%': { borderRadius: '60% 40% 38% 62% / 56% 79% 21% 44% ' },
        }
      }
    },
  },
  plugins: [],
}
