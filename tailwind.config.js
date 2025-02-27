export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color' : '#1C8244'
      },
      screens : {
        'min-w' : '800px'
      }
    },
  },
  plugins: [],
}
