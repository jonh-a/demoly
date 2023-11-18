/** @type {import('tailwindcss').Config} */

import flowbite from 'flowbite/plugin'
import flowbiteTypography from 'flowbite-typography'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
    flowbiteTypography,
  ],
}

