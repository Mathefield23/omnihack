/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        omnihack: {
          primary: '#1D506B',
          secondary: '#C77B6A',
          accent: '#5FA1C4',
          light: '#EEDAD0',
          gold: '#C0AC71',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
