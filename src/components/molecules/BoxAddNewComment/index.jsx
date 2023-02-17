import { useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri"
import { Input } from "../../atoms/Input"

export const BoxAddNewComment = ({ author }) => {
    const refInput = useRef(null);

    const handleCreateFakeComment = () =>{
        alert(refInput.current.value)
    }

    return (
        <div className="w-full px-4 py-2 flex items-center">
            <div className="w-[35px] overflow-hidden rounded-full">
                <img className="w-full h-full object-cover" src="https://via.placeholder.com/100" alt={author} />
            </div>
            <Input
                ref={refInput}
                id="InputWriteComment"
                placeholder={"Digite um comentário aqui..."}
                icon={
                    <RiSendPlaneFill 
                        onClick={handleCreateFakeComment}
                        className="text-s1_7 cursor-pointer fill-blue-500" 
                    />
                }
                size={4}
            />
        </div>
    )
}