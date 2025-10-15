/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue: {
          six: "#37b6fe",
          primary: "#12ABFC",
          secondary: "#49AFF0",
          third: "#3CD2F6",
          four: "#53D8F6",
          five: "#DEF5FF",
        },
      },
    },
  },
  plugins: [],
};
