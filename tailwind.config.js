/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "background-light": "#f0f9ff",
        "background-dark": "#0c1425",
      },
      fontFamily: {
        display: ["Inter", "Noto Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      backgroundImage: {
        radial: "radial-gradient(circle, var(--tw-gradient-stops))",
        linear: "linear-gradient(var(--tw-gradient-stops))",
        "linear-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
        "linear-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
        "linear-45": "linear-gradient(45deg, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
