import { useContext } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { NumberLoved } from "../../atoms/NumberLoved"
import { LikeComentsSaveButtons } from "../LikeComentSaveButtons"

export const BlockInteractionFeed = ({ nmr_hearts, comments }) => {
    const { valueSearch } = useContext(HomeContext)


    return (
        <div className={`w-full h-[10%] p-2 ${valueSearch && 'hidden'}`}>
            <div className="h-1/2">
                {
                    <NumberLoved
                        nmr_hearts={nmr_hearts}
                        nmr_comments={comments.length}
                    />
                }
            </div>
            <div className="h-1/2 flex justify-center">
                <LikeComentsSaveButtons />
            </div>
        </div>
    )
}