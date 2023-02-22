
import { useParams } from 'react-router-dom';
import { recipes } from '../../../scripts/api/simulation'

import { InfoRecipeContent } from '../../organisms/InfoRecipeContent';
import { RecipeSimilarContent } from '../../organisms/RecipeSimilarContent'
import { IconsShare } from '../../organisms/IconsShare';

export const Main = () => {

    const { id } = useParams();

    const recipe = recipes.find(recipe => recipe.id === Number(id));


    return (
        <main className='flex flex-col w-5/6 mt-8 mx-auto'>
            <IconsShare />
            <div className="w-full bg-white">
                <InfoRecipeContent recipe={recipe} />

                <div id="ads-here-print" className="w-full bg-background pt-8">
                    <div className="w-full bg-white rounded-md">
                        <h2 className='text-center text-s2 p-8 text-color_primary font-bold'>PELA WEB</h2>
                        <div className="w-full min-h-[50rem] border-[1px] mx-auto border-solid border-color_primary">
                            <h3 className='text-center text-s2'>anuncios here.</h3>
                        </div>
                    </div>
                </div>
                
                <RecipeSimilarContent recipe={recipe} />
            </div>
        </main>
    )
}