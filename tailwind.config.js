/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-body': '#2D2D2D',
        'terminal-dark': '#1A1A1A',
        'lcd-bg': '#A3B18A',
        'lcd-text': '#1B1B1B',
        'status-success': '#4CAF50',
        'status-error': '#F44336',
      },
      fontFamily: {
        display: ['"VT323"', 'monospace'],
        receipt: ['"Courier Prime"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'btn-up': '2px 2px 0px #1A1A1A',
        'btn-dn': 'inset 2px 2px 0px #000',
        'beveled': 'inset 2px 2px 5px rgba(255,255,255,0.1), inset -2px -2px 5px rgba(0,0,0,0.5)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'print': 'printReceipt 2s ease-out forwards',
      },
      keyframes: {
        printReceipt: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}