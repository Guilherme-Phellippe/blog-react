import { ListRecipes } from "../../molecules/ListRecipes";
import { recipes } from "../../../scripts/api/simulation";



export const RecipeSimilarContent = ({ recipe }) => {

    const { name_recipe, category } = recipe

    const handleRecipeByTarget = () => {
        const targets = name_recipe.split(' ');
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
        recipesFinds.length < 6 && recipes.forEach(recipe => {
            const founded = !recipesFinds.some(rf => recipe.id === rf.id) && recipe
            if (recipesFinds.length < 6 && founded) recipesFinds.push(founded);
            else return
        });

        return recipesFinds;
    }

    return (
        <div className="w-full bg-background pt-8">
            <div className="w-full bg-white rounded-md">
                <h2 className='text-center text-s2 p-8 text-color_primary font-bold'>Talvez você goste</h2>
                <div className="w-full flex flex-wrap gap-4 py-8 justify-center" >
                    {handleRecipeByTarget().length ?
                        handleRecipeByTarget().map(recipe => {
                            return <ListRecipes 
                                        classContainer='w-[23rem] h-[15rem] border-[1px] overflow-hidden rounded-2xl relative border-solid cursor-pointer transition-transform hover:scale-105 hover:border-color_second'
                                        classInfoContent='w-[80%] h-[50%] absolute top-1/4 left-[10%] bg-[#fffa] rounded-2xl flex flex-col justify-center'
                                        key={recipe.id} 
                                        recipe={recipe}/>
                        })
                        : <h2>Não temos nenhuma sugestão de receitas para você.</h2>}
                </div>
            </div>
        </div>
    )
}