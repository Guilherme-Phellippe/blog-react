import { Suspense, lazy, useEffect } from 'react';
import { Loading } from '../../atoms/Loading/Loading';
import { ListRecipeComments } from '../../molecules/ListRecipeComments';
import RecipeSimilarContent from '../RecipeSimilarContent';
import LineAds from '../../atoms/LineAds';

const InfoRecipeHeader = lazy(() => import("../../molecules/InfoRecipeHeader"))
const CarouselMidiasContent = lazy(() => import("../../molecules/CarouselMidiasContent"))
const PreparationInformation = lazy(() => import("../../molecules/PreparationInformation"))
const IngredientsList = lazy(() => import("../../atoms/IngredientsList/IngredientsList"))
const PrepareMode = lazy(() => import("../../atoms/PrepareMode"))
const RecipeChefInfo = lazy(() => import("../../molecules/RecipeChefInfo"))
const LikeComentsSaveButtons = lazy(() => import("../../molecules/LikeComentSaveButtons"))


export default function InfoRecipeContent({ recipe, showContentAfterScroll }) {

    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' && (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [showContentAfterScroll])

    return (
        recipe &&
        <div className="w-full flex flex-col">
            <div className="w-full flex">

                <div className="w-full md:w-2/3 p-4">
                    <Suspense fallback={<Loading />}>
                        <InfoRecipeHeader nmr_hearts={recipe.nmr_hearts} name_recipe={recipe.name_recipe} />
                        <CarouselMidiasContent name_recipe={recipe.name_recipe} img={recipe.images_recipe} />
                        <LineAds>
                            <ins
                                className="adsbygoogle"
                                style={{ display: "block" }}
                                data-ad-format="fluid"
                                data-ad-layout-key="-fc+51+9h-cr-91"
                                data-ad-client="ca-pub-4781060024956035"
                                data-ad-slot="1453561477"
                            ></ins>
                        </LineAds>
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
                                    <LineAds>
                                        <ins className="adsbygoogle"
                                            style={{ display: "block", maxWidth: (window.innerWidth - 50) }}
                                            data-ad-client="ca-pub-4781060024956035"
                                            data-ad-slot="9346456414"
                                            data-ad-format="auto"
                                            data-full-width-responsive="true"
                                        ></ins>
                                    </LineAds>
                                </Suspense>



                            </div>
                        </>
                    }
                </div>

                <div className="hidden md:block md:w-1/3 p-4">
                    <LineAds>
                        <ins className="adsbygoogle"
                            style={{ display: "none" }}
                            data-ad-client="ca-pub-4781060024956035"
                            data-ad-slot="5163292498"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        ></ins>
                    </LineAds>
                </div>
            </div>

            <RecipeSimilarContent name_search={recipe?.name_recipe} />

        </div>
    )
}


