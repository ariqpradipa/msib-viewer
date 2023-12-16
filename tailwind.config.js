/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'only-white': '#FFFFFE',
        'only-black': '#16161A',
        'only-purple': '#7F5AF0',
        'only-dark-gray': '#242629',
        'only-gray': "#94A1B2",
        'only-blue': "#2196F3",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
}