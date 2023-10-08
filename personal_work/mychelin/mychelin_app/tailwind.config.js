/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mcl-logo': 'url(../assets/images/mychelin-logo.svg)',
        //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        //   'gradient-conic':
        //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'mcl-red': '#B80028',
        'mcl-orange': '#FF5B00',
        'mcl-yellow': '#FFC200',
        'mcl-ivory': '#F2F5ED',
        'mcl-eee': '#eeeeee',
        'mcl-ccc': '#cccccc',
        'mcl-999': '#999999',
        'mcl-666': '#666666',
        'mcl-333': '#333333',
        'mcl-404040': '#404040',
      },
      fontFamily: {
        inter: ['var(--inter)'],
        montserrat: ['var(--montserrat)'],
        roboto: ['var(--roboto)'],
        noto_sans_kr: ['var(--noto_sans_kr)'],
        nanium_gothic: ['var(--nanium_gothic)'],
      },
    },
  },
  darkMode: 'class', // dark mode 대비 미리 생성
  mode: 'jit', // css calc 사용 가능하게 해준다
  plugins: ['prettier-plugin-tailwindcss'],
}
