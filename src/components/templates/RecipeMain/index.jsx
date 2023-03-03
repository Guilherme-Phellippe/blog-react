
import { useParams } from 'react-router-dom';

import { InfoRecipeContent } from '../../organisms/InfoRecipeContent';
import { RecipeSimilarContent } from '../../organisms/RecipeSimilarContent'
import { IconsShare } from '../../organisms/IconsShare';
import {  useEffect, useState } from 'react';
import { getUniqueRecipe, updateNumberEyes } from '../../../api/recipe';
import { Loading } from '../../atoms/Loading/Loading';

export const Main = () => {
    const { id } = useParams();
    const [recipe, setRecipe] =useState()

    useEffect(() => {
        (async function fetchData(){
            await updateNumberEyes(id)
            const data = await getUniqueRecipe(id);
            setRecipe(data)
        })();
    }, [id]);


    return (
        <main className='flex flex-col w-5/6 mt-8 mx-auto'>
            <IconsShare />
            <div className="w-full bg-white">
                {recipe ? <InfoRecipeContent recipe={recipe} /> : <Loading />}

                <div id="ads-here-print" className="w-full bg-background pt-8">
                    <div className="w-full bg-white rounded-md">
                        <h2 className='text-center text-s2 p-8 text-color_primary font-bold'>PELA WEB</h2>
                        <div className="w-full min-h-[50rem] border-[1px] mx-auto border-solid border-color_primary">
                            <h3 className='text-center text-s2'>anuncios here.</h3>
                        </div>
                    </div>
                </div>
                {recipe ? <RecipeSimilarContent recipe={recipe} /> : <Loading />}
                
            </div>
        </main>
    )
}