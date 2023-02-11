import { CarouselMidiasContent } from '../../molecules/CarouselMidiasContent';
import { InfoRecipeHeader } from '../../molecules/InfoRecipeHeader';
import { IngredientsList } from '../../molecules/IngredientsList/IngredientsList';
import { PreparationInformation } from '../../molecules/PreparationInformation';
import { PrepareMode } from '../../molecules/PrepareMode';
import { RecipeChefInfo } from '../../molecules/RecipeChefInfo';
import { LikeComentsSaveButtons } from '../../molecules/LikeComentSaveButtons'

export const InfoRecipeContent = ({ recipe }) => {
    const { name_recipe, nmr_hearts, img, author, createdAt } = recipe

    return (
        <div className="w-2/3 p-4">
            <InfoRecipeHeader nmr_hearts={nmr_hearts} name_recipe={name_recipe} />
            <CarouselMidiasContent name_recipe={name_recipe} img={img} />
            <div className="w-full p-4">
                <LikeComentsSaveButtons />
            </div>
            <PreparationInformation />
            <RecipeChefInfo author={author} createdAt={createdAt} />
            <IngredientsList />
            <PrepareMode />
        </div>
    )
}