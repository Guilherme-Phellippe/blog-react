import { useState } from 'react';
import { FaSave, FaCamera, FaTiktok, FaFacebook, FaInstagram, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const action = (type) => {

    switch (type) {
        case 'save': {
            alert("Sistema ainda não disponível")
            break;
        }
        case 'print': {
            window.print()
            break;
        }
        case 'tiktok': {
            alert("Sistema ainda não disponível")
            break;
        }
        case 'facebook': {
            alert("Sistema ainda não disponível")
            break;
        }
        case 'instagram': {
            alert("Sistema ainda não disponível")
            break;
        }
        default: {

        }
    }
}


export const IconsShare = () => {
    const [showIconsShare, setShowIconsShare] = useState(false)
    const customClass = showIconsShare ? "" : "-translate-x-[83.33%]"

    const handleIconsMobile = () => {
        setShowIconsShare(v => !v)
    }


    return (
        <div
            id="iconShare-print"
            className={`${customClass} md:translate-x-0 transition-all z-50 md:z-0 w-full md:w-1/12 fixed left-0 top-[90%] md:top-[20%] md:left-0 border-[1px] border-color_red md:border-none rounded-3xl md:rounded-none flex md:flex-col items-center bg-white md:bg-transparent`}
        >
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Salve essa receita</span>
                <FaSave
                    onClick={() => action('save')}
                    className='text-s3 cursor-pointer fill-green-600' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Imprima essa receita
                </span>
                <FaCamera
                    onClick={() => action('print')}
                    className='text-s3 cursor-pointer fill-color_orange' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Compartilhe no Tiktok
                </span>
                <FaTiktok
                    onClick={() => action('tiktok')}
                    className='text-s3 cursor-pointer fill-[#000000]' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Compartilhe no Facebook
                </span>
                <FaFacebook
                    onClick={() => action('facebook')}
                    className='text-s3 cursor-pointer fill-blue-800' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-4 transition-all'>
                    Compartilhe no Instagram
                </span>
                <FaInstagram
                    onClick={() => action('instagram')}
                    className='text-s3 cursor-pointer fill-[#833AB4] ' />
            </div>
            <div className={`md:hidden md:mt-8 justify-end p-4 z-[999] rounded-3xl relative w-full group bg-color_red flex`}>
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