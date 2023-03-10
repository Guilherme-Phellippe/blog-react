import { useState } from 'react';
import { ListRecipes } from '../../molecules/ListRecipes';
import './styles.css'

export const BoxRankingRecipes = ({ title, ranking }) => {
    const [limitRecipes, setLimitRecipes] = useState(5)

    return (
        <div className="container-ranking">
            <h2>{title}</h2>
            {
                 ranking.length && ranking.map((recent, index) => {
                    if (index < limitRecipes && index < 8) return (
                        <ListRecipes 
                            key={recent.id} 
                            recipe={recent} 
                            classContainer="w-full h-[8rem] flex cursor-pointer border-b-[1px] border-x-[1px] border-solid hover:border-x-color_second p-2 hover:bg-background"
                            classInfoContent="w-2/3 flex flex-col justify-center"
                            classImgContent="w-1/3 h-full p-2"
                        />
                    )
                    return [];
                })
            }
            {ranking.length > limitRecipes ? <p onClick={() => setLimitRecipes(ranking.length)}>Veja mais</p> : ''}
        </div>
    )
}