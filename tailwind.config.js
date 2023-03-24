/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        s1: ['clamp(10px, 1vw, 15px)', '15px'],
        s1_1: ['clamp(11px, 1.1vw, 18px)', '18px'],
        s1_2: ['clamp(12px, 1.2vw, 18px)', '18px'],
        s1_3: ['clamp(13px, 1.3vw, 20px)','20px'],
        s1_5: ['clamp(15px, 1.5vw, 23px)','23px'],
        s1_7: ['clamp(17px, 1.7vw, 26px)','26px'],
        s2: ['clamp(20px, 2vw, 30px)','30px'],
        s2_5: ['clamp(25px, 2.5vw, 37px)','37px'],
        s3: ['clamp(30px, 3vw, 45px)','45px'],
        s4: ['clamp(40px, 4vw, 60px)','60px'],
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
