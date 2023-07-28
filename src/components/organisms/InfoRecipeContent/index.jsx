import { Suspense, lazy } from 'react';
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


export default function InfoRecipeContent({ recipe, user }) {
    return (
        recipe &&
        <div className="w-full flex flex-col" key={recipe.id}>
            <div className="w-full flex">

                <div className="w-full md:w-2/3 p-4">
                    <Suspense fallback={<Loading />}>
                        <InfoRecipeHeader nmr_hearts={recipe.nmr_hearts} name_recipe={recipe.name_recipe} />
                        <CarouselMidiasContent name_recipe={recipe.name_recipe} img={recipe.images_recipe} />
                        <LineAds display={true}>
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
                            <ListRecipeComments content={recipe} user={user} />
                            <LineAds display={true}>
                                <ins className="adsbygoogle"
                                    style={{ display: "block" }}
                                    data-ad-client="ca-pub-4781060024956035"
                                    data-ad-slot="9346456414"
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"
                                ></ins>
                            </LineAds>
                        </Suspense>
                    </div>
                </div>

                <div className="hidden md:block md:w-1/3 p-4">
                    <h2 className='text-s1_5 font-bold text-color_orange pt-8 pb-6 text-center'>Utensílios usados na receita:</h2>
                    {/* AD AMAZON FIXED */}
                    <div className="flex justify-center">
                        <iframe
                            title='compartimento para guardar temperos'
                            sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
                            style={{ width: "150px", height: "240px" }}
                            scrolling="no"
                            src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=BR&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=guilherme34-20&marketplace=amazon&region=BR&placement=B08L5M5V6H&asins=B08L5M5V6H&linkId=a37774fecc9c19fdd701b1c9b0b00a11&show_border=true&link_opens_in_new_window=true"
                        ></iframe>
                        <iframe
                            title='Pulverizador de óleo para cozinhar'
                            sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
                            style={{ width: "120px", height: "240px" }}
                            src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=BR&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=guilherme34-20&marketplace=amazon&region=BR&placement=B08BFD54YW&asins=B08BFD54YW&linkId=0f8a9f190ce224b07eb66e9795cbabb0&show_border=true&link_opens_in_new_window=true"
                        ></iframe>
                    </div>
                </div>

            </div>

            <RecipeSimilarContent name_search={recipe?.name_recipe} />

        </div>
    )
}


