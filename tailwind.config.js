/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        edu: ['"Edu NSW ACT Cursive"', 'cursive'],
        poppins: ['"Poppins"', 'sans-serif'],
        press: ['"Press Start 2P"', 'cursive'],
        truculenta: ['"Truculenta"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
