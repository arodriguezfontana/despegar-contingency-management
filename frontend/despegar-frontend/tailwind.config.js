/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        despegar: {
          blue: '#270570',
          red: '#fa503f',
          light: '#f5f7fa'
        }
      }
    },
  },
  plugins: [],
}