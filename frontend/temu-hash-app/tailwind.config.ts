import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7c6cf7',
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: '#68d4f8',
          foreground: '#040711'
        },
        muted: {
          DEFAULT: '#f5f7fb',
          foreground: '#4f5d75'
        },
        dark: {
          DEFAULT: '#0f172a',
          foreground: '#e2e8f0'
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        glass: '0 20px 40px -20px rgba(15, 23, 42, 0.45)',
        glowing: '0 0 30px rgba(124, 108, 247, 0.35)'
      },
      borderRadius: {
        xl: '1.5rem'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
