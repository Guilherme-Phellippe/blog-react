import { useEffect, useRef } from "react";


export default function LoadingInput() {
    const refText = useRef();
  
    useEffect(()=>{
      const interval = setInterval(() => {
        if(refText?.current) refText.current.textContent = addingPoint(refText.current.textContent)
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
        <span ref={refText} className='text-s2 text-color_orange mt-4 font-semibold'>Carregando.</span>
      </div>
    )
  }