/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pos-chassis': '#2D2D2D',
        'lcd-backlight': '#91B33B',
        'lcd-text': '#1A2408',
        'led-amber': '#FFB000',
        'led-green': '#00FF00',
      },
      fontFamily: {
        'lcd': ['"VT323"', 'monospace'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'tactile': 'inset 2px 2px 4px rgba(0,0,0,0.5), inset -1px -1px 2px rgba(255,255,255,0.1)',
        'chassis': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}