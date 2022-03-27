module.exports = {
  content: [
    "./index.html",
    "./**/*.{vue,js,ts}",
    "!./node_modules",
    "!./dist",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
