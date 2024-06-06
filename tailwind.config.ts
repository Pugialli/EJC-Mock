import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      spacing: {
        '11/20': '55%',
        '3/5': '60%',
      },
      maxWidth: {
        carousel: '72rem',
      },
      width: {
        88: '22rem',
        card: '37rem',
        100: '28rem',
        a4: '794px',
        a5: '560px',
        '9/10': '90%',
        title: '34rem',
      },
      height: {
        a4: '1119px',
        a5: '790px',
        '9/10': '90%',
        98: '26rem',
        100: '28rem',
        institucional: '32.5rem',
      },
      translate: {
        institucional: '32.5rem',
      },
      margin: {
        institucional: '32.5rem',
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
