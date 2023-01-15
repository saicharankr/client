module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "clear-chill": "#1B9CFC",
        "georgia-peach": "#FC427B",
        "black":"#041018",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
      },
      backgroundImage: {
        "landing-page": "linear-gradient(180deg, rgb(255 255 255 / 0%) 73.41%, #041018 96.53%), linear-gradient(0deg, rgb(4 16 24 / 5%), rgb(4 16 24 / 22%)),url('/src/assets/landingPage-bg.svg')",
        "landing-mb": "linear-gradient(180deg, rgb(255 255 255 / 0%) 73.41%, #041018 96.53%), linear-gradient(0deg, rgb(4 16 24 / 5%), rgb(4 16 24 / 22%)),url('/src/assets/landingPage-bg.jpg')",
        "card-background":"linear-gradient(119.36deg, rgba(255, 181, 0, 0.5) 0%, rgba(212, 151, 0, 0.1) 100%)",
        "icon-background":"linear-gradient(135deg, rgba(255, 181, 0, 0.5) 0%, rgba(212, 151, 0, 0.1) 100%)"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
