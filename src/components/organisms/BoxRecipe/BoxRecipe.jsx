import { Img } from '../../atoms/Img';
import { Info3MostViewedRecipes } from '../../atoms/Info3MostViewedRecipes';
import { HoverInfo3MostViewedRecipes } from '../../molecules/HoverInfo3MostViewedRecipes';

import './boxrecipe.css'

export const BoxRecipe = ({ recipe }) => {
    const { images_recipe, name_recipe } = recipe;

    return (
        <div className="content-recipe">
            <Img src={images_recipe} alt={`imagem de ${name_recipe}`} />
            <Info3MostViewedRecipes recipe={recipe} />
            <HoverInfo3MostViewedRecipes recipe={recipe} />
        </div>
    )
}