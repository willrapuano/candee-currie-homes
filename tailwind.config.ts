import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sotheby's-aligned palette
        navy: {
          DEFAULT: '#1a2744',
          50: '#eef1f8',
          100: '#d5dcee',
          200: '#aab8dd',
          300: '#7f94cc',
          400: '#5470bb',
          500: '#3a56a5',
          600: '#2e4385',
          700: '#243365',
          800: '#1a2744',
          900: '#111829',
          950: '#080c14',
        },
        gold: {
          DEFAULT: '#c5a47e',
          50: '#fdf8f3',
          100: '#f8ede0',
          200: '#f0d8bc',
          300: '#e5bf92',
          400: '#d8a268',
          500: '#c5a47e',
          600: '#b8874e',
          700: '#9a6e3e',
          800: '#7d5932',
          900: '#654828',
          950: '#3a2713',
        },
        charcoal: {
          DEFAULT: '#1a1a1a',
          light: '#333333',
          muted: '#666666',
        },
        cream: '#f8f8f8',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(to bottom, rgba(26, 39, 68, 0.55) 0%, rgba(26, 39, 68, 0.35) 50%, rgba(26, 39, 68, 0.7) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #c5a47e 0%, #e8d5b5 50%, #c5a47e 100%)',
        'navy-gradient': 'linear-gradient(135deg, #1a2744 0%, #243365 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(26, 39, 68, 0.08)',
        'card-hover': '0 8px 40px rgba(26, 39, 68, 0.16)',
        'gold': '0 4px 24px rgba(197, 164, 126, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
