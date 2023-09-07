import { useEffect, useRef } from 'react';
import LineAds from '../../atoms/LineAds';

import { ListRecipeComments } from '../../molecules/ListRecipeComments';
import RecipeSimilarContent from '../RecipeSimilarContent';
import InfoRecipeHeader from "../../molecules/InfoRecipeHeader";
import CarouselMidiasContent from "../../molecules/CarouselMidiasContent";
import PreparationInformation from "../../molecules/PreparationInformation";
import IngredientsList from "../../atoms/IngredientsList/IngredientsList";
import PrepareMode from "../../atoms/PrepareMode";
import RecipeChefInfo from "../../molecules/RecipeChefInfo";
import LikeComentsSaveButtons from "../../molecules/LikeComentSaveButtons";
import ProductsUsedRecipe from '../../molecules/ProductsUsedRecipe';
import ArticleAds from '../../atoms/LineAds/ArticleAds';
import { SlBasket } from 'react-icons/sl';
import { Img } from '../../atoms/Img';


export default function InfoRecipeContent({ recipe, user }) {
    const refContainerAd = useRef();

    const handleContainerAdOnViewport = () => {
        const divAd = refContainerAd.current.querySelector("div#container-ads");

        function isDivIsViewport() {
            const heightAd = refContainerAd.current.querySelector("div#container-ads").offsetHeight;
            const rect = refContainerAd?.current.getBoundingClientRect();
            return [rect.top <= 0, rect.bottom <= heightAd]
        }


        if (refContainerAd.current) {
            if (isDivIsViewport()[0] && !isDivIsViewport()[1]) {
                divAd.classList.add("fixed", "top-0")
                divAd.classList.remove("absolute","bottom-0")
            } else if (isDivIsViewport()[1]) {
                divAd.classList.remove("fixed", "top-0")
                divAd.classList.add("absolute","bottom-0")
            }else  divAd.classList.remove("fixed", "top-0")
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleContainerAdOnViewport);

        return () => window.removeEventListener("scroll", handleContainerAdOnViewport)
    }, [])


    return (
        recipe &&
        <div className="w-full flex flex-col" key={recipe.id}>

            <div className="w-full flex">
                <div className="w-full md:w-2/3 p-4">
                    <InfoRecipeHeader nmr_hearts={recipe.nmr_hearts} name_recipe={recipe.name_recipe} />
                    <CarouselMidiasContent images={recipe.images_recipe} videos={recipe.videos_recipe} />
                    {!!recipe?.products_used_recipe.length && <ProductsUsedRecipe usedProducts={recipe?.products_used_recipe} />}
                    <PreparationInformation recipe={recipe} />
                    <RecipeChefInfo recipe={recipe} />

                    <div className="w-full min-h-screen relative">

                        <IngredientsList
                            ing={recipe.ing}
                            stuffing_ing={recipe.stuffing_ing}
                            type_stuffing_ing={recipe.type_stuffing_ing}
                        />
                        <ArticleAds />
                        <PrepareMode
                            prepareMode={recipe.prepareMode}
                            type_prepare_mode={recipe.type_prepare_mode}
                        />



                        <div className="w-full py-4 my-4 bg-[#24242420]">
                            <LikeComentsSaveButtons nmr_hearts={recipe.nmr_hearts} nmr_saved={recipe.nmr_saved} />
                        </div>
                        <ListRecipeComments content={recipe} user={user} />
                    </div>
                </div>

                <div className="hidden md:block md:w-1/3 p-4">
                    <div
                        className="w-full h-[80vh] relative"
                        ref={refContainerAd}
                    >
                        <div id="container-ads" className="w-[300px] cursor-pointer">
                            <LineAds facebookEventName={"perpetual_products"}>
                                <a href="https://amzn.to/45vNFcn" target='_blank' className='w-full overflow-hidden' rel="noreferrer">
                                    <Img imgs={"https://i.ibb.co/x3fVKNC/459-Sn-S-associates-1200x1200-CB428349983.jpg"} />
                                </a>
                            </LineAds>
                        </div>
                    </div>
                </div>
            </div>

            <RecipeSimilarContent name_search={recipe?.name_recipe} />
        </div>
    )
}


