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
      secondary: '#f2f2f2ff'
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
