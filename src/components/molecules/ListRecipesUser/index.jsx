import { Link } from "react-router-dom"
import moment from "moment"
import { useState } from "react"

import { FcSettings } from "react-icons/fc"

import { ModalSettingsRecipe } from "../../../modals/ModalSettingsRecipe"


export const ListRecipesUser = ({ recipe, isMyRecipes }) => {
    const [activeSettings, setActiveSettings] = useState(null)
    const [currentRecipe, setCurrentRecipe] = useState(recipe)

    const handleSettingsRecipe = ({ currentTarget }) => {
        setActiveSettings(currentTarget.id)
    }




    return (
        <div className={`flex-none flex gap-y-4 justify-center items-center relative overflow-hidden ${isMyRecipes ? "w-full h-[180px] md:h-[250px]" : "w-1/2 md:w-1/3"}`}>
            <div className={`w-[95%] md:w-4/5 flex border-[1px] border-color_orange shadow-sm relative ${isMyRecipes ? "h-full" : "flex-col h-[250px] md:h-[300px]"}`}>
                <Link className={`cursor-pointer relative ${isMyRecipes ? "w-2/5 h-full" : "w-full h-1/2"}`} to={`/receitas/${recipe.slug}`}>
                    <img className='w-full h-full object-cover' src={currentRecipe.images_recipe.length && currentRecipe.images_recipe[0].medium} alt={recipe.name_recipe} />
                </Link>
                <div className={`px-4 flex flex-col justify-around items-center ${isMyRecipes ? "w-3/5" : "w-full"}`}>
                    <h3 className="text-s1 text-center text-color_text p-2">{currentRecipe.category.name_category}</h3>
                    <h3 className="text-s1_3 text-center text-color_text p-2">{currentRecipe.name_recipe}</h3>
                    <h3 className="text-s1">{moment(recipe.createdAt).format("lll")}</h3>
                    {
                        isMyRecipes ?
                            <div className={`w-3/4 flex flex-col gap-2 bg-color_orange justify-center py-3 px-8 rounded-lg`}>
                                <span className="text-s1 text-white flex justify-between my-1">Número de ameis: <span className="text-white text-s1_5">{recipe.nmr_hearts.length}</span></span>
                                <span className="text-s1 text-white flex justify-between my-1">Número de visualizações: <span className="text-white text-s1_5">{recipe.nmr_eyes}</span></span>
                                <span className="text-s1 text-white flex justify-between my-1">Número de receitas salvas: <span className="text-white text-s1_5">{recipe.nmr_saved.length}</span></span>
                            </div>
                            :
                            <Link className="btn-primary text-s1_5 mt-8" to={`/receitas/${recipe.slug}`}>Ver receita</Link>
                    }
                </div>
                {
                    isMyRecipes &&
                    <FcSettings
                        onClick={handleSettingsRecipe}
                        id={recipe.id}
                        className="text-s2_5 cursor-pointer absolute top-0 right-0 mr-2 mt-2 fill-white"
                    />
                }
            </div>
            {
                activeSettings &&
                <ModalSettingsRecipe
                    recipe={currentRecipe}
                    setCurrentRecipe={setCurrentRecipe}
                    setActiveSettings={setActiveSettings}
                />
            }
        </div>
    )
}