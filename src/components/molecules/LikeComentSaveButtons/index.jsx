import { useEffect, useRef, useState } from "react";

import { FaHeart, FaSave } from "react-icons/fa";
import { RiAccountCircleFill, RiMessage2Fill } from "react-icons/ri"
import { useNavigate } from "react-router-dom";

import { useFeedApi, useUserApi } from "../../../hooks/useApi";
import { DialogConfirm } from "../../../modals/DialogConfirm";
import { Button } from "../../atoms/Button";


export const LikeComentsSaveButtons = ({ idRecipe, setNmr_hearts, nmr_hearts, setNmr_saved, nmr_saved }) => {
    const refFeedApi = useRef(useFeedApi())
    const refUserApi = useUserApi()
    const [customClassToLoved, setCustomClassToLoved] = useState('')
    const [customClassToComment] = useState('')
    const [customClassToSave, setCustomClassToSave] = useState('');
    const [openModalDialog, setModalDialog] = useState(false)
    const [containerConfirm, setContainerConfirm] = useState()
    const navigate = useNavigate()
    const refButtonSave = useRef()
    const token = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        if (token) {
            const userAlreadyGivedHeart = nmr_hearts.find(nmr => nmr === token.id);
            const userAlreadyGivedSaved = nmr_saved.find(nmr => nmr === token.id);
            if (userAlreadyGivedHeart) setCustomClassToLoved('fill-red-500 text-red-500')
            if (userAlreadyGivedSaved) {
                setCustomClassToSave('fill-green-700 text-green-700')
                refButtonSave.current.textContent = "Salva"
            }
        }
    }, [nmr_hearts, nmr_saved, token])


    const handleLovedButton = async () => {
        if (token) {
            const userAlreadyGivedHeart = nmr_hearts.find(nmr => nmr === token.id);
            if (!userAlreadyGivedHeart) {
                const data = await refFeedApi.current.updateNumberHearts({ idUser: token.id, idRecipe })
                if (data.status === 201) {
                    setCustomClassToLoved('fill-red-500 text-red-500');
                    setNmr_hearts(nmr => [...nmr, token.id]);
                }
            }
        } else {
            setContainerConfirm({
                type: 1,
                message: "Você precisa criar uma conta para dar amei nessa receita",
                button: {
                    icon: <RiAccountCircleFill />,
                    title: 'Criar conta',
                    event:()=> navigate('/register')
                },
                function: setModalDialog(true)
            })
        }

    }

    const handleCommentButton = ({ target }) => {
        const boxFeedComments = target.closest("div[data-id=feed-recipe]").querySelector('[data-id=feed-comment]')
        const input = target.closest("div[data-id=feed-recipe]").querySelector('[data-id=feed-comment] input[data-id=InputWriteComment]')
        input.focus();
        boxFeedComments.classList.toggle("hidden")
        boxFeedComments.classList.toggle("flex")

    }

    const handleSaveButton = async () => {

        if (token) {
            const userAlreadyGivedSaved = nmr_saved.find(nmr => nmr === token.id);
            if (!userAlreadyGivedSaved) {
                const data = await refFeedApi.current.updateNumberSaved({ idUser: token.id, idRecipe })
                const dataUser = await refUserApi.updateNumberSaved({ idUser: token.id, idRecipe })
                if (data.status === 201 && dataUser.status === 204) {
                    setCustomClassToSave('fill-green-700 text-green-700')
                    setNmr_saved(nmr => [...nmr, token.id])
                    refButtonSave.current.textContent = "Salva"
                }
            }
        } else {
            setContainerConfirm({
                type: 1,
                message: "Você precisa criar uma conta para salvar essa receita",
                button: {
                    icon: <RiAccountCircleFill />,
                    title: "Criar conta",
                    event: ()=> navigate('/register')
                },
                function: setModalDialog(true)
            })
        }
    }


    return (
        <div id="LikeComentsSaveButtons-print" className="flex w-5/6 mx-auto">
            <Button
                event={handleLovedButton}
                customClass=
                {`flex w-1/3 items-center justify-center gap-1 hover:bg-background rounded-md text-s1_4 hover:font-bold transition-all group`}
            >
                <FaHeart className={`${customClassToLoved} text-color_sub_text group-hover:fill-red-500`} />
                <p className={`${customClassToLoved} text-color_sub_text group-hover:text-red-500`} >Amei</p>
            </Button>

            <Button
                event={handleCommentButton}
                customClass=
                {`${customClassToComment} flex w-1/3 items-center justify-center gap-1 hover:bg-background rounded-md text-s1_4 hover:font-bold transition-all group`}
            >
                <RiMessage2Fill className="text-color_sub_text group-hover:fill-blue-500 " />
                <p className=" text-color_sub_text group-hover:text-blue-400" >Comentar</p>
            </Button>


            <Button
                event={handleSaveButton}
                customClass=
                {`${customClassToSave} flex w-1/3 items-center justify-center gap-1 hover:bg-background rounded-md text-s1_4 hover:font-bold transition-all group`}
            >
                <FaSave className="text-color_sub_text group-hover:fill-green-700 " />
                <p
                    ref={refButtonSave}
                    className={`${customClassToSave} text-color_sub_text group-hover:text-green-700`} >Salvar</p>
            </Button>

            {/* MODAL: */}
            {
                containerConfirm &&
                <DialogConfirm
                    open={{ openModalDialog, setModalDialog }}
                    container={containerConfirm}
                />
            }
        </div>
    )
}


