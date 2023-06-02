
import { useParams } from 'react-router-dom';

import { InfoRecipeContent } from '../../organisms/InfoRecipeContent';
import { RecipeSimilarContent } from '../../organisms/RecipeSimilarContent'
import { IconsShare } from '../../organisms/IconsShare';
import { useEffect, useRef, useState } from 'react';
import { Loading } from '../../atoms/Loading/Loading';
import { useFeedApi, useRecipeApi } from '../../../hooks/useApi';

export default function RecipeMain() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState()
    const refRecipeApi = useRef(useRecipeApi());
    const refFeedApi = useRef(useFeedApi());

    useEffect(() => {
        (async () => {
            refFeedApi.current.updateNumberEyes(id)
            const { data } = await refRecipeApi.current.getUniqueRecipe(id)
            setRecipe(data)
            document.title = data.name_recipe + " - Tem sabor Receitas oficiais"
        })();
    }, [id]);


    return (
        <div className="w-full max-w-[1500px] mx-auto">
            {recipe ? <IconsShare recipe={recipe} /> : <Loading />}
            <main className='flex flex-col w-[97%] md:w-5/6 mt-8 mx-auto'>
                <div className="w-full bg-white min-h-screen overflow-hidden">
                    {recipe ? <InfoRecipeContent recipe={recipe} /> : <Loading />}
                    {recipe ? <RecipeSimilarContent name_search={recipe.name_recipe} /> : <Loading />}
                </div>
            </main>
        </div>
    )
}
