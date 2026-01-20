import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray01: '#FAFAFA',
        gray02: '#EEEEEE',
        gray03: '#E0E0E0',
        gray04: '#BDBDBD',
        gray05: '#757575',
        gray06: '#424242',
        gray07: '#212121',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        galmuri: ['var(--font-galmuri)'],
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
      },
    },
  },
  plugins: [],
} satisfies Config
