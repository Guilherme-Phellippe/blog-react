import { Suspense, lazy } from 'react';
import { Loading } from '../../atoms/Loading/Loading';

const InfoRecipeHeader = lazy(() => import("../../molecules/InfoRecipeHeader"))
const CarouselMidiasContent = lazy(() => import("../../molecules/CarouselMidiasContent"))
const PreparationInformation = lazy(() => import("../../molecules/PreparationInformation"))
const IngredientsList = lazy(() => import("../../atoms/IngredientsList/IngredientsList"))
const PrepareMode = lazy(() => import("../../atoms/PrepareMode"))
const RecipeChefInfo = lazy(() => import("../../molecules/RecipeChefInfo"))
const LikeComentsSaveButtons = lazy(() => import("../../molecules/LikeComentSaveButtons"))


export default function InfoRecipeContent({ recipe, showContentAfterScroll }) {
    const { name_recipe, nmr_hearts, images_recipe, ing, stuffing_ing, prepareMode, nmr_saved } = recipe

    return (
        <div className="w-full flex justify-center">
            <div className="w-full md:w-2/3 p-4">
                <Suspense fallback={<Loading />}>
                    <InfoRecipeHeader nmr_hearts={nmr_hearts} name_recipe={name_recipe} />
                    <CarouselMidiasContent name_recipe={name_recipe} img={images_recipe} />
                </Suspense>

                {
                    showContentAfterScroll &&
                    <>
                        <Suspense fallback={<Loading />}>
                            <PreparationInformation recipe={recipe} />
                            <RecipeChefInfo recipe={recipe} />
                        </Suspense>
                        <Suspense fallback={<Loading />}>
                            <IngredientsList ing={ing} stuffing_ing={stuffing_ing} />
                            <PrepareMode prepareMode={prepareMode} />
                            <div className="w-full py-4 mt-4 bg-[#24242420]">
                                <LikeComentsSaveButtons nmr_hearts={nmr_hearts} nmr_saved={nmr_saved} />
                            </div>
                        </Suspense>
                    </>
                }
            </div>
        </div>
    )
}