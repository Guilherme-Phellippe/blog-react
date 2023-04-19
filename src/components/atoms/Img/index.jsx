import { useEffect, useState } from "react"
import { Loading } from "../Loading/Loading";

export const Img = ({ src, alt, ...restProps }) => {
    const [imgLoad, setImgLoad] = useState(false)

    useEffect(() => {
        const img = new Image();
        img.src = src || 'https://i.ibb.co/xjg8FPj/67c4adae57ba.webp';
        img.onload = () => {
            setImgLoad(true)
        }
    }, [src])

    return (
        <>
            {

                imgLoad ?
                    <img
                        className="w-full h-full object-cover"
                        src={src}
                        alt={alt}
                        {...restProps} />
                    :
                    <Loading />
            }
        </>
    )
}