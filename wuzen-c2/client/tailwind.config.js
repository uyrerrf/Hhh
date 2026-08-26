/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wuzen: {
          bg: '#0a0e17',
          card: '#111827',
          border: '#1f2937',
          cyan: '#06b6d4',
          red: '#ef4444',
          green: '#10b981',
          yellow: '#f59e0b',
          text: '#e5e7eb',
          muted: '#6b7280'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
