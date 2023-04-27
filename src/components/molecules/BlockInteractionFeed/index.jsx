import { useContext, useEffect, useRef, useState } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { useFeedApi } from "../../../hooks/useApi"
import { NumberLoved } from "../../atoms/NumberLoved"
import { LikeComentsSaveButtons } from "../LikeComentSaveButtons"

export const BlockInteractionFeed = ({ comments, idRecipe }) => {
    const refFeedApi = useRef(useFeedApi())
    const { valueSearch } = useContext(HomeContext)
    const [nmr_saved, setNmr_saved] = useState([])
    const [nmr_hearts, setNmr_hearts] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await refFeedApi.current.getUniqueFeed(idRecipe)
            setNmr_hearts(data.nmr_hearts)
            setNmr_saved(data.nmr_saved)
        })()
    }, [idRecipe]);


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
                    idRecipe={idRecipe}
                />
            </div>
        </div>
    )
}