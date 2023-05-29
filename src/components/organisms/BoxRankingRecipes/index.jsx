import { useEffect, useState } from 'react';
import { ListRecipes } from '../../molecules/ListRecipes';

export const BoxRankingRecipes = ({ title, ranking }) => {
    const [limitRecipes, setLimitRecipes] = useState(8)

    const filteredRanking = ranking.filter((rank) => rank.name_recipe && rank)

    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' && (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [])


    return (
        <div className={`w-full flex flex-col pb-12`}>;
            <h2 className='w-full text-center padding-1 text-s1_2'>{title}</h2>
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
            {
                ranking.length > limitRecipes &&
                <p
                    data-id="see-more"
                    className='text-center text-s1_2 my-8 underline cursor-pointer'
                    onClick={() => setLimitRecipes(ranking.length)}
                >Veja mais</p>
            }
            <div className="w-full min-h-[1rem] p-4 ">
                <ins class="adsbygoogle"
                    style={{ display: "block", width: "100%" }}
                    data-ad-client="ca-pub-4781060024956035"
                    data-ad-slot="6974841302"
                    data-matched-content-ui-type="image_sidebyside"
                    data-matched-content-rows-num="4"
                    data-matched-content-columns-num="1"
                    data-ad-format="autorelaxed"
                ></ins>
            </div >
        </div>
    )
}