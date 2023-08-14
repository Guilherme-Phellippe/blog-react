import timer from "../../../scripts/formatTime";
import { BoxRecipe } from "../../organisms/BoxRecipe/BoxRecipe";

export default function MostViewedRecipesContainer({ valueSearch, topRanking }) {
    const filteredRanking = topRanking('nmr_eyes')
        .filter((recipe) => (recipe.name_recipe && timer(recipe.createdAt).dayOfYear() > (timer().dayOfYear() - 3)) && recipe)
        .sort((a, b) => timer(b.createdAt).dayOfYear() - timer(a.createdAt).dayOfYear())
        .filter((recipe, index) => index < 3 && recipe)
        .sort((a, b) => b.nmr_eyes - a.nmr_eyes)

    return (
        <>
            {!valueSearch && !!filteredRanking.length &&

                <section className="w-full h-[50vh] min-h-[400px] grid place-items-center relative">
                    <div
                        className="w-[95%] md:w-[80%] h-[90%] rounded-lg p-2 bg-white overflow-hidden grid grid-cols-4 grid-rows-6 gap-4">
                        {
                            filteredRanking.map((recipe, index) => {
                                return <BoxRecipe
                                    key={recipe.id}
                                    recipe={recipe}
                                    index={index}
                                    area={index === 0 ? "col-span-4 row-span-4 md:col-span-3 md:row-span-6" : index === 1 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-3" : "col-span-2 row-span-2 md:col-span-1 md:row-span-3"}
                                />;
                            })
                        }
                    </div>
                </section>
            }
        </>
    )
}


