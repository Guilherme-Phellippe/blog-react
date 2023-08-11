import { useEffect, useRef } from "react";
import icon from "../../../images/icon.svg";


export default function LoadingInput() {
    const refIcon = useRef();
    const refText = useRef();
  
    useEffect(()=>{
      const interval = setInterval(() => {
        if(refIcon?.current && refText?.current) {
          const opacity = refIcon.current.dataset.opacity === "1" ? ".8": "1";
          refIcon.current.style.opacity = opacity;
          refIcon.current.dataset.opacity = opacity;
          refText.current.textContent = addingPoint(refText.current.textContent)
        }
      }, 500);
  
      return () => clearInterval(interval)
    }, []);


    function addingPoint(text){
      var countPoint = 0;

      text.split("").forEach(letter => letter === "." && countPoint++)

      var newText = text
      if(countPoint === 3) newText = text.replaceAll(".", "") + "."
      else newText = text += "."
      return newText

    }
  
  
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center bg-white'>
        <img 
          ref={refIcon} 
          className="w-1/2 md:w-1/12 transition-opacity duration-500" 
          src={icon} 
          alt={"Icone da Tem sabor"} 
          data-opacity="1"
        />
        <span ref={refText} className='text-s2 text-color_orange mt-4 font-semibold'>Carregando.</span>
      </div>
    )
  }