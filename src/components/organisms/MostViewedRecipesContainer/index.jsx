import { BoxRecipe } from "../../organisms/BoxRecipe/BoxRecipe";

export const MostViewedRecipesContainer = ({ valueSearch , topRanking}) => { 

    return(
        <>
        {!valueSearch &&
            <section id="best-recipes">
                <div className="container-best-recipes">
                    {topRanking('nmr_eyes').length && topRanking('nmr_eyes').map((recipe, index) => {
                        if (index < 3) return <BoxRecipe key={recipe.id} recipe={recipe} />;
                        return [];
                    })}
                </div>
            </section>
        }
        </>
    )
}
