import { Link } from "react-router-dom";

export const ListRecipes = ({ recipe, classContainer, classInfoContent, classImgContent = "w-full h-full" }) => {
    return (
        <Link to={`/recipe/${recipe.id}`}>
            <div className={classContainer}>
                <div className={classImgContent}>
                    <img className='w-full h-full object-cover' src={recipe.images_recipe} alt={recipe.name_recipe} />
                </div>
                <div className={classInfoContent}>
                    <h2 className="text-s1_2 text-color_sub_text text-center">{recipe.name_recipe}</h2>
                    <p className="text-center text-color_sub_text">por: <span className="text-color_primary ">{recipe.user.name}</span></p>
                </div>
            </div>
        </Link>
    )
}
