import { useEffect, useRef, useState } from "react"
import lazySizes from 'lazysizes';

export const Img = ({ imgs, alt, title }) => {
  //1250, 650, 300, 100 = sizes in hostImages
  const imageRef = useRef(null)
  const [src, setSrc] = useState('')

  useEffect(() =>{
    let result = ''
    
    if (typeof imgs == 'object') {
      if (imageRef.current) {
        const width = Math.floor(imageRef.current.getBoundingClientRect().width)

        if (width < 120) result = imgs?.thumb || imgs.small
        else if (width < 300) result = imgs.small
        else if (width < 600) result = imgs.medium
        else result = imgs.big

      }
    } else if(typeof imgs === 'string') result = imgs
    else {
      console.error("IMAGE IS MISSING", alt)
      result = "https://i.ibb.co/LndM23S/Imagem-n-o-exibida.webp"
    }

    setSrc(result)
  }, [alt, imgs])

  useEffect(() => {
    if (imageRef.current) {
      lazySizes.loader.unveil(imageRef.current);
    }
  }, [src]);

  return (
    <img
      className={`lazyloader w-full h-full object-cover object-center`}
      src="https://i.ibb.co/zsRwZ69/Design-sem-nome-24.webp"
      alt={alt}
      title={title}
      data-src={src}
      data-sizes="auto"
      ref={imageRef}
    />
  )
}