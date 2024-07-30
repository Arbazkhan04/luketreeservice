module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        signika: ['Signika', 'sans-serif'],
      },
      keyframes: {
        spin: {
          'from': { transform: 'rotateY(0)' },
          'to': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        spin: 'spin 4s linear infinite',
      },
    },
  },
  plugins: [],
};
