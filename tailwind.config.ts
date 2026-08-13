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
        // Corcoran McEnearney-aligned neutrals with an accessible rose accent.
        // Legacy utility names are retained to keep the existing component API stable.
        navy: {
          DEFAULT: '#181716',
          50: '#f7f6f4',
          100: '#eceae7',
          200: '#d7d3ce',
          300: '#b9b3ac',
          400: '#948d85',
          500: '#746e67',
          600: '#5c5751',
          700: '#48443f',
          800: '#2f2d2a',
          900: '#181716',
          950: '#0d0c0c',
        },
        gold: {
          DEFAULT: '#b3263e',
          50: '#fff5f6',
          100: '#fde8ec',
          200: '#f8cbd3',
          300: '#eca3b0',
          400: '#db7184',
          500: '#c94b63',
          600: '#b3263e',
          700: '#8f1f34',
          800: '#711b2b',
          900: '#591923',
          950: '#340b12',
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
        'hero-overlay': 'linear-gradient(to bottom, rgba(13, 12, 12, 0.58) 0%, rgba(13, 12, 12, 0.38) 50%, rgba(13, 12, 12, 0.78) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #b3263e 0%, #eca3b0 50%, #b3263e 100%)',
        'navy-gradient': 'linear-gradient(135deg, #181716 0%, #2f2d2a 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(24, 23, 22, 0.08)',
        'card-hover': '0 8px 40px rgba(24, 23, 22, 0.16)',
        'gold': '0 4px 24px rgba(179, 38, 62, 0.24)',
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
  plugins: [require('@tailwindcss/typography')],
}

export default config
