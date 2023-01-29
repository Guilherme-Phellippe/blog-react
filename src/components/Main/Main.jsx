import moment from "moment/moment.js";
import { useState } from "react";

import { recipes } from "../../scripts/api/simulation.js"

import { BoxRecentRecipe } from "./childs/BoxRecentRecipe.jsx";
import { BoxRecipe } from './childs/BoxRecipe';
import { CreateFeed } from "./childs/CreateFeed.jsx";
import { Feed } from "./childs/Feed.jsx";
import { VoteRecipes } from "./childs/VoteRecipes.jsx";

import './main.css'

export const Main = ({ valueSearch }) => {

    const [limitRecipes, setLimitRecipes] = useState(5)

    const topViewed = [...recipes].sort((x, y) => y.nmr_eyes - x.nmr_eyes)
    const mostRecent = [...recipes].sort((a, b) => {
        let date1 = moment(a.createdAt)
        let date2 = moment(b.createdAt)
        return (date2.dayOfYear() - date1.dayOfYear())
    });


    const handleNewArrayFeed = () =>{
        const findRecipes = valueSearch ? recipes.filter( recipe => {
            return recipe.name_recipe.toLowerCase().includes(valueSearch.toLowerCase()) || 
                    recipe.category.toLowerCase().includes(valueSearch.toLowerCase()) ||
                    recipe.author.toLowerCase().includes(valueSearch.toLowerCase());
        }) : recipes
        return findRecipes.sort(() => Math.random() - .5);
    }


    return (
        <main>
            {!valueSearch &&
                <section id="best-recipes">
                    <div className="container-best-recipes">
                        {topViewed.length && topViewed.map((recipe, index) => {
                            if (index < 3) return <BoxRecipe key={recipe.id} recipe={recipe} />
                        })}
                    </div>
                </section>
            }

            <section className="container-main">
                <aside>
                    <div className="content-most-recents">
                        <h2>Receitas novas:</h2>
                        {mostRecent.length && mostRecent.map((recent, index) => {
                            if (index < limitRecipes) {
                                if (index < 8) return <BoxRecentRecipe key={recent.id} recent={recent} />
                            }
                        })}
                        {mostRecent.length > limitRecipes ? <p onClick={() => setLimitRecipes(mostRecent.length)}>Veja mais</p> : ''}
                    </div>
                </aside>
                <div className="feed">
                    {!valueSearch &&
                        <>
                            <VoteRecipes contents={handleNewArrayFeed()} />
                            <CreateFeed />
                        </> 
                    }
                    <Feed contents={handleNewArrayFeed()} hasSearch={valueSearch}/>
                </div>
                <aside>

                </aside>
            </section>

        </main>
    )
}