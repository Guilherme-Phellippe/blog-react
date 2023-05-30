import { CarouselMidiasContent } from '../../molecules/CarouselMidiasContent';
import { InfoRecipeHeader } from '../../molecules/InfoRecipeHeader';
import { IngredientsList } from '../../atoms/IngredientsList/IngredientsList';
import { PreparationInformation } from '../../molecules/PreparationInformation';
import { PrepareMode } from '../../atoms/PrepareMode';
import { RecipeChefInfo } from '../../molecules/RecipeChefInfo';
import { LikeComentsSaveButtons } from '../../molecules/LikeComentSaveButtons'
import { useEffect } from 'react';

export const InfoRecipeContent = ({ recipe }) => {
    const { name_recipe, nmr_hearts, images_recipe, ing, stuffing_ing, prepareMode, nmr_saved } = recipe

    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' && (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [])

    return (
        <div className="w-full flex">
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
                {/* <ins class="adsbygoogle"
                    style={{ display: 'block', textAlign: 'center', width: '100%' }}
                    data-ad-layout="in-article"
                    data-ad-format="fluid"
                    data-ad-client="ca-pub-4781060024956035"
                    data-ad-slot="1064809587"
                ></ins> */}
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-4781060024956035"
                    data-ad-slot="3655130128"
                    data-matched-content-ui-type="image_stacked"
                    data-matched-content-rows-num="3"
                    data-matched-content-columns-num="1"
                    data-ad-format="autorelaxed"></ins>
            </div>
        </div>
    )
}