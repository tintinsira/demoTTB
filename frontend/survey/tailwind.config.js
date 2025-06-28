// tailwind.config.js
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['var(--font-kanit)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
