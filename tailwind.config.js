/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F0E8',
        cream: '#EDE8DC',
        charcoal: '#1C1C1A',
        graphite: '#2E2D2B',
        copper: '#B87333',
        bronze: '#A0522D',
        'copper-light': '#D4924A',
        'copper-pale': '#F0DFC0',
        'text-mid': '#4A4744',
        'text-muted': '#7A7570',
        border: '#D4C4A0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
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
