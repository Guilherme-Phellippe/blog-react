import { useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri"
import { useCommentApi } from "../../../hooks/useApi";
import { Input } from "../../atoms/Input"

export const BoxAddNewComment = ({ idRecipe, user }) => {
    const refInput = useRef(null);
    const refCommentApi = useRef(useCommentApi())

    const handleCreateComment = async () => {
        const { value } = refInput.current;

        const formComment = {
            userId: user.id,
            recipeId: idRecipe,
            comment: value,
        }

        const response = await refCommentApi.current.createNewComment(formComment)

        console.log(response)
    }

    const handleKeyDown = (e) => {
        if (e.code === "Enter") handleCreateComment()
    }

    return (
        <div className="w-full px-4 py-2 flex items-center">
            <div className="w-[35px] overflow-hidden rounded-full">
                <img className="w-full h-full object-cover" src={user.photo || "https://via.placeholder.com/100"} alt={user.name} />
            </div>
            <Input
                ref={refInput}
                id="InputWriteComment"
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