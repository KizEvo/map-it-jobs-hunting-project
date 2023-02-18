/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-primary': '#00ab55',
        'green-primary-dark': '#007b55',
        'green-success': '#36b37e',
        'red-error': '#ff5630',
        'gray-custom': '#161c24',
      },
      transitionProperty: {
        left: 'left',
      },
      height: {
        'custom-jobs-details': '30rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
