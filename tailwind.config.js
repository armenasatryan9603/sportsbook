/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#130D25",
        "custom-bg": "#020218",
      },
    },
  },
  plugins: [],
};
