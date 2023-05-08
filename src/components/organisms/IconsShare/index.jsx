import { useRef, useState } from 'react';
import { FaSave, FaCamera, FaTiktok, FaFacebook, FaInstagram, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { useUserApi } from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { dialog } from "../../../modals/Dialog"

const action = (type) => {

    switch (type) {
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


export const IconsShare = ({ recipeId, refFeedApi }) => {
    const refUserApi = useRef(useUserApi())
    const [showIconsShare, setShowIconsShare] = useState(false)
    const customClass = showIconsShare ? "" : "-translate-x-[83.33%]";
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("token"))

    const handleIconsMobile = () => {
        setShowIconsShare(v => !v)
    }

    const handleSavedButton = async () => {
        if (token && recipeId) {
            const data = await refFeedApi.current.updateNumberSaved({ idUser: token.id, idRecipe: recipeId })
            if (data.status === 204) {
                const dataUser = await refUserApi.current.updateNumberSaved({ idUser: token.id, idRecipe: recipeId })
                if(dataUser.status === 204) await dialog("Receita salva com sucesso", 2)
                else console.error("error when trying to save recipe for user")
            }else await dialog("Está receita já está salva no seu perfil", 1)
        } else {
            const response = await dialog("Você precisa criar uma conta para dar amei nessa receita", 2, "Criar conta")
            if(response) navigate('/register')
        }
    }


    return (
        <div
            id="iconShare-print"
            className={`${customClass} md:translate-x-0 transition-all z-50 md:z-0 w-full md:w-1/12 fixed left-0 top-[90%] md:top-[20%] md:left-0 border-[1px] border-color_red md:border-none rounded-3xl md:rounded-none flex md:flex-col items-center bg-white md:bg-transparent`}
        >
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Salve essa receita</span>
                <FaSave
                    onClick={handleSavedButton}
                    className='text-s3 cursor-pointer fill-green-600' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Imprima essa receita
                </span>
                <FaCamera
                    onClick={() => action('print')}
                    className='text-s3 cursor-pointer fill-color_orange' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Compartilhe no Tiktok
                </span>
                <FaTiktok
                    onClick={() => action('tiktok')}
                    className='text-s3 cursor-pointer fill-[#000000]' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                    Compartilhe no Facebook
                </span>
                <FaFacebook
                    onClick={() => action('facebook')}
                    className='text-s3 cursor-pointer fill-blue-800' />
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-4 transition-all'>
                    Compartilhe no Instagram
                </span>
                <FaInstagram
                    onClick={() => action('instagram')}
                    className='text-s3 cursor-pointer fill-[#833AB4] ' />
            </div>
            <div className={`md:hidden md:mt-8 p-4 z-[999] rounded-3xl relative w-full group bg-color_red flex ${showIconsShare ? "justify-center": "justify-end"}`}>
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