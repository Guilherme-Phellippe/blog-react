import { useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri"
import { useCommentApi } from "../../../hooks/useApi";
import { Input } from "../../atoms/Input"


export const BoxAddNewComment = ({ id, setComments, userLogged, isRecipe }) => {
    const refInput = useRef(null);
    const refCommentApi = useRef(useCommentApi())

    const handleCreateComment = async () => {
        if (userLogged) {
            const { value } = refInput.current;

            const formComment = {
                comment: value,
                userId: userLogged.id,
                id,
                isRecipe,
            }

            const response = await refCommentApi.current.createNewComment(formComment)

            if (response.status === 201) {

                setComments(comments => [...comments, {
                    id: response.data.id,
                    comment: value,
                    answer: [],
                    user: {
                        id: userLogged.id,
                        name: userLogged.name,
                        photo: userLogged.photo,
                    }
                }])
            }
        } else alert("Você precisar criar uma conta para comentar nessa receita")

        refInput.current.value = ''
        refInput.current.focus();
    }

    const handleKeyDown = (e) => {
        if (e.code === "Enter") handleCreateComment()
    }

    return (
        <div className="w-full px-4 py-2 flex items-center">
            <div className="overflow-hidden rounded-full">
                <img className="w-[40px] h-[40px] object-cover" src={userLogged?.photo || "https://i.ibb.co/JCNSM0R/143086968-2856368904622192-1959732218791162458-n.png" } alt={userLogged?.name || "Usuário"} />
            </div>
            <Input
                ref={refInput}
                data-id="InputWriteComment"
                placeholder={"Digite um comentário aqui..."}
                customWidthAndMargin="w-[100%] m-2"
                onKeyDown={handleKeyDown}
                icon={
                    <RiSendPlaneFill
                        onClick={handleCreateComment}
                        className="text-s1_7 cursor-pointer fill-blue-500" />
                }

            />
        </div>
    )
}