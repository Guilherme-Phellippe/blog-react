import { CarouselMidiasContent } from '../../molecules/CarouselMidiasContent';
import { InfoRecipeHeader } from '../../molecules/InfoRecipeHeader';
import { IngredientsList } from '../../atoms/IngredientsList/IngredientsList';
import { PreparationInformation } from '../../molecules/PreparationInformation';
import { PrepareMode } from '../../atoms/PrepareMode';
import { RecipeChefInfo } from '../../molecules/RecipeChefInfo';
import { LikeComentsSaveButtons } from '../../molecules/LikeComentSaveButtons'
import { Adsense } from "../../molecules/Adsense"

export const InfoRecipeContent = ({ recipe }) => {
    const { name_recipe, nmr_hearts, images_recipe, ing, stuffing_ing, prepareMode, nmr_saved } = recipe

    return (
        <div className="w-full h-auto flex">
            <div className="w-full md:w-2/3 p-4">
                <InfoRecipeHeader nmr_hearts={nmr_hearts} name_recipe={name_recipe} />
                <CarouselMidiasContent name_recipe={name_recipe} img={images_recipe} />
                <PreparationInformation recipe={recipe} />
                <RecipeChefInfo recipe={recipe} />
                <IngredientsList ing={ing} stuffing_ing={stuffing_ing} />
                <PrepareMode prepareMode={prepareMode} />
                <div className="w-full py-4 mt-4 bg-[#24242420]">
                    <LikeComentsSaveButtons nmr_hearts={nmr_hearts} nmr_saved={nmr_saved} />
                </div>
            </div>
            <div className="w-1/3">
                <Adsense slot="2090078650" format="auto" />
            </div>
        </div>
    )
}