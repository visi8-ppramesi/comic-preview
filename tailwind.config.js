const defaultTheme = require('tailwindcss/defaultTheme');
const widthCalc = Array(4).fill(0).reduce((acc, v, idx) => {
  acc[(2 + idx) * 72 + ''] = (2 + idx) * 18 + 'rem'
  return acc
}, {})
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          fontSize: {
            'xxs': ['0.625rem', {
              'lineHeight': '1.5'
            }],
          },
          fontFamily: {
              sans: ['Nunito', ...defaultTheme.fontFamily.sans],
              'open-sans': ['Open Sans', 'sans-serif'],
              'ubuntu': ['Ubuntu', 'sans-serif']
          },
          margin: {
            'xl': '25%',
          },
          colors: {
            'off-purple': '#9f85d7'
          },
          //eslint-disable-next-line no-unused-vars
          height: theme => ({
            "screen-navbar": "calc(100vh - 64px)",
            "screen/2": "50vh",
            "screen/3": "calc(100vh / 3)",
            "screen/4": "calc(100vh / 4)",
            "screen/5": "calc(100vh / 5)",
            "fit-content": "fit-content",
            "96-navbar": "calc(24rem + 64px)"
          }),
          //eslint-disable-next-line no-unused-vars
          width: theme => ({
            "screen/2": "50vw",
            "screen/3": "calc(100vw / 3)",
            "screen/4": "calc(100vw / 4)",
            "screen/5": "calc(100vw / 5)",
            "screen/6": "calc(100vw / 6)",
            "screen/8": "calc(100vw / 8)",
            "screen/10": "calc(100vw / 10)",
            "fit-content": "fit-content",
            "192": "48rem",
            ...widthCalc
          }),
          //eslint-disable-next-line no-unused-vars
          minWidth: theme => ({
            "xl": "36rem"
          }),
          //eslint-disable-next-line no-unused-vars
          minHeight: theme => ({
            "screen-navbar": "calc(100vh - 64px)",
            "10": "10px",
            "20": "20px"
          }),
          //eslint-disable-next-line no-unused-vars
          maxHeight: theme => ({
            '0': '0',
            '1/4': '25vh',
            '1/2': '50vh',
            '3/4': '75vh',
            "screen-4-y": "calc(100vh - 32px)"
            // 'full': '100vh',
          }),
          //eslint-disable-next-line no-unused-vars
          maxWidth: theme => ({
            '0': '0',
            '1/4': '25vw',
            '1/2': '50vw',
            '3/4': '75vw',
            // 'full': '100vw',
          }),
      },
  },
  plugins: [require('@tailwindcss/typography')],
}
