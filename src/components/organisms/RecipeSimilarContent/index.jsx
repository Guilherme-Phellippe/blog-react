import { ListRecipes } from "../../molecules/ListRecipes";
import { recipes } from "../../../scripts/api/simulation";

const stylesListRecipes = {
    recent_recipe: {
        width: '30%',
        height: '45%',
        position: 'relative',
        cursor: 'pointer',
    },
    content_img: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '.5rem',
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    content_info: {
        width: '60%',
        height: '40%',
        position: 'absolute',
        top: '30%',
        left: '20%',
        backgroundColor: '#fffa',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    }
}

export const RecipeSimilarContent = ({ recipe }) => {

    const { name_recipe, category } = recipe

    const handleRecipeByTarget = () => {
        const targets = name_recipe.split(' ').concat(category.split(' '));
        var recipesFinds = [];
        //find all recipes that has name_recipe similar the name_recipe or category this recipe.
        recipes.forEach((recipe) => {
            for (let target of targets) {
                if (target.length > 3 && (recipe.name_recipe.toLowerCase().includes(target.toLowerCase()) || recipe.category.toLowerCase().includes(target.toLowerCase()))) {
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
                <div className="w-full h-[40rem] flex flex-wrap gap-2 justify-center" >
                    {handleRecipeByTarget().length ?
                        handleRecipeByTarget().map(recipe => {
                            return <ListRecipes key={recipe.id} recipe={recipe} styles={stylesListRecipes} />
                        })
                        : <h2>Não temos nenhuma sugestão de receitas para você.</h2>}
                </div>
            </div>
        </div>
    )
}