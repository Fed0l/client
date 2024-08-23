/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          Amsterdam: ["New Amsterdam", "sans-serif"]
      }
    }
  },
  plugins: [],
}

