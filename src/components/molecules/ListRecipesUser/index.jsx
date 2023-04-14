import { Link } from "react-router-dom"
import moment from "moment"
import { useState } from "react"

import { MdDelete, MdCheckBox } from "react-icons/md"
import { FcSettings } from "react-icons/fc"

import { Button } from "../../atoms/Button"
import { useRecipeApi } from "../../../hooks/useApi"
import { Loading } from "../../atoms/Loading/Loading"


export const ListRecipesUser = ({ recipe, isMyRecipes }) => {
    const recipeApi = useRecipeApi()
    const [loading, setLoading] = useState(false)
    const [activeSettings, setActiveSettings] = useState(false)
    const [inputCategory, setInputCategory] = useState(recipe.category.name_category)
    const [inputNameRecipe, setInputNameRecipe] = useState(recipe.name_recipe)
    const [inputImage, setInputImage] = useState(recipe.images_recipe)

    const handleSettingsRecipe = () => {
        setActiveSettings(true)
    }

    const handleUploadImage = async ({ currentTarget }) => {
        if (!loading) {
            setLoading(true)
            const file = currentTarget.querySelector("input#file").files[0]
            if (file) {
                const form = new FormData();
                form.append('image', file);
                const { data } = await recipeApi.hostImages(form)
                setInputImage([{ ...data }])
                recipe.images_recipe = [{ ...data }]
                const reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onload = () => currentTarget.querySelector("img").src = reader.result;

            } else alert("erro ao processar sua foto, tente novamente mais tarde.");

            setLoading(false)
        }
    }

    const handleUpdateRecipe = async () => {
        if (!loading) {
            setLoading(true)
            if (recipe) {
                const recipeData = {
                    id: recipe.id,
                    name_recipe: inputNameRecipe,
                    name_category: inputCategory,
                    images_recipe: inputImage
                }
                const response = await recipeApi.updateRecipe(recipeData).catch(error => {
                    setLoading(false)
                    console.error(error)
                    alert("Não foi possivel fazer suas alterações, entre em contato conosco.")
                })
                recipe.category.name_category = inputCategory
                recipe.name_recipe = response.data.name_recipe

                setActiveSettings(false)
            }
            setLoading(false)
        }

    }

    const handleDeleteRecipe = async () => {
        if (!loading) {
            setLoading(true);
            const canDelete = prompt("Digite o nome da categoria da receita para deleta-la:")
            if (canDelete && recipe.category.name_category.toLowerCase().includes(canDelete.toLowerCase())) {
                const response = await recipeApi.deleteRecipe(recipe.id).catch(error => setLoading(false))
                if (response.status === 200) window.location.reload()
            } else alert("Nome da categoria da receita incorreto!")
            setLoading(false)
        }
    }

    return (
        <div className={`flex-none flex gap-y-4 justify-center items-center relative overflow-hidden ${isMyRecipes ? "w-full h-[180px] md:h-[250px]" : "w-1/2 md:w-1/3"}`}>
            <div className={`w-[95%] md:w-4/5 flex border-[1px] border-color_orange shadow-sm relative ${isMyRecipes ? "h-full" : "flex-col h-[250px] md:h-[300px]"}`}>
                {
                    activeSettings ?
                        <label onChange={handleUploadImage} className={`cursor-pointer relative w-2/5 h-full`} htmlFor="file">
                            {loading && <Loading />}
                            <input type="file" id="file" className="hidden" />
                            <img className='w-full h-full object-cover' src={inputImage.length && inputImage[0].medium} alt={recipe.name_recipe} />
                            <div className="w-full h-full grid place-content-center bg-[#242424aa] absolute top-0 text-s2 text-white">Alterar Imagem</div>
                        </label>
                        :
                        <Link className={`cursor-pointer relative ${isMyRecipes ? "w-2/5 h-full" : "w-full h-1/2"}`} to={`/recipe/${recipe.id}`}>
                            <img className='w-full h-full object-cover' src={inputImage.length && inputImage[0].medium} alt={recipe.name_recipe} />
                        </Link>
                }
                <div className={`px-4 flex flex-col justify-around items-center ${isMyRecipes ? "w-3/5" : "w-full"}`}>
                    <input
                        title={inputCategory}
                        value={inputCategory}
                        onChange={({ target }) => setInputCategory(target.value)}
                        className={`w-[90%] text-s1 text-center text-color_text p-2 outline-none ${activeSettings ? "bg-background" : "border-none  bg-transparent"}`}
                        disabled={!activeSettings}
                    />
                    <input
                        title={inputNameRecipe}
                        value={inputNameRecipe}
                        onChange={({ target }) => setInputNameRecipe(target.value.charAt(0).toUpperCase() + target.value.slice(1))}
                        className={`w-[90%] text-s1_3 text-center text-color_text p-2 outline-none ${activeSettings ? "bg-background" : "border-none  bg-transparent"}`}
                        disabled={!activeSettings}
                    />
                    <h3 className="text-s1">{moment(recipe.createdAt).format("lll")}</h3>
                    {
                        isMyRecipes ?
                            <div className={`w-3/4 flex flex-col gap-2 bg-color_orange justify-center py-3 px-8 rounded-lg`}>
                                <span className="text-s1 text-white flex justify-between my-1">Número de ameis: <span className="text-white text-s1_5">{recipe.nmr_hearts.length}</span></span>
                                <span className="text-s1 text-white flex justify-between my-1">Número de visualizações: <span className="text-white text-s1_5">{recipe.nmr_eyes}</span></span>
                                <span className="text-s1 text-white flex justify-between my-1">Número de receitas salvas: <span className="text-white text-s1_5">{recipe.nmr_saved.length}</span></span>
                            </div>
                            :
                            <Link className="btn-primary text-s1_5 mt-8" to={`/recipe/${recipe.id}`}>Ver receita</Link>
                    }
                </div>
                {
                    isMyRecipes ? activeSettings ?
                        <div onClick={handleUpdateRecipe} className="flex items-center text-s1 underline absolute cursor-pointer top-0 right-0 mr-2 mt-2">
                            {loading && <Loading />}
                            salvar
                            <MdCheckBox className="text-s2 fill-green-500" />
                        </div>
                        :
                        <FcSettings onClick={handleSettingsRecipe} className="text-s2_5 cursor-pointer absolute top-0 right-0 mr-2 mt-2 fill-white" />
                        :
                        null
                }
            </div>
            {
                activeSettings &&
                <Button event={handleDeleteRecipe} customClass="btn-primary bg-red-500 relative">{loading && <Loading />} <MdDelete /> {window.innerWidth < 700 ? "":"Deletar receita"} </Button>
            }
        </div>
    )
}