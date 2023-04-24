
import { useParams } from 'react-router-dom';

import { InfoRecipeContent } from '../../organisms/InfoRecipeContent';
import { RecipeSimilarContent } from '../../organisms/RecipeSimilarContent'
import { IconsShare } from '../../organisms/IconsShare';
import { useEffect, useRef, useState } from 'react';
import { Loading } from '../../atoms/Loading/Loading';
import { useRecipeApi } from '../../../hooks/useApi';

export const Main = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState()
    const api = useRef(useRecipeApi());

    useEffect(() => {
        (async () => {
            api.current.updateNumberEyes(id)
            const { data } = await api.current.getUniqueRecipe(id)
            setRecipe(data)
        })();
    }, [id]);


    return (
        <div className="w-full max-w-[1500px] mx-auto">
            <main className='flex flex-col w-[95%] md:w-5/6 mt-8 mx-auto'>
                <IconsShare recipeId={recipe?.id} />
                <div className="w-full bg-white">
                    {recipe ? <InfoRecipeContent recipe={recipe} /> : <Loading />}
                    {recipe ? <RecipeSimilarContent recipe={recipe} /> : <Loading />}
                </div>
            </main>
        </div>
    )
}