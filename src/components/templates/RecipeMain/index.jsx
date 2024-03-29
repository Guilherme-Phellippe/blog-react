import { Suspense, lazy, memo, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFeedApi, useRecipeApi } from '../../../hooks/useApi';
import { Loading } from '../../atoms/Loading/Loading';

import InfoRecipeContent from "../../organisms/InfoRecipeContent";
import BannerAds from '../../atoms/LineAds/BannerAds';
const IconsShare = lazy(() => import('../../organisms/IconsShare'))
const MenuMobile = lazy(() => import('../MenuMobile'))


function RecipeMain({ user }) {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState();
    const loadedDataRecipe = useRef(false)
    const refRecipeApi = useRef(useRecipeApi());
    const refFeedApi = useRef(useFeedApi());


    useEffect(() => {
        (async () => {
            if (!loadedDataRecipe.current) {
                loadedDataRecipe.current = true
                //SEARCH DATA IN API
                const { data } = await refRecipeApi.current.getUniqueRecipe(slug);
                //UPDATE NUMBER VISITS
                refFeedApi.current.updateNumberEyes(data.id)
                //ADD TITLE DYNAMIC
                document.head.querySelector("title").textContent = data.name_recipe + " - Tem sabor receitas"
                setRecipe(data);
            }
        })();
    }, [slug]);



    return (
        recipe &&
        <div className="w-full max-w-[1500px] min-h-screen mx-auto">
            <IconsShare recipe={recipe} user={user} />

            <main className='flex flex-col w-[97%] md:w-5/6 mt-8 mx-auto'>
                <div
                    className='adsbyalkware'
                    data-format='alk-banner'
                ></div>

                <BannerAds />

                <div className="w-full bg-white min-h-screen overflow-hidden">
                    <InfoRecipeContent
                        recipe={recipe}
                        user={user}
                    />
                </div>
            </main>

            {/* This menu will only be displayed when the user is on the smartphone */}
            {window.innerWidth < 764 &&
                <Suspense fallback={<Loading />}>
                    <MenuMobile user={user} />
                </Suspense>
            }

        </div>
    )
}


export default memo(RecipeMain)