import { FaSave, FaCamera, FaTiktok, FaFacebook, FaInstagram } from 'react-icons/fa';

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
    return (
        <div id="iconShare-print" className="w-1/12 fixed left-0 flex flex-col items-center ">
            <div className="flex mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Salve essa receita</span>
                <FaSave
                    onClick={() => action('save')}
                    className='text-s3 cursor-pointer fill-green-600' />
            </div>
            <div className="flex mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Imprima essa receita
                </span>
                <FaCamera
                    onClick={() => action('print')}
                    className='text-s3 cursor-pointer fill-color_primary' />
            </div>
            <div className="flex mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Compartilhe no Tiktok
                </span>
                <FaTiktok
                    onClick={() => action('tiktok')}
                    className='text-s3 cursor-pointer fill-[#000000]' />
            </div>
            <div className="flex mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Compartilhe no Facebook
                </span>
                <FaFacebook
                onClick={() => action('facebook')}
                className='text-s3 cursor-pointer fill-blue-800' />
            </div>
            <div className="flex mt-8 justify-center relative w-full group">
                <span className='invisible group-hover:visible group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-4 transition-all'>
                    Compartilhe no Instagram
                </span>
                <FaInstagram
                onClick={() => action('instagram')}
                className='text-s3 cursor-pointer fill-[#833AB4] ' />
            </div>
            
            
        </div>
    )
}