import { nextui } from '@nextui-org/react'
import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [
    './src/**/*.tsx',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'eco-farm-ui',
      layout: {
        radius: {
          small: '0.25rem',
          medium: '0.75rem',
          large: '1.25rem',
        },
      },
      addCommonColors: true,
    }),
  ],
} satisfies Config

