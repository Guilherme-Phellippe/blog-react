import moment from "moment/moment.js";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { HomeContext } from '../../../contexts/Home/HomeProvider'

import { recipes } from "../../../scripts/api/simulation"

import { Button } from "../../atoms/Button";
import { BoxRecipe } from "./BoxRecipe/BoxRecipe.jsx";
import { BoxRankingRecipes } from "../../organisms/BoxRankingRecipes";
import { PollRecipes } from "./PollRecipes/PollRecipes.jsx";
import { CreateFeed } from './CreateFeed/CreateFeed.jsx'
import { Feed } from  './Feed/Feed.jsx'
import { PanelUser } from './PanelUser/PanelUser.jsx' 

import './main.css'

export const Main = () => {
    const { valueSearch } = useContext(HomeContext)

    const [postPerPage, setPostPerPage] = useState(7);
    const [feed, setFeed] = useState([]);

    const topRanking = useCallback((column) => {
        return [...recipes].sort((x, y) => y[column] - x[column])
    }, [])


    const MostRecent = useCallback(() => {
        return [...recipes].sort((a, b) => {
            let date1 = moment(a.createdAt)
            let date2 = moment(b.createdAt)
            return (date2.dayOfYear() - date1.dayOfYear())
        })
    }, []);


    useEffect(() => {
        const findRecipes = valueSearch ? recipes.filter(recipe => {
            return recipe.name_recipe.toLowerCase().includes(valueSearch.toLowerCase()) ||
                recipe.category.toLowerCase().includes(valueSearch.toLowerCase()) ||
                recipe.author.toLowerCase().includes(valueSearch.toLowerCase());
        }) : recipes
        const newFeed = findRecipes.slice(0, postPerPage)
        setFeed(newFeed);
    }, [postPerPage, valueSearch])

    return (
        <main>
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

            <section className="container-main">
                <aside>
                    {useMemo(() => {
                        return <BoxRankingRecipes title={'Receitas novas'} ranking={MostRecent()} />
                    }, [MostRecent])}
                </aside>
                <div className="feed">
                    {!valueSearch &&
                        <>
                            <PollRecipes contents={recipes} />
                            <CreateFeed />
                        </>
                    }
                    <Feed contents={feed} hasSearch={valueSearch} />
                    {postPerPage <= feed.length &&
                        <Button text="Carregar mais" event={() => setPostPerPage((nmr_post) => nmr_post + 5)} />
                    }
                </div>
                <aside>
                    {useMemo(() => {
                        return (
                            <>
                                <PanelUser />
                                <BoxRankingRecipes title={'As mais amadas'} ranking={topRanking('nmr_hearts')} />
                            </>
                        )
                    }, [topRanking])}

                </aside>
            </section>

        </main>
    )
}