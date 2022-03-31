const disabledCss = {
  "code::before": false,
  "code::after": false,
  pre: false,
  code: false,
  'pre code': false,
}

module.exports = {
  content: [
    "./index.html",
    "./**/*.{vue,js,ts}",
    "!./node_modules",
    "!./dist",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: { css: disabledCss },
        sm: { css: disabledCss },
        lg: { css: disabledCss },
        xl: { css: disabledCss },
        '2xl': { css: disabledCss },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
