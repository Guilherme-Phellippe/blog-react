import { useEffect, useRef } from "react"
import lazySizes from 'lazysizes';

export const Img = ({ src, alt, title }) => {
    const imageRef = useRef(null)

    useEffect(() => {
        if (imageRef.current) {
          lazySizes.loader.unveil(imageRef.current);
        }
      }, []);

    return (
        <img
            className={`lazyloader w-full h-full object-cover`}
            data-src={src}
            src="https://i.ibb.co/zsRwZ69/Design-sem-nome-24.webp"
            alt={alt}
            title={title}
            ref={imageRef}
        />
    )
}