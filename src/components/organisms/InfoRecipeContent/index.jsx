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


export default function InfoRecipeContent({ recipe }) {


    return (
        recipe &&
        <div className="w-full flex justify-center">

            <div className="w-full md:w-2/3 p-4">
                <Suspense fallback={<Loading />}>
                    <InfoRecipeHeader nmr_hearts={recipe.nmr_hearts} name_recipe={recipe.name_recipe} />
                    <CarouselMidiasContent name_recipe={recipe.name_recipe} img={recipe.images_recipe} />
                </Suspense>

                <div className="w-full min-h-screen relative">

                    <Suspense fallback={<Loading />}>
                        <PreparationInformation recipe={recipe} />
                        <RecipeChefInfo recipe={recipe} />
                    </Suspense>

                    <Suspense className="relative" fallback={<Loading />}>
                        <ins class="adsbygoogle"
                            style={{ display: "block" }}
                            data-ad-format="fluid"
                            data-ad-layout-key="-fc+51+9h-cr-91"
                            data-ad-client="ca-pub-4781060024956035"
                            data-ad-slot="1453561477"></ins>
                        {console.log("anuncio 2")}
                        <IngredientsList
                            ing={recipe.ing}
                            stuffing_ing={recipe.stuffing_ing}
                            type_stuffing_ing={recipe.type_stuffing_ing}
                        />
                        <PrepareMode
                            prepareMode={recipe.prepareMode}
                            type_prepare_mode={recipe.type_prepare_mode}
                        />
                        <ins
                            className="adsbygoogle"
                            style={{ display: "block", textAlign: "center" }}
                            data-ad-layout="in-article"
                            data-ad-format="fluid"
                            data-ad-client="ca-pub-4781060024956035"
                            data-ad-slot="5009663107"
                        ></ins>
                        {console.log("anuncio 3")}
                    </Suspense>



                    <Suspense fallback={<Loading />}>
                        <div className="w-full py-4 my-4 bg-[#24242420]">
                            <LikeComentsSaveButtons nmr_hearts={recipe.nmr_hearts} nmr_saved={recipe.nmr_saved} />
                        </div>
                        <ListRecipeComments content={recipe} />
                    </Suspense>

                    <RecipeSimilarContent name_search={recipe?.name_recipe} />


                </div>
            </div>
        </div>
    )
}