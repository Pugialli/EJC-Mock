import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      width: {
        card: '37rem',
      },
      colors: {
        primary: '#7C3AED',
        secondary: '#FBBF24',
        sidebar: '#3A3440',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      aria: {
        invalid: 'invalid="true"',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
