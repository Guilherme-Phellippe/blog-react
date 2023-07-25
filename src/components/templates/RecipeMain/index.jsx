import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFeedApi, useRecipeApi } from '../../../hooks/useApi';
import { Loading } from '../../atoms/Loading/Loading';

const InfoRecipeContent = lazy(() => import("../../organisms/InfoRecipeContent"))
const IconsShare = lazy(() => import('../../organisms/IconsShare'))
const MenuMobile = lazy(() => import('../MenuMobile'))


export default function RecipeMain({ showContentAfterScroll }) {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState();
    const refRecipeApi = useRef(useRecipeApi());
    const refFeedApi = useRef(useFeedApi());


    useEffect(() => {
        (async () => {
            const { data } = await refRecipeApi.current.getUniqueRecipe(slug);
            refFeedApi.current.updateNumberEyes(data.id)
            //ADD TITLE DYNAMIC
            document.head.querySelector("title").textContent = data.name_recipe + " - Tem sabor receitas"
            setRecipe(data);
        })();
    }, [slug]);

    return (
        recipe &&
        <div className="w-full max-w-[1500px] mx-auto">
            <Suspense fallback={<Loading />}>
                <IconsShare recipe={recipe} />
            </Suspense>


            <main className='flex flex-col w-[97%] md:w-5/6 mt-8 mx-auto'>
                <div className="w-full bg-white min-h-screen overflow-hidden">
                    <InfoRecipeContent
                        recipe={recipe}
                        showContentAfterScroll={showContentAfterScroll}
                    />
                    {console.log("PAGE: RecipeMain", "FATHERCOMPONENT: main", "TIME: ", new Date())}

                </div>
            </main>

            {/* This menu will only be displayed when the user is on the smartphone */}
            {window.innerWidth < 764 &&
                <Suspense fallback={<Loading />}>
                    <MenuMobile />
                </Suspense>
            }

        </div>
    )
}
