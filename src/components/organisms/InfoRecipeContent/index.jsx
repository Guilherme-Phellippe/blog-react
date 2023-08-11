import { useEffect, useRef } from 'react';
import { ListRecipeComments } from '../../molecules/ListRecipeComments';
import RecipeSimilarContent from '../RecipeSimilarContent';
import LineAds from '../../atoms/LineAds';

import InfoRecipeHeader from "../../molecules/InfoRecipeHeader";
import CarouselMidiasContent from "../../molecules/CarouselMidiasContent";
import PreparationInformation from "../../molecules/PreparationInformation";
import IngredientsList from "../../atoms/IngredientsList/IngredientsList";
import PrepareMode from "../../atoms/PrepareMode";
import RecipeChefInfo from "../../molecules/RecipeChefInfo";
import LikeComentsSaveButtons from "../../molecules/LikeComentSaveButtons";


export default function InfoRecipeContent({ recipe, user }) {
    const refContainerAd = useRef();

    const handleContainerAdOnViewport = () => {
        function isDivIsViewport() {
            const heightAd = refContainerAd.current.querySelector("div#container-ads").offsetHeight;
            const rect = refContainerAd?.current.getBoundingClientRect();
            return [rect.top <= 0, rect.bottom <= heightAd]
        }


        if (refContainerAd.current) {
            const divAd = refContainerAd.current.querySelector("div#container-ads");
            if (isDivIsViewport()[0] && !isDivIsViewport()[1]) {
                divAd.classList.add(`w-[${refContainerAd.current.offsetWidth}px]`)
                divAd.classList.add("fixed");
                divAd.classList.add("top-0");
                divAd.classList.remove("sticky");
                divAd.classList.remove("bottom-0");
                divAd.classList.remove("absolute");
            } else if (isDivIsViewport()[1]) {
                divAd.classList.remove("fixed");
                divAd.classList.remove("top-0");
                divAd.classList.add("absolute");
                divAd.classList.add("bottom-0");
            } else {
                divAd.classList.remove("fixed");
                divAd.classList.add("sticky");
                divAd.classList.remove("top-0");
            }

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

                    <div className="w-full min-h-screen relative">

                        <PreparationInformation recipe={recipe} />

                        <RecipeChefInfo recipe={recipe} />



                            <IngredientsList
                                ing={recipe.ing}
                                stuffing_ing={recipe.stuffing_ing}
                                type_stuffing_ing={recipe.type_stuffing_ing}
                            />
                            <PrepareMode
                                prepareMode={recipe.prepareMode}
                                type_prepare_mode={recipe.type_prepare_mode}
                            />



                            <div className="w-full py-4 my-4 bg-[#24242420]">
                                <LikeComentsSaveButtons nmr_hearts={recipe.nmr_hearts} nmr_saved={recipe.nmr_saved} />
                            </div>
                            <ListRecipeComments content={recipe} user={user} />
                            <LineAds display={true}>
                                <div className="adsbyalkware"
                                    data-ad-format="alk-banner"
                                ></div>
                            </LineAds>
                    </div>
                </div>

                <div className="hidden md:block md:w-1/3 p-4">
                    <div
                        className="w-full h-[80vh] relative"
                        ref={refContainerAd}
                    >
                        <div id="container-ads" className="sticky">
                            <LineAds display={true}>
                                <div
                                    className="adsbyalkware"
                                    data-format="alk-display"
                                ></div>
                            </LineAds>
                        </div>
                    </div>
                </div>
            </div>

            <RecipeSimilarContent name_search={recipe?.name_recipe} />
        </div>
    )
}


