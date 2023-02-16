/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        s1: ['max(10px, 1vw)', '10px'],
        s1_1: ['max(11px, 1.1vw)', '11px'],
        s1_2: ['max(12px, 1.2vw)', '12px'],
        s1_3: ['max(13px, 1.3vw)','13px'],
        s1_5: ['max(15px, 1.5vw)','15px'],
        s1_7: ['max(17px, 1.7vw)','17px'],
        s2: ['max(20px, 2vw)','20px'],
        s3: ['max(30px, 3vw)','30px'],
      },
      colors: {
        color_primary: '#FF6A28',
        color_second: '#ff9161',
        background: '#E4E4E4',
        color_third: '#fba510',
        color_text: '#202020',
        color_sub_text: '#414141',
      },
    },

  },
  plugins: [],
}
