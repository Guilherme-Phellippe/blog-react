/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        s1: ['clamp(10px, 1vw, 14px)', '13px'],
        s1_1: ['clamp(11px, 1.1vw, 15px)', '14px'],
        s1_2: ['clamp(12px, 1.2vw, 16px)', '15px'],
        s1_3: ['clamp(13px, 1.3vw, 17px)','16px'],
        s1_4: ['clamp(14px, 1.4vw, 18px)','17px'],
        s1_5: ['clamp(15px, 1.5vw, 19px)','18px'],
        s1_7: ['clamp(17px, 1.7vw, 21px)','20px'],
        s2: ['clamp(20px, 2vw, 24px)','23px'],
        s2_5: ['clamp(25px, 2.5vw, 29px)','28px'],
        s3: ['clamp(30px, 3vw, 34px)','34px'],
        s4: ['clamp(40px, 4vw, 44px)','44px'],
        s4_5: ['clamp(45px, 4.5vw, 50px)','44px'],
        s5: ['max(5vw, 55px)']
      },
      colors: {
        background: '#E4E4E4',
        color_orange: '#ff6a28',
        color_red: '#ff6a28bb',
        color_green: '#D4D925',
        color_yellow: "#FFEE63",
        color_text_white: '#fff',
        color_text_black: '#303030',
        color_text_black_light: '#666',
      },
    },
    keyframes:{
      pulse:{
        '0%, 100%': { transform: 'rotate(0deg) scale(1) translateX(0)' },
        '50%': { transform: 'rotate(-30deg) scale(1.5) translateX(-2px)'}
      },
      loading: {
         '0%' : { transform: 'scale(.7) translateY(0)', opacity: '50%' },
         '100%': { transform: 'scale(1.2) translateY(-5px)', opacity: '100%' }
      }
    },
    animation:{
      'pulse-icon': 'pulse 700ms',
      'loading-1': 'loading infinite ease-in alternate-reverse 500ms',
      'loading-2': 'loading infinite ease-in alternate-reverse 500ms 100ms',
      'loading-3': 'loading infinite ease-in alternate-reverse 500ms 200ms'
    }

  },
  plugins: [],
}
