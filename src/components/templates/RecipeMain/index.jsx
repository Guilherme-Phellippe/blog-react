import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFeedApi, useRecipeApi } from '../../../hooks/useApi';
import { Loading } from '../../atoms/Loading/Loading';
import MenuMobile, { } from "../MenuMobile"

const InfoRecipeContent = lazy(() => import("../../organisms/InfoRecipeContent"))
const IconsShare = lazy(() => import('../../organisms/IconsShare'))


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


    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' && recipe &&
            (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [recipe])

    return (
        recipe &&
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

                </div>
            </main>

            {/* This menu will only be displayed when the user is on the smartphone */}
            {window.innerWidth < 764 &&
                <MenuMobile />
            }

        </div>
    )
}
