

import { FcSearch } from "react-icons/fc"

import { Input } from "../../atoms/Input"
import { useState } from "react"
import { ListRecipesUser } from "../ListRecipesUser"
import { Button } from "../../atoms/Button"

export const PanelListRecipes = ({ recipes, isMyRecipes }) => {
    const [filteredRecipes, setFilteredRecipes] = useState(recipes.sort((a, b) => b.nmr_hearts.length - a.nmr_hearts.length))

    const handleSearchRecipe = ({ target }) => {
        setFilteredRecipes(recipes.filter(recipe => recipe.name_recipe.toLowerCase().includes(target.value.toLowerCase())))
    }



    return (
        <div className={`w-full flex flex-col justify-center items-center mx-auto`}>
            {
                filteredRecipes.length >= 4 &&
                <>
                <h2 className="text-s1_5 my-4 text-color_sub_text text-center">Encontre sua receita</h2>
                <Input
                    onChange={handleSearchRecipe}
                    placeholder="Busque uma receita"
                    icon={<FcSearch className="text-s2" />}
                    customWidthAndMargin="my-4 w-3/5"
                />
                </>
            }

            <div className={`w-full flex gap-4 justify-center items-center max-h-[800px] overflow-y-auto py-8 mt-12 ${isMyRecipes?"flex-col":"flex-wrap"}`}>
                {filteredRecipes.length ?
                    filteredRecipes.map((recipe, key) =>
                        <ListRecipesUser key={key} recipe={recipe} isMyRecipes={isMyRecipes}/>
                    )
                    : <div className="flex flex-col items-center">
                        <p className="text-s1_5 my-12">Não encontramos nenhuma receita sua =(</p>
                        <Button>Criar uma receita</Button>
                    </div>
                }
            </div>
        </div>

    )
}