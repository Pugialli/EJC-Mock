import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      width: {
        card: '37rem',
        100: '28rem',
      },
      colors: {
        primary: '#7C3AED',
        secondary: '#FBBF24',
        tertiary: '#3A3440',
        'gradient-primary': '#582C85',
        'gradient-secondary': '#653DB0',
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
