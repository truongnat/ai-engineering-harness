import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#060810',
        accent: {
          1: '#6366f1',
          2: '#7c3aed',
          3: '#0891b2',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
