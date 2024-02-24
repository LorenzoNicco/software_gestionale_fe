/** @type {import('tailwindcss').Config} */
export default {
  //Selezione dei file dove tailwind va ad agire
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    //Inizializzazione plugin di daisyui
    require("daisyui")
  ],
}

