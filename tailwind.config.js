/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(90deg, #E0BCF3 0%, #7EE7EE 100%)",
      },
      backgroundColor: {
        "simple-color": "#ffffff", 
      },

    },
  },
  plugins: [],
}

