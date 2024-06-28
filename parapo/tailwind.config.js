/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          'futura': ['Futura', 'sans-serif'],
          'roboto': ['Roboto', 'sans-serif'],
      },
  },
  },
  plugins: [],
}

