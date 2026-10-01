/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#0A0A0A',
        cream: '#0D0D0D',
        charcoal: '#F5F1EC',
        graphite: '#141414',
        copper: '#F0B79A',
        bronze: '#F5C9AE',
        'copper-light': '#F2A87D',
        'copper-pale': 'rgba(240, 183, 154, 0.14)',
        'text-mid': '#ACA7A0',
        'text-muted': '#6E6963',
        border: 'rgba(245, 241, 236, 0.10)',
      },
      fontFamily: {
        serif: ['"Manrope"', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
