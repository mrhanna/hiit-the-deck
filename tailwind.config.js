/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      boxShadow: {
        corner: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['archivo-regular'],
      },
    },
  },
  plugins: [],
};
