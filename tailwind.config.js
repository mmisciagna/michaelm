/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      // Primaries
      'slate-blue': 'hsl(215 19% 22%)',
      'slate-blue-md': 'hsl(215 18% 20%)',
      'slate-blue-dk': 'hsl(215 28% 9%)',
      'slate-blue-90': 'hsl(215 19% 22% / 0.9)',
      // Accents
      'bronze': 'hsl(30 61% 50%)',
      'off-white': 'hsl(30 100% 97%)',
      // Whites
      'white': 'hsl(0 0% 100%)',
      'white-70': 'hsl(0 0% 100% / .7)',
      'white-50': 'hsl(0 0% 100% / .5)',
      'white-25': 'hsl(0 0% 100% / .25)',
      'white-10': 'hsl(0 0% 100% / .1)',
      // Blacks
      'black': 'hsl(0 0% 0%)',
      'black-25': 'hsl(0 0% 0% / .25)',
      // Successes/Errors
      'green': 'hsl(120 100% 25%)',
      'green-10': 'hsl(120 100% 25% / .1)',
      'green-lgt': 'hsl(120 41% 72%)',
      'red': 'hsl(0 41% 45%)',
      'red-10': 'hsl(0 41% 45% / .1)',
      'red-lgt': 'hsl(0 47% 74%)',
    },
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
      xs: '600px',
      sm: '768px',
      md: '1024px',
      lg: '1200px',
    },
    extend: {
      spacing: {
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        48: '48px',
        64: '64px',
        80: '80px',
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
