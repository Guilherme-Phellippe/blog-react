import moment from "moment/moment.js";
import { useEffect, useState } from "react";

import { recipes } from "../../scripts/api/simulation.js"
import { Button } from "../utils/Button.jsx";

import { BoxRecipe } from './childs/BoxRecipe';
import { CreateFeed } from "./childs/CreateFeed.jsx";
import { Feed } from "./childs/Feed.jsx";
import { PanelUser } from "./childs/PanelUser.jsx";
import { RankingRecipes } from "./childs/RankingRecipes.jsx";
import { VoteRecipes } from "./childs/VoteRecipes.jsx";

import './main.css'

export const Main = ({ valueSearch }) => {

    const [postPerPage, setPostPerPage] = useState(7);
    const [feed, setFeed] = useState([]);

    const topViewed = [...recipes].sort((x, y) => y.nmr_eyes - x.nmr_eyes)
    const mostLoved = [...recipes].sort((x, y) => y.nmr_hearts - x.nmr_hearts)
    const mostRecent = [...recipes].sort((a, b) => {
        let date1 = moment(a.createdAt)
        let date2 = moment(b.createdAt)
        return (date2.dayOfYear() - date1.dayOfYear())
    });
    const findRecipes = valueSearch ? recipes.filter(recipe => {
        return recipe.name_recipe.toLowerCase().includes(valueSearch.toLowerCase()) ||
            recipe.category.toLowerCase().includes(valueSearch.toLowerCase()) ||
            recipe.author.toLowerCase().includes(valueSearch.toLowerCase());
    }) : recipes

    useEffect(() => {
        const newFeed = findRecipes.slice(0, postPerPage)
        console.log(postPerPage)
        setFeed(newFeed);
    }, [postPerPage, findRecipes])


    return (
        <main>
            {!valueSearch &&
                <section id="best-recipes">
                    <div className="container-best-recipes">
                        {topViewed.length && topViewed.map((recipe, index) => {
                            if (index < 3) return <BoxRecipe key={recipe.id} recipe={recipe} />;
                            return [];
                        })}
                    </div>
                </section>
            }

            <section className="container-main">
                <aside>
                    <RankingRecipes title={'Receitas novas'} ranking={mostRecent} />
                </aside>
                <div className="feed">
                    {!valueSearch &&
                        <>
                            <VoteRecipes contents={recipes} />
                            <CreateFeed />
                        </>
                    }
                    <Feed contents={feed} hasSearch={valueSearch} />
                    {postPerPage <= feed.length &&
                        <Button text="Carregar mais" event={() => setPostPerPage((nmr_post) => nmr_post + 5)} />
                    }
                </div>
                <aside>
                    <PanelUser />
                    <RankingRecipes title={'As mais amadas'} ranking={mostLoved} />
                </aside>
            </section>

        </main>
    )
}