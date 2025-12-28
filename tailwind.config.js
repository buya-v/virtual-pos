/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          surface: '#1A1A1B',
          screen: '#2D5A27',
          text: '#A0D995',
        },
        action: {
          confirm: '#22C55E',
          cancel: '#EF4444',
          clear: '#F59E0B',
        },
        led: {
          active: '#3B82F6',
        }
      },
      fontFamily: {
        display: ['"JetBrains Mono"', 'monospace'],
        ui: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        key: '0px 4px 0px #000000',
        terminal: '0px 20px 40px -5px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'lcd-scanlines': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 4px)',
      }
    },
  },
  plugins: [],
}