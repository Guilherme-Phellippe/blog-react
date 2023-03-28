import { Link } from "react-router-dom"
import moment from "moment"
import { formatTextLong } from "../../../scripts/formatTextLong"

import { FcSearch, FcSettings } from "react-icons/fc"

import { Input } from "../../atoms/Input"
import { useState } from "react"

export const PanelListRecipes = ({ recipes }) => {

    const [filteredRecipes, setFilteredRecipes] = useState(recipes.sort((a, b) => b.nmr_hearts.length - a.nmr_hearts.length))

    const handleSearchRecipe = ({ target }) => {
        setFilteredRecipes(recipes.filter(recipe => recipe.name_recipe.toLowerCase().includes(target.value.toLowerCase())))
    }

    return (
        <div className="w-4/5 flex flex-col justify-center items-center mx-auto">
            <h2 className="text-s1_5 my-4 text-color_sub_text text-center">Encontre sua receita</h2>
            <Input
                onChange={handleSearchRecipe}
                placeholder="Busque uma receita"
                icon={<FcSearch className="text-s2" /> }
                customWidthAndMargin="my-4 w-3/5" 
            />

            <div className="w-full flex flex-col gap-4 items-center max-h-[800px] overflow-auto py-8 mt-12">
                {filteredRecipes.length ?
                    filteredRecipes.map((recipe, key) =>
                        <div className="w-4/5 flex h-[170px] border-[1px] border-color_primary shadow-sm relative">
                            <Link className="w-2/5 h-full cursor-pointer" key={key} to={`/recipe/${recipe.id}`}>
                                <img className='w-full h-full object-cover' src={recipe.images_recipe[0].small} alt={recipe.name_recipe} />
                            </Link>
                            <div className="px-4 w-3/5 flex flex-col justify-around items-center">
                                <h3 className="text-center text-s1">{recipe.category.name_category}</h3>
                                <h2 className="text-s1_2 text-color_sub_text text-center" title={recipe.name_recipe}>{formatTextLong(recipe.name_recipe, 40)}</h2>
                                <h3 className="text-s1">{moment(recipe.createdAt).format("lll")}</h3>
                                <div className="w-3/4 flex flex-col bg-color_primary justify-center text-white p-2 rounded-lg">
                                    <span className="text-s1 flex justify-between my-1">Número de ameis: <span>{recipe.nmr_hearts.length}</span></span>
                                    <span className="text-s1 flex justify-between my-1">Número de visualizações: <span>{recipe.nmr_eyes}</span></span>
                                    <span className="text-s1 flex justify-between my-1">Número de receitas salvas: <span>{recipe.nmr_saved}</span></span>
                                </div>
                            </div>
                            <FcSettings className="text-s2_5 cursor-pointer absolute top-0 right-0 mr-2 mt-2 fill-white" />
                        </div>
                    )
                    : <p className="text-s1_5 my-12">Não encontramos nenhuma receita =(</p>
                }
            </div>
        </div>

    )
}