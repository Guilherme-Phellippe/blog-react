import { useEffect, useRef, useState } from "react";
import { FaHeart, FaSave } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri"
import { useRecipeApi, useUserApi } from "../../../hooks/useApi";
import { Button } from "../../atoms/Button";


export const LikeComentsSaveButtons = ({ idRecipe, setNmr_hearts, nmr_hearts, setNmr_saved, nmr_saved }) => {
    const refRecipeApi = useRef(useRecipeApi())
    const refUserApi = useUserApi()
    const [customClassToLoved, setCustomClassToLoved ] = useState('')
    const [customClassToComment ] = useState('')
    const [customClassToSave , setCustomClassToSave] = useState('');
    const refButtonSave = useRef()
    const token = JSON.parse(localStorage.getItem("token"))

    useEffect(()=>{
        if(token){
            const userAlreadyGivedHeart = nmr_hearts.find(nmr => nmr === token.id);
            const userAlreadyGivedSaved = nmr_saved.find(nmr => nmr === token.id);
            if(userAlreadyGivedHeart) setCustomClassToLoved('fill-red-500 text-red-500')
            if(userAlreadyGivedSaved){
                setCustomClassToSave('fill-green-700 text-green-700')
                refButtonSave.current.textContent = "Salva"
            }
        }
    }, [nmr_hearts, nmr_saved , token])


    const handleLovedButton = async () => {
        if(token){
            const userAlreadyGivedHeart = nmr_hearts.find(nmr => nmr === token.id);
            if(!userAlreadyGivedHeart){
                const data = await refRecipeApi.current.updateNumberHearts({idUser: token.id, idRecipe})
                if(data.status === 204){
                    setCustomClassToLoved('fill-red-500 text-red-500');
                    setNmr_hearts(nmr => [...nmr, token.id]);
                }
            }else alert("você já deu seu amei nessa receita");
        }else alert("Crie uma conta ou faça seu login");

    }
    const handleCommentButton = ({ target }) => {
        const boxFeedComments = target.closest("div#feed-recipe").querySelector('#feed-comment')
        const input = target.closest("div#feed-recipe").querySelector('#feed-comment #InputWriteComment')
        input.focus();
        boxFeedComments.classList.toggle("hidden")
        boxFeedComments.classList.toggle("flex")

    }
    const handleSaveButton = async () => {
        if(token){
            const userAlreadyGivedSaved = nmr_saved.find(nmr => nmr === token.id);
            if(!userAlreadyGivedSaved){
                const data = await refRecipeApi.current.updateNumberSaved({idUser: token.id, idRecipe})
                const dataUser = await refUserApi.updateNumberSaved({idUser: token.id, idRecipe})
                if(data.status === 204 && dataUser.status === 204){
                    setCustomClassToSave('fill-green-700 text-green-700')
                    setNmr_saved(nmr => [...nmr, token.id])
                    refButtonSave.current.textContent = "Salva"
                }
            }else alert("você já salvou essa receita!")
        }else alert("Crie uma conta ou faça seu login")
    }


    return (
        <div id="LikeComentsSaveButtons-print" className="flex w-5/6 mx-auto">
            <Button
                event={handleLovedButton}
                customClass=
                {`flex w-1/3 items-center justify-center gap-1 hover:bg-background rounded-md text-s1_4 hover:font-bold transition-all group`}
            >
                <FaHeart className={`${customClassToLoved} group-hover:fill-red-500`} />
                <p className={`${customClassToLoved} group-hover:text-red-500`} >Amei</p>
            </Button>

            <Button
                event={handleCommentButton}
                customClass=
                {`${customClassToComment} flex w-1/3 items-center justify-center gap-1 hover:bg-background rounded-md text-s1_4 hover:font-bold transition-all group`}
            >
                <RiMessage2Fill className="group-hover:fill-blue-500 " />
                <p className="group-hover:text-blue-400" >Comentar</p>
            </Button>

            <Button
                event={handleSaveButton}
                customClass=
                {`${customClassToSave} flex w-1/3 items-center justify-center gap-1 hover:bg-background rounded-md text-s1_4 hover:font-bold transition-all group`}
            >
                <FaSave className="group-hover:fill-green-700 " />
                <p 
                    ref={refButtonSave}
                    className="group-hover:text-green-700" >Salvar</p>
            </Button>
        </div>
    )
}


