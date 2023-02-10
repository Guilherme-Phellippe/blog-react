/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        s1_2: 'max(12px, 1.2vw)',
        s1_3: 'max(13px, 1.3vw)',
        s1_5: 'max(15px, 1.5vw)',
        s1_7: 'max(17px, 1.7vw)',
        s2: 'max(20px, 2vw)',
        s3: 'max(30px, 3vw)',
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
