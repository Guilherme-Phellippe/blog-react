import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '../../atoms/Loading/Loading';
import { useFeedApi, useRecipeApi } from '../../../hooks/useApi';

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
            //ADD TITLE DYNAMIC
            document.head.querySelector("title").textContent = data.name_recipe + " - Tem sabor receitas"
            setRecipe(data);
        })();
    }, [id]);

    return (
        <div className="w-full max-w-[1500px] mx-auto">

            {
                recipe &&
                <Suspense fallback={<Loading />}>
                    <IconsShare recipe={recipe} />
                </Suspense>
            }

            <main className='flex flex-col w-[97%] md:w-5/6 mt-8 mx-auto'>
               

                <div className="w-full bg-white min-h-screen overflow-hidden">

                    <Suspense fallback={<Loading />}>
                        <InfoRecipeContent
                            recipe={recipe}
                            showContentAfterScroll={showContentAfterScroll}
                        />
                    </Suspense>


                    <Suspense fallback={<Loading />}>
                        <RecipeSimilarContent name_search={recipe?.name_recipe} />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}
