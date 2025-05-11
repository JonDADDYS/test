/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aggiungi dimensioni font personalizzate
      fontSize: {
        '8.5xl': '7rem', // 112px
        '8.25xl': '6.5rem', // 104px
        '8.75xl': '7.5rem', // 120px
      },
      
      // Aggiungi il font Egoshic
      fontFamily: {
        egoshic: ['"Egoshic"', 'sans-serif'],
      },
      
      // Estendi colori se necessario
      colors: {
        primary: {
          light: '#f0f0f0',
          DEFAULT: '#000000',
          dark: '#1a1a1a',
        },
      },
      
      // Altri valori personalizzati
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}