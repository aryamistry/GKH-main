/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        primary: '#f97316',
        secondary: '#fbbf24',
        accent: '#65a30d',
        warm: '#fef3c7'
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
};


