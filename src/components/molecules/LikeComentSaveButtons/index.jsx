import { useEffect, useRef } from "react";

import { FaHeart, FaSave } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri"
import { useNavigate } from "react-router-dom";

import { useFeedApi, useUserApi } from "../../../hooks/useApi";
import { Button } from "../../atoms/Button";
import { dialog } from "../../../modals/Dialog";

export default function LikeComentSaveButtons({ recipeId, setNmr_hearts, nmr_hearts, setNmr_saved, nmr_saved }) {
    const token = JSON.parse(localStorage.getItem("token"))
    const refFeedApi = useRef(useFeedApi())
    const refUserApi = useUserApi()
    const refButtonSave = useRef()
    const refButtonLove = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            const userAlreadyGivedHeart = nmr_hearts.find(nmr => nmr === token.id);
            const userAlreadyGivedSaved = nmr_saved.find(nmr => nmr === token.id);
            if (userAlreadyGivedHeart) {
                refButtonLove.current.classList.add('text-red-500', 'font-bold')
                refButtonLove.current.closest('button').querySelector('svg').classList.add('fill-red-500')
            }
            if (userAlreadyGivedSaved) {
                refButtonSave.current.classList.add('text-green-700', 'font-bold')
                refButtonSave.current.closest('button').querySelector('svg').classList.add('fill-green-700')
                refButtonSave.current.textContent = "Salva"
            }
        }
    }, [nmr_hearts, nmr_saved, token])


    const handleLovedButton = async ({ currentTarget }) => {
        if (token) {
            const userAlreadyGivedHeart = nmr_hearts.find(nmr => nmr === token.id);
            if (!userAlreadyGivedHeart) {
                currentTarget.querySelector('svg').classList.add('animate-pulse-icon', 'duration-500', 'fill-red-500');
                const data = await refFeedApi.current.updateNumberHearts({ idUser: token.id, recipeId })
                if (data.status === 201) setNmr_hearts(nmr => [...nmr, token.id]);
            }
        } else {
            const response = await dialog("Você precisa criar uma conta para dar amei nessa receita", 1, "Criar conta")
            if (response) navigate('/register')
        }

    }

    const handleCommentButton = ({ target }) => {
        const boxFeedComments = target.closest("div[data-id=feed-recipe]").querySelector('[data-id=feed-comment]')
        const input = target.closest("div[data-id=feed-recipe]").querySelector('[data-id=feed-comment] input[data-id=InputWriteComment]')
        input.focus();
        boxFeedComments.classList.toggle("hidden")
        boxFeedComments.classList.toggle("flex")
    }

    const handleSaveButton = async ({ currentTarget }) => {

        if (token) {
            const userAlreadyGivedSaved = nmr_saved.find(nmr => nmr === token.id);
            if (!userAlreadyGivedSaved) {
                currentTarget.querySelector('svg').classList.add('animate-pulse-icon', 'duration-500', 'fill-green-700');
                const data = await refFeedApi.current.updateNumberSaved({ idUser: token.id, recipeId })
                const dataUser = await refUserApi.updateNumberSaved({ idUser: token.id, recipeId })
                if (data.status === 200 && dataUser.status === 200) {
                    setNmr_saved(nmr => [...nmr, token.id])
                    refButtonSave.current.textContent = "Salva"
                }
            }
        } else {
            const response = await dialog("Você precisa criar uma conta para salvar essa receita", 1, "Criar conta");
            if (response) navigate('/register')
        }
    }


    return (
        <div id="LikeComentsSaveButtons-print" className="flex w-5/6 mx-auto">
            <Button
                event={handleLovedButton}
                customClass=
                {`flex w-1/3 items-center justify-center gap-1 rounded-md text-s1_4 hover:font-bold transition-all group`}
            >
                <FaHeart className={`text-color_sub_text group-hover:fill-red-500`} />
                <p
                    ref={refButtonLove}
                    className={`group-hover:text-red-500`}
                >
                    Amei
                </p>
            </Button>

            <Button
                event={handleCommentButton}
                customClass=
                {`flex w-1/3 items-center justify-center gap-1 rounded-md text-s1_4 hover:font-bold transition-all group`}
            >
                <RiMessage2Fill className="text-color_sub_text group-hover:fill-blue-500 " />
                <p className="text-color_sub_text group-hover:text-blue-400" >Comentar</p>
            </Button>


            <Button
                event={handleSaveButton}
                customClass=
                {`flex w-1/3 items-center justify-center gap-1 rounded-md text-s1_4 hover:font-bold transition-all group`}
            >
                <FaSave className="text-color_sub_text group-hover:fill-green-700 " />
                <p
                    ref={refButtonSave}
                    className={`text-color_sub_text group-hover:text-green-700`}
                >Salvar</p>
            </Button>
        </div>
    )
}

