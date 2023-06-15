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
    const {
        name_recipe,
        nmr_hearts,
        images_recipe,
        ing,
        stuffing_ing,
        type_stuffing_ing,
        prepareMode,
        type_prepare_mode,
        nmr_saved
    } = recipe

    return (
        <div className="w-full flex justify-center">
            <div className="w-full md:w-2/3 p-4">
                <Suspense fallback={<Loading />}>
                    <InfoRecipeHeader nmr_hearts={nmr_hearts} name_recipe={name_recipe} />
                    <CarouselMidiasContent name_recipe={name_recipe} img={images_recipe} />
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
                                    ing={ing}
                                    stuffing_ing={stuffing_ing}
                                    type_stuffing_ing={type_stuffing_ing}
                                />
                                <PrepareMode
                                    prepareMode={prepareMode}
                                    type_prepare_mode={type_prepare_mode}
                                />
                            </Suspense>
                            <Suspense fallback={<Loading />}>
                                <div className="w-full py-4 my-4 bg-[#24242420]">
                                    <LikeComentsSaveButtons nmr_hearts={nmr_hearts} nmr_saved={nmr_saved} />
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