// const colors = require('tailwindcss/colors') 
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme:{
     extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'primary': '#20BFAA',
        'hovercolor': '#009D87',
        'line' : '#BCB1B1',
        'bg': '#FCF9F9',
        'table':'#F5F5F5'
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },       
  },
    plugins: [],
  }
  
  