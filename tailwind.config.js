/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Instrument Serif", "serif"],
        body: ["Barlow", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "9999px"
      },
      colors: {
        mary: {
          pink: "#E83E9D",
          vivid: "#FF4FAE",
          soft: "#F8B6D8",
          light: "#FCE7F3",
          deep: "#2A0B24",
          wine: "#4A123A",
          blush: "#FFF3F9",
          gold: "#D7B56D",
          ink: "#24121F",
          muted: "#6F5365"
        }
      }
    }
  },
  plugins: []
};
