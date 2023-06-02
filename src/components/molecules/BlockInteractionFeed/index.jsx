import { lazy, useContext, useEffect, useState } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { NumberLoved } from "../../atoms/NumberLoved"

const LikeComentsSaveButtons = lazy(()=> import("../LikeComentSaveButtons"))

export const BlockInteractionFeed = ({ content }) => {
    const { valueSearch } = useContext(HomeContext)
    const [nmr_saved, setNmr_saved] = useState([])
    const [nmr_hearts, setNmr_hearts] = useState([])
    const comments = content.comments
    const recipeId = content.id

    useEffect(() => {
        setNmr_hearts(content.nmr_hearts)
        setNmr_saved(content.nmr_saved)
    }, [content]);


    return (
        <div className={`w-full h-[8rem] p-2 py-4 ${valueSearch && 'hidden'}`}>
            <div className="h-1/2">
                <NumberLoved
                    nmr_hearts={nmr_hearts.length}
                    nmr_comments={comments.length}
                />
            </div>
            <div className="h-1/2 flex justify-center">
                <LikeComentsSaveButtons
                    setNmr_hearts={setNmr_hearts}
                    setNmr_saved={setNmr_saved}
                    nmr_hearts={nmr_hearts}
                    nmr_saved={nmr_saved}
                    recipeId={recipeId}
                />
            </div>
        </div>
    )
}