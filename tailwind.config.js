export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color' : '#1C8244',
        "second-gray" : "#808080"
      },
      screens : {
        'min-w' : '800px'
      }
    },
  },
  plugins: [],
}
