/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
    content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}", 
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#151312", // Amber 500
        light: {
          100: "#D6C6FF", // Gray 100
          200: "#A8B5DB", // Gray 200
          300: "#9CA4AB", // Gray 300
        },
        dark: {
          100: "#221f3d", // Gray 100
          200: "#0f0d23", // Gray 200
        },
        background: "#F3F4F6", // Gray 100
        text: "#111827", // Gray 900
      },
    },
  },
  plugins: [],
}

