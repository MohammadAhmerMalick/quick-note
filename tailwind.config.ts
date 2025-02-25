import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#febe00',
        primaryDark: '#c59300',
        neutral: {
          650: '#525252',
          750: '#333333',
          850: '#1f1f1f',
        },
      },
      lineClamp: {
        10: '10',
        15: '15',
      },
    },
  },
  plugins: [],
}
export default config
