import { useEffect, useRef, useState } from "react"
import { useRecipeApi } from "../../../hooks/useApi"

import { PanelListRecipes } from "../../molecules/PanelListRecipes"

export const PanelRecipesSaved = ({ user }) => {
    const refRecipeApi = useRef(useRecipeApi())
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await refRecipeApi.current.getAllRecipes();
            setRecipes(data.filter(recipe => recipe.nmr_saved.includes(user.id)))
        })()
    }, [user])


    return (
        <div className="flex">
            {
                recipes.length ?
                    <PanelListRecipes recipes={recipes} />
                    :
                    <p className="w-full text-center text-s1_7">Você ainda não tem nenhuma receita salva =(</p>

            }
        </div>
    )
}