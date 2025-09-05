/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "fintri-green": "#10B981",
        "fintri-green-dark": "#059669",
        "widget-green": "#065F46",
        "widget-green-light": "#10B981",
        "widget-green-dark": "#064E3B",
      },
    },
  },
  plugins: [],
};
