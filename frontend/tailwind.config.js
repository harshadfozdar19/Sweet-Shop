/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryPink: "#ec4899",
        primaryPurple: "#a855f7",
      }
    },
  },
  plugins: [],
}

