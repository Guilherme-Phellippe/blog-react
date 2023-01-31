import { useState } from "react"
import { BoxRecentRecipe } from "./BoxRecentRecipe"

export const RankingRecipes = ({ title , ranking}) => {

    const [limitRecipes, setLimitRecipes] = useState(5)


    return (
        <div className="container-ranking">
            <h2>{title}</h2>
            {
            ranking.length && ranking.map((recent, index) => {
                if (index < limitRecipes) {
                    if (index < 8) return <BoxRecentRecipe key={recent.id} recent={recent} />
                }
            })
        }
        { ranking.length > limitRecipes ? <p onClick={() => setLimitRecipes(ranking.length)}>Veja mais</p> : '' }
        </div>
    )
}