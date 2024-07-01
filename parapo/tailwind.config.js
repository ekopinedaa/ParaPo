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
      colors: {
        customBlue: '#0C356A',
        customLightBlue: '#0174BE',
        customYellow: '#FFC436',
        customWhite: '#FFF0CE'
      },
  },
  },
  plugins: [],
}

