import { recipes } from "../../../scripts/api/simulation"
import { ListRecipes } from "../../molecules/ListRecipes"

export const CardCategoriesSelect = ({ category }) => {

    const filteredRecipes = recipes.filter(recipe => recipe.category.includes(category.id))
    console.log(filteredRecipes)

    return (
        <div className="w-full p-4 flex flex-wrap justify-center gap-4">
            {filteredRecipes.map(recipe =>
                <ListRecipes
                    key={recipe.id}
                    recipe={recipe}
                    classContainer='w-[23rem] h-[15rem] border-[1px] overflow-hidden rounded-2xl relative border-solid cursor-pointer transition-transform hover:scale-105 hover:border-color_second'
                    classInfoContent='w-[80%] h-[50%] absolute top-1/4 left-[10%] bg-[#fffa] rounded-2xl flex flex-col justify-center'
                />
            )}
        </div>
    )
}