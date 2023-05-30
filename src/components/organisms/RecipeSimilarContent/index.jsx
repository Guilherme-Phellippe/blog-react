import { useEffect, useRef, useState } from "react";
import { ListRecipes } from "../../molecules/ListRecipes";
import { useRecipeApi } from "../../../hooks/useApi"


export const RecipeSimilarContent = ({ name_search }) => {
    const [recipes, setRecipes] = useState([])
    const api = useRef(useRecipeApi());

    useEffect(() => {
        const dataFetch = async (api) => {
            const { data } = await api.current.getAllRecipes();
            setRecipes(data)
        }
        dataFetch(api)
    }, []);

    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' &&
            (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [])

    const handleRecipeByTarget = () => {
        const targets = name_search.split(' ');
        var recipesFinds = [];
        //find all recipes that has name_recipe similar the name_recipe or category this recipe.
        recipes.forEach((recipe) => {
            for (let target of targets) {
                if (target.length > 3 && (recipe.name_recipe.toLowerCase().includes(target.toLowerCase()))) {
                    recipesFinds.push(recipe);
                    break
                }
            }
        });
        //if exist one or more recipe with same id , this filter will remove this recipe
        recipesFinds.filter((r, i) => recipesFinds.findIndex(obj => obj.id === r.id) === i)

        //if size not equal like six, this forEach will add new recipe at recipesFinds
        recipesFinds.length < 8 && recipes.forEach(recipe => {
            const founded = !recipesFinds.some(rf => recipe.id === rf.id) && recipe
            if (recipesFinds.length < 8 && founded) recipesFinds.push(founded);
            else return
        });

        return recipesFinds;
    }



    return (
        <div id="RecipeSimilarContent-print" className="w-full bg-background pt-8">
            <div className="w-full bg-white rounded-md p-4">
                <h2 className='text-center text-s2 p-8 text-color_orange font-bold'>Pela web</h2>
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-4781060024956035"
                    data-ad-slot="3655130128"
                    data-matched-content-ui-type="image_stacked"
                    data-matched-content-rows-num={window.innerWidth < 700 ? "3" : "2"}
                    data-matched-content-columns-num={window.innerWidth < 700 ? "1" : "4"}
                    data-ad-format="autorelaxed"
                ></ins>
            </div>

            <div className="w-full bg-white rounded-md">
                <h2 className='text-center text-s2 p-8 text-color_orange font-bold'>Talvez você goste dessas receitas</h2>
                <div className="w-full flex flex-wrap gap-4 py-8 justify-evenly" >
                    {handleRecipeByTarget().length ?
                        handleRecipeByTarget().map(recipe => {
                            return <ListRecipes
                                classContainer='w-[16rem] md:w-[23rem] h-[15rem] border-[1px] overflow-hidden rounded-2xl relative border-solid cursor-pointer transition-transform hover:scale-105 hover:border-color_red'
                                classInfoContent='w-[80%] h-[50%] absolute top-1/4 left-[10%] bg-[#fffa] rounded-2xl flex flex-col justify-center'
                                key={recipe.id}
                                recipe={recipe} />
                        })
                        : <h2>Não temos nenhuma sugestão de receitas para você.</h2>}
                </div>
            </div>
        </div>
    )
}