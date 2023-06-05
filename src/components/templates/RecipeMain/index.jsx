import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '../../atoms/Loading/Loading';
import { useFeedApi, useRecipeApi } from '../../../hooks/useApi';

const InfoRecipeContent = lazy(() => import("../../organisms/InfoRecipeContent"))
const IconsShare = lazy(() => import('../../organisms/IconsShare'))
const RecipeSimilarContent = lazy(() => import("../../organisms/RecipeSimilarContent"))

export default function RecipeMain() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState()
    const refRecipeApi = useRef(useRecipeApi());
    const refFeedApi = useRef(useFeedApi());
    const [showContentAfterScroll, setContentAfterScroll] = useState(false)

    useEffect(() => {
        (async () => {
            refFeedApi.current.updateNumberEyes(id)
            const { data } = await refRecipeApi.current.getUniqueRecipe(id);
            console.log(data)
            setRecipe(data)
            //CREATE META TAG TO SHOW IMAGE WHEN SHARE RECIPE LINK
            const metaTagImage = document.createElement("meta");
            const metaTagTitle = document.createElement("meta");
            const metaTagDescription = document.createElement("meta");
            metaTagImage.property = "og:image"
            metaTagTitle.property = "og:title"
            metaTagDescription.property = "og:description"
            metaTagImage.content = data ? data.images_recipe[0].small : ""
            metaTagTitle.content = data.name_recipe
            metaTagDescription.content = "Conheça essa deliciosa receita no nosso blog Tem sabor"
            document.head.appendChild(metaTagImage)
            document.head.appendChild(metaTagTitle)
            document.head.appendChild(metaTagDescription)
            document.title = data.name_recipe + " - Tem sabor Receitas oficiais"
        })();
    }, [id]);

    useEffect(() => {



        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' &&
            (window.adsbygoogle = window.adsbygoogle || []).push({});

        const handleScrollY = () => {
            if (window.scrollY > 150) setContentAfterScroll(true)
        }

        window.addEventListener("scroll", handleScrollY)

        return () => {
            window.removeEventListener("scroll", handleScrollY)
        }


    }, [])

    return (
        <div className="w-full max-w-[1500px] mx-auto">

            {
                recipe &&
                <Suspense fallback={<Loading />}>
                    <IconsShare recipe={recipe} />
                </Suspense>
            }

            <main className='flex flex-col w-[97%] md:w-5/6 mt-8 mx-auto'>
                <div className="mb-4">
                    <ins className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-4781060024956035"
                        data-ad-slot="9346456414"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    ></ins>
                </div>

                <div className="w-full bg-white min-h-screen overflow-hidden">
                    {
                        recipe &&
                        <Suspense fallback={<Loading />}>
                            <InfoRecipeContent
                                recipe={recipe}
                                showContentAfterScroll={showContentAfterScroll}
                            />
                        </Suspense>
                    }

                    {
                        showContentAfterScroll && recipe &&
                        <Suspense fallback={<Loading />}>
                            <RecipeSimilarContent name_search={recipe.name_recipe} />
                        </Suspense>
                    }
                </div>
            </main>
        </div>
    )
}
