import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '../../atoms/Loading/Loading';
import { useFeedApi, useRecipeApi } from '../../../hooks/useApi';
import PreviewRecipe from '../../../contexts/PreviewRecipe';

const InfoRecipeContent = lazy(() => import("../../organisms/InfoRecipeContent"))
const IconsShare = lazy(() => import('../../organisms/IconsShare'))
const RecipeSimilarContent = lazy(() => import("../../organisms/RecipeSimilarContent"))

export default function RecipeMain({ showContentAfterScroll }) {
    const { id } = useParams();
    const [recipe, setRecipe] = useState();
    const refRecipeApi = useRef(useRecipeApi());
    const refFeedApi = useRef(useFeedApi());


    useEffect(() => {
        (async () => {
            refFeedApi.current.updateNumberEyes(id)
            const { data } = await refRecipeApi.current.getUniqueRecipe(id);
            document.head.querySelector("title").textContent = data.name_recipe + " - Tem sabor receitas"
            setRecipe(data);
        })();
    }, [id]);

    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' &&
            (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [])


    return (
        <div className="w-full max-w-[1500px] mx-auto">

            <PreviewRecipe title={"testinho do teste"} />

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
                        recipe &&
                        <Suspense fallback={<Loading />}>
                            <RecipeSimilarContent name_search={recipe.name_recipe} />
                        </Suspense>
                    }
                </div>
            </main>
        </div>
    )
}
