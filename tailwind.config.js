/** @type {import('tailwindcss').Config} */

import { Colors } from './src/globals/constants';

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: Colors,
      fontFamily: {
        body: ['Source Sans Pro', 'sans-serif'],
        display: ['Raleway', 'sans-serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        h1: '3rem',
        h2: '2rem',
        h3: '1.5rem',
        h4: '1rem',
      },
      screens: {
        'xs': '600px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1200px',
        'lg-plus': '1248px',
      },
      spacing: {
        1: '1px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
        64: '64px',
        80: '80px',
      },
      maxWidth: {
        200: '200px',
        600: '600px',
        900: '900px',
        1200: '1200px',
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
        16: '16px',
      },
      transitionProperty: {
        'animate-on-observe': 'opacity, transform',
      },
      letterSpacing: {
        1: '1px',
      },
      clipPath: {
        'project-panel': 'polygon(0 0, 0 100%, 0 100%, 0 0)',
        'project-panel-reveal': 'polygon(0 0, 0 100%, 100% 100%, 100% 0)',
      },
    },
  },
  darkMode: ['class', '[theme="dark"]'],
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('tailwind-clip-path'),
  ],
};
