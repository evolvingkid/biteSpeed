/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter"],
    },
    container: {
      center: true,
    },
    colors: {
      secondary: '#f2f2f2ff',
      primary: '#7282edff',
      lightGreen: '#b1f0e4ff'
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
