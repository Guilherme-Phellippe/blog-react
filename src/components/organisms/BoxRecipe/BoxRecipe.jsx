import { Link } from 'react-router-dom';
import { Img } from '../../atoms/Img';
import { Info3MostViewedRecipes } from '../../atoms/Info3MostViewedRecipes';
import { HoverInfo3MostViewedRecipes } from '../../molecules/HoverInfo3MostViewedRecipes';
import { defineSizeImage } from "../../../scripts/defineSizeImage";


export const BoxRecipe = ({ recipe, area, index }) => {
    const { images_recipe, name_recipe, id } = recipe;

    return (
        <Link
            className={`rounded-lg relative cursor-pointer flex flex-col justify-center items-center overflow-hidden ${area} group`}
            to={`/recipe/${name_recipe}/${id}`}
        >
            <Img
                className="absolute top-0 left-0 w-full h-full object-cover opacity-50 z-0 transition-opacity duration-300 ease-linear group-hover:opacity-80"
                src={defineSizeImage(images_recipe)}
                alt={`imagem de ${name_recipe}`}
            />
            <Info3MostViewedRecipes recipe={recipe} index={index} />
            <HoverInfo3MostViewedRecipes recipe={recipe} />
        </Link>
    )
}

