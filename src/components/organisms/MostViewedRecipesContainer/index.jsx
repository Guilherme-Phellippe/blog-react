import { BoxRecipe } from "../../organisms/BoxRecipe/BoxRecipe";

export const MostViewedRecipesContainer = ({ valueSearch, topRanking }) => {
    const filteredRanking = topRanking('nmr_eyes').filter((recipe, index) => index <= 2 && recipe.name_recipe && recipe )

    return (
        <>
            {!valueSearch &&
                <section id="best-recipes" className="relative">
                    <div
                        className="w-[95%] md:w-[80%] h-[90%] rounded-lg p-2 bg-white overflow-hidden grid grid-cols-4 grid-rows-6 gap-4">
                        {!!filteredRanking.length && filteredRanking.map((recipe, index) => {
                            if (index < 3) return <BoxRecipe
                                key={recipe.id}
                                recipe={recipe}
                                index={index}
                                area={index === 0 ? "col-span-4 row-span-4 md:col-span-3 md:row-span-6" : index === 1 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-3" : "col-span-2 row-span-2 md:col-span-1 md:row-span-3"}
                            />;
                            return [];
                        })}
                    </div>
                </section>
            }
        </>
    )
}


