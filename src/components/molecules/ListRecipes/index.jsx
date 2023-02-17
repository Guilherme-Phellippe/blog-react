import { Link } from "react-router-dom";

export const ListRecipes = ({ recipe, classContainer, classInfoContent, classImgContent = "w-full h-full" }) => {
    const date = new Date(recipe.createdAt).toLocaleDateString('pt-BR')

    return (
        <Link to={`/recipe/${recipe.id}`}>
            <div className={classContainer}>
                <div className={classImgContent}>
                    <img className='w-full h-full object-cover' src={recipe.img} alt={recipe.name_recipe} />
                </div>
                <div className={classInfoContent}>
                    <h2 className="text-s1_2 text-color_sub_text text-center">{recipe.name_recipe}</h2>
                    <p className="text-center text-color_sub_text">por: <span className="text-color_primary ">{recipe.author}</span></p>
                </div>
            </div>
        </Link>
    )
}
