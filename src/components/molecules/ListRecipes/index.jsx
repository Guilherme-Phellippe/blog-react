import { Link } from "react-router-dom";
import { formatTextLong } from "../../../scripts/formatTextLong";
import { Img } from "../../atoms/Img";

export const ListRecipes = ({ recipe, classContainer, classInfoContent, classImgContent = "w-full h-full" }) => {

    const handleScrollDocument = () =>{
        // need to add this scroll: auto , because on mobile,
        // if the user clicks on the list without closing the sorting modal, scrolling is "hidden"
        document.documentElement.style.overflow = 'auto'
    }

    return (
        <Link onClick={handleScrollDocument} to={`/receitas/${recipe.slug}`}>
            <div className={classContainer}>
                <div className={classImgContent}>
                    <Img imgs={recipe.images_recipe[0].small} alt={recipe.name_recipe} />
                </div>
                <div className={classInfoContent}>
                    <h2 className="text-s1_2 text-color_sub_text text-center">{formatTextLong(recipe.name_recipe, 25)}</h2>
                    <p className="text-center text-color_sub_text">por: <span className="text-color_orange ">{recipe.user.name}</span></p>
                </div>
            </div>
        </Link>
    )
}
