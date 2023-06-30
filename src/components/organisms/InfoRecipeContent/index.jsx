import { Suspense, lazy } from 'react';
import { Loading } from '../../atoms/Loading/Loading';
import { ListRecipeComments } from '../../molecules/ListRecipeComments';
import RecipeSimilarContent from '../RecipeSimilarContent';

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

                {
                    showContentAfterScroll &&
                    <>
                        <div className="w-full min-h-screen relative">

                            <Suspense fallback={<Loading />}>
                                <PreparationInformation recipe={recipe} />
                                <RecipeChefInfo recipe={recipe} />
                            </Suspense>

                            <Suspense className="relative" fallback={<Loading />}>
                                <div className="w-full my-4">
                                    <div className="flex justify-center opacity-25">
                                        <span className="w-full bg-zinc-900/50 h-[1px]"></span>
                                        <span className="mx-2 -translate-y-1/2">ads</span>
                                        <span className="w-full bg-zinc-900/50 h-[1px]"></span>
                                    </div>
                                    <ins
                                        className="adsbygoogle"
                                        style={{ display: "block" }}
                                        data-ad-format="fluid"
                                        data-ad-layout-key="-fc+51+9h-cr-91"
                                        data-ad-client="ca-pub-4781060024956035"
                                        data-ad-slot="1453561477"
                                    ></ins>
                                </div>
                                <IngredientsList
                                    ing={recipe.ing}
                                    stuffing_ing={recipe.stuffing_ing}
                                    type_stuffing_ing={recipe.type_stuffing_ing}
                                />
                                <PrepareMode
                                    prepareMode={recipe.prepareMode}
                                    type_prepare_mode={recipe.type_prepare_mode}
                                />
                                <div className="w-full my-4">
                                    <div className="flex justify-center opacity-25">
                                        <span className="w-full bg-zinc-900/50 h-[1px]"></span>
                                        <span className="mx-2 -translate-y-1/2">ads</span>
                                        <span className="w-full bg-zinc-900/50 h-[1px]"></span>
                                    </div>
                                    <ins
                                        className="adsbygoogle"
                                        style={{ display: "block", textAlign: "center" }}
                                        data-ad-layout="in-article"
                                        data-ad-format="fluid"
                                        data-ad-client="ca-pub-4781060024956035"
                                        data-ad-slot="5009663107"
                                    ></ins>
                                </div>

                            </Suspense>



                            <Suspense fallback={<Loading />}>
                                <div className="w-full py-4 my-4 bg-[#24242420]">
                                    <LikeComentsSaveButtons nmr_hearts={recipe.nmr_hearts} nmr_saved={recipe.nmr_saved} />
                                </div>
                                <ListRecipeComments content={recipe} />
                            </Suspense>

                            <RecipeSimilarContent name_search={recipe?.name_recipe} />


                        </div>
                    </>
                }
            </div>
        </div>
    )
}