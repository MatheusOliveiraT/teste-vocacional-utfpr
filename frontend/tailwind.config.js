/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        utfpr: {
          yellow: '#FFC709',
          'yellow-hover': '#E0A800',
          dark: '#0D1117',
          card: '#161B22',
          border: '#30363D',
          text: '#F0F6FC',
          subtle: '#8B949E',
        },
      },
    },
  },
  plugins: [],
};