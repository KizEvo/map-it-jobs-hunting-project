/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-primary': '#00ab55',
        'green-primary-dark': '#007b55',
        'gray-custom': '#161c24',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
