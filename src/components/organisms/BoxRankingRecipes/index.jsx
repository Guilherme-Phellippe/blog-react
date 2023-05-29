import { useState } from 'react';
import { ListRecipes } from '../../molecules/ListRecipes';

import './styles.css'

export const BoxRankingRecipes = ({ title, ranking }) => {
    const [limitRecipes, setLimitRecipes] = useState(8)

    const filteredRanking = ranking.filter((rank) => rank.name_recipe && rank)

    return (
        <div className={`container-ranking pb-12`}>
            <h2>{title}</h2>
            {
                !!filteredRanking.length && filteredRanking.map((recipe, index) => {
                    if (index < limitRecipes && index < 15) return (
                        <ListRecipes
                            key={recipe.id}
                            recipe={recipe}
                            classContainer="w-full h-[8rem] flex cursor-pointer border-b-[1px] border-x-[1px] border-solid hover:border-x-color_red p-2 hover:bg-background"
                            classInfoContent="w-2/3 flex flex-col justify-center"
                            classImgContent="w-1/3 h-full p-2"
                        />
                    )
                    return [];
                })
            }
            {ranking.length > limitRecipes ? <p data-id="see-more" onClick={() => setLimitRecipes(ranking.length)}>Veja mais</p> : ''}

            <ins class="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-4781060024956035"
                data-ad-slot="6974841302"
                data-matched-content-ui-type="image_sidebyside"
                data-matched-content-rows-num="3"
                data-matched-content-columns-num="1"
                data-ad-format="autorelaxed"
            ></ins>
        </div>
    )
}