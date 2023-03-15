import { useContext, useEffect, useRef, useState } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { useRecipeApi } from "../../../hooks/useApi"
import { NumberLoved } from "../../atoms/NumberLoved"
import { LikeComentsSaveButtons } from "../LikeComentSaveButtons"

export const BlockInteractionFeed = ({ comments, idRecipe }) => {
    const refRecipeApi = useRef(useRecipeApi())
    const { valueSearch } = useContext(HomeContext)
    const [nmr_hearts, setNmr_hearts] = useState([])

    useEffect(() => {
        (async ()=>{
            const { data } = await refRecipeApi.current.getUniqueRecipe(idRecipe)
            setNmr_hearts(data.nmr_hearts)
        })()
    }, [idRecipe])

    return (
        <div className={`w-full h-[10%] p-2 ${valueSearch && 'hidden'}`}>
            <div className="h-1/2">
                {
                    <NumberLoved
                        nmr_hearts={nmr_hearts.length}
                        nmr_comments={comments.length}
                    />
                }
            </div>
            <div className="h-1/2 flex justify-center">
                <LikeComentsSaveButtons
                    setNmr_hearts={setNmr_hearts}
                    nmr_hearts={nmr_hearts}
                    idRecipe={idRecipe}
                />
            </div>
        </div>
    )
}