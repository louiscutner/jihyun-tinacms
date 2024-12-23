/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        // background: "#FEFAF5",
        button: "#f0e3d1",
        buttonHover: "#e2d0b2",
        background: "#f8f2ea",
      },
    },
  },
  plugins: [],
};
