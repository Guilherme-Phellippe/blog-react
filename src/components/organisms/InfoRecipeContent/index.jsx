import { Suspense, lazy } from 'react';
import { Loading } from '../../atoms/Loading/Loading';
import { ListRecipeComments } from '../../molecules/ListRecipeComments';

const InfoRecipeHeader = lazy(() => import("../../molecules/InfoRecipeHeader"))
const CarouselMidiasContent = lazy(() => import("../../molecules/CarouselMidiasContent"))
const PreparationInformation = lazy(() => import("../../molecules/PreparationInformation"))
const IngredientsList = lazy(() => import("../../atoms/IngredientsList/IngredientsList"))
const PrepareMode = lazy(() => import("../../atoms/PrepareMode"))
const RecipeChefInfo = lazy(() => import("../../molecules/RecipeChefInfo"))
const LikeComentsSaveButtons = lazy(() => import("../../molecules/LikeComentSaveButtons"))


export default function InfoRecipeContent({ recipe, showContentAfterScroll }) {

    return (
        recipe &&
        <div className="w-full flex justify-center">

            <div className="w-full md:w-2/3 p-4">
                <Suspense fallback={<Loading />}>
                    <InfoRecipeHeader nmr_hearts={recipe.nmr_hearts} name_recipe={recipe.name_recipe} />
                    <CarouselMidiasContent name_recipe={recipe.name_recipe} img={recipe.images_recipe} />
                </Suspense>

                <div className="w-full min-h-screen relative">

                    {
                        showContentAfterScroll &&
                        <>
                            <Suspense fallback={<Loading />}>
                                <PreparationInformation recipe={recipe} />
                                <RecipeChefInfo recipe={recipe} />
                            </Suspense>

                            <Suspense className="relative" fallback={<Loading />}>
                                <IngredientsList
                                    ing={recipe.ing}
                                    stuffing_ing={recipe.stuffing_ing}
                                    type_stuffing_ing={recipe.type_stuffing_ing}
                                />
                                <PrepareMode
                                    prepareMode={recipe.prepareMode}
                                    type_prepare_mode={recipe.type_prepare_mode}
                                />
                            </Suspense>

                            <Suspense fallback={<Loading />}>
                                <div className="w-full py-4 my-4 bg-[#24242420]">
                                    <LikeComentsSaveButtons nmr_hearts={recipe.nmr_hearts} nmr_saved={recipe.nmr_saved} />
                                </div>
                                <ListRecipeComments content={recipe} />
                            </Suspense>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}