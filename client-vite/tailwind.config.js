/** @type {import('tailwindcss').Config} */

import flowbite from 'flowbite/plugin';
import flowbiteTypography from 'flowbite-typography';
import defaultTheme from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    container: {
      center: true,
    },
  },
  plugins: [
    flowbite,
    flowbiteTypography,
  ],
};

