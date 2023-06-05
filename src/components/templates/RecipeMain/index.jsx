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

            //         <meta property="og:image:width" content="400" />
            //         <meta property="og:image:height" content="300" />

            const title = document.createElement('title');
            const type = document.createElement('meta');
            const url = document.createElement('meta');
            const img = document.createElement('meta');
            const width = document.createElement('meta');
            const height = document.createElement('meta');

            title.textContent = data.name_recipe
            type.setAttribute("property", "og:type")
            type.setAttribute("content", "image/*")
            url.setAttribute("property", "og:url")
            url.setAttribute("content", `https://www.temsabor.blog/recipe/${data.name_recipe}/${data.id}`)
            img.setAttribute("property", "og:image")
            img.setAttribute("content", `${data.images_recipe[0].small}`)
            width.setAttribute("property", "og:image:width")
            width.setAttribute("content", `1200`)
            height.setAttribute("property", "og:image:height")
            height.setAttribute("content", `630`)

            document.head.insertBefore(height, document.head.firstChild)
            document.head.insertBefore(width, document.head.firstChild)
            document.head.insertBefore(img, document.head.firstChild)
            document.head.insertBefore(url, document.head.firstChild)
            document.head.insertBefore(type, document.head.firstChild)
            document.head.insertBefore(title, document.head.firstChild)

            setRecipe(data);
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
