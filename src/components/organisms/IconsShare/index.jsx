import { useContext, useState } from 'react';
import { useParams } from "react-router-dom"
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton, TelegramShareButton } from "react-share"


import { FaCamera, FaFacebook, FaArrowAltCircleRight, FaArrowAltCircleLeft, FaWhatsapp, FaTwitter, FaTelegram, FaLink } from 'react-icons/fa';
import { MdOutlineSendToMobile } from 'react-icons/md';

import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { useWhatsapp, useShortLink } from '../../../hooks/useApi';
import { dialog } from "../../../modals/Dialog"

export default function IconsShare({ recipe }) {
    const { user } = useContext(HomeContext)
    const Whatsapp = useWhatsapp()
    const shotLinks = useShortLink()
    const [showIconsShare, setShowIconsShare] = useState(false)
    const customClass = showIconsShare ? "" : "-translate-x-[83.33%]";
    const params = useParams();

    const handleIconsMobile = () => {
        setShowIconsShare(v => !v)
    }

    const handleSendWhatsapp = async () => {
        await Whatsapp.sendRecipe(recipe)
    }

    const createAShortLink = async () => {
        const { id } = params
        const linkLocalStorage = JSON.parse(localStorage.getItem("short_links")) || []
        const hasLinkSaveLocalStorage = linkLocalStorage.find(link => link?.recipeId === id)

        var response;
        if (hasLinkSaveLocalStorage) {
            response = { data: { short_link: hasLinkSaveLocalStorage.short_link } }
        } else {
            response = await shotLinks.createShortLink({ key: recipe.name_recipe, id })

            linkLocalStorage.push(response)

            localStorage.setItem("short_links", JSON.stringify(linkLocalStorage))
        }

        if (response) {
            const { data: { short_link } } = response;

            navigator.clipboard.writeText(short_link).then(() => {
                dialog("Link copiado com sucesso", 2)
            })
        } else dialog("Falha ao copiar o link", 0)
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
                <FacebookShareButton
                    quote={`${recipe?.name_recipe || recipe.name_tip}\n`}
                    url={`https://temsabor.blog/recipe/${recipe?.name_recipe ? recipe.name_recipe.replaceAll(" ", "%20") : recipe.name_tip.replaceAll(" ", "%20")}/${recipe.id}`}
                >
                    <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                        Compartilhe no Facebook
                    </span>
                    <FaFacebook className='text-s3 cursor-pointer fill-blue-800' />
                </FacebookShareButton>
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <TwitterShareButton
                    quote={`${recipe?.name_recipe || recipe.name_tip}\n`}
                    url={`https://temsabor.blog/recipe/${recipe?.name_recipe ? recipe.name_recipe.replaceAll(" ", "%20") : recipe.name_tip.replaceAll(" ", "%20")}/${recipe.id}`}
                >
                    <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                        Compartilhe no Facebook
                    </span>
                    <FaTwitter className='text-s3 cursor-pointer fill-blue-300' />
                </TwitterShareButton>
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <WhatsappShareButton
                    title={`*Olha oque eu encontrei: \n ${recipe?.name_recipe || recipe.name_tip}*\n`}
                    separator={`\n`}
                    url={`https://temsabor.blog/recipe/${recipe?.name_recipe ? recipe.name_recipe.replaceAll(" ", "%20") : recipe.name_tip.replaceAll(" ", "%20")}/${recipe.id}`}
                >
                    <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-4 transition-all'>
                        Compartilhe no Whatsapp
                    </span>
                    <FaWhatsapp className='text-s3 cursor-pointer fill-green-500 ' />
                </WhatsappShareButton>
            </div>
            <div className="flex md:mt-8 justify-center relative w-full group">
                <TelegramShareButton
                    title={`Olha oque eu encontrei: \n*${recipe?.name_recipe || recipe.name_tip}*\n`}
                    separator={"\n"}
                    url={`https://temsabor.blog/recipe/${recipe?.name_recipe ? recipe.name_recipe.replaceAll(" ", "%20") : recipe.name_tip.replaceAll(" ", "%20")}/${recipe.id}`}
                >
                    <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                        Compartilhe no Facebook
                    </span>
                    <FaTelegram className='text-s3 cursor-pointer fill-[#0088cc]' />
                </TelegramShareButton>
            </div>
            {
                user?.admin &&
                <>
                    <div
                        className="flex md:mt-8 justify-center relative w-full group"
                        onClick={handleSendWhatsapp}
                    >
                        <div>
                            <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                                Enviar receita no whatsapp
                            </span>
                            <MdOutlineSendToMobile className='text-s3 cursor-pointer fill-pink-500' />
                        </div>
                    </div>
                    <div className="flex md:mt-8 justify-center relative w-full group">
                        <span className='invisible md:group-hover:visible md:group-hover:translate-x-3/4 bg-white absolute left-0 rounded-br-xl rounded-tr-xl top-0 flex items-center text-s1_2 p-2 transition-all'>
                            Copiar o link da receita
                        </span>
                        <FaLink
                            onClick={createAShortLink}
                            className='text-s3 cursor-pointer fill-yellow-600' />
                    </div>
                </>

            }

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

