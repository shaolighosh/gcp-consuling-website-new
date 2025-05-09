/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out forwards',
        'fadeInDown': 'fadeInDown 0.5s ease-in-out forwards',
        'fadeInUp': 'fadeInUp 0.5s ease-in-out forwards',
        'slideUpFade': 'slideUpFade 0.7s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'shrink': 'shrink 15s linear forwards',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUpFade: {
          '0%': { opacity: '0.8', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shrink: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        shine: {
          '0%': { left: '-100%', opacity: '0.5' },
          '100%': { left: '100%', opacity: '0' },
        },
      },
      boxShadow: {
        'glow': '0 0 10px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
