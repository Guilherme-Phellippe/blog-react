import { useState } from 'react';
import { FaCamera, FaFacebook, FaArrowAltCircleRight, FaArrowAltCircleLeft, FaWhatsapp } from 'react-icons/fa';
import { WhatsappShareButton } from "react-share"

export const IconsShare = ({ recipe }) => {
    const [showIconsShare, setShowIconsShare] = useState(false)
    const customClass = showIconsShare ? "" : "-translate-x-[83.33%]";

    const handleIconsMobile = () => {
        setShowIconsShare(v => !v)
    }

    return (
        <div
            id="iconShare-print"
            className={`${customClass} md:translate-x-0 transition-all z-50 md:z-0 w-full md:w-1/12 fixed left-0 top-[90%] md:top-[20%] md:left-0 border-[1px] border-color_red md:border-none rounded-3xl md:rounded-none flex md:flex-col items-center bg-white md:bg-transparent`}
        >
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Imprima essa receita
                </span>
                <FaCamera
                    onClick={() => window.print()}
                    className='text-s3 cursor-pointer fill-color_orange' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Compartilhe no Facebook
                </span>
                <FaFacebook className='text-s3 cursor-pointer fill-blue-800' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <WhatsappShareButton
                    title={recipe.name_recipe}
                    separator=' <br /><br /> '
                    url={`https://temsabor.blog/${recipe.name_recipe.replaceAll(" ", "%20")}/${recipe.id}`}
                    
                >
                    <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-4 transition-all'>
                        Compartilhe no Whatsapp
                    </span>
                    <FaWhatsapp className='text-s3 cursor-pointer fill-green-500 ' />
                </WhatsappShareButton>
            </div>

            <div className={`md:hidden md:mt-8 p-4 z-[999] rounded-3xl relative w-full group bg-color_red flex ${showIconsShare ? "justify-center" : "justify-end"}`}>
                {
                    showIconsShare ?
                        <FaArrowAltCircleLeft
                            onClick={handleIconsMobile}
                            className='text-s3 cursor-pointer fill-white ' />
                        :
                        <FaArrowAltCircleRight
                            onClick={handleIconsMobile}
                            className='text-s3 cursor-pointer fill-white ' />
                }
            </div>
        </div>
    )
}