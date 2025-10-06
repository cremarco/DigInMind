import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Nunito Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          // Primary neutrals and accents drawn from the Tailwind palette
          ink: colors.slate[950],
          charcoal: colors.slate[900],
          graphite: colors.slate[700],
          mist: colors.slate[100],
          cloud: colors.slate[50],

          // Brand accent spectrum
          cerulean: colors.blue[500],
          sky: colors.sky[400],
          aqua: colors.teal[400],
          amber: colors.amber[400],
          coral: colors.rose[400],
        },
      },
    },
  },
  plugins: [],
}

