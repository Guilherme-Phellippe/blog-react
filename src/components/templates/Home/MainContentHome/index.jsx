import moment from "moment/moment.js";
import { useCallback, useContext, useEffect, useState } from "react";

import { HomeContext } from '../../../../contexts/Home/HomeProvider'

import { recipes } from "../../../../scripts/api/simulation"

import { Button } from "../../../atoms/Button";
import { PollRecipes } from "../PollRecipes/PollRecipes.jsx";
import { CreateFeed } from '../CreateFeed/CreateFeed.jsx'
import { Feed } from '../../../organisms/Feed'

import { MostViewedRecipesContainer } from "../../../organisms/MostViewedRecipesContainer";
import { ColumnLeftMainHome } from "../../../organisms/ColumnLeftMainHome";
import { ColumnRightMainHome } from "../../../organisms/ColumnRightMainHome";

import './main.css'

export const MainContentHome = () => {
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
            <MostViewedRecipesContainer valueSearch={valueSearch} topRanking={topRanking} />

            <section className="container-main">
                <ColumnLeftMainHome ranking={MostRecent()} />

                <div className="feed">
                    {!valueSearch &&
                        <>
                            <PollRecipes contents={recipes} />
                            <CreateFeed />
                        </>
                    }
                    <Feed contents={feed} hasSearch={valueSearch} />
                    {postPerPage <= feed.length &&
                        <Button customClass={"btn-primary mx-auto block px-8"} event={() => setPostPerPage((nmr_post) => nmr_post + 5)}>
                            Carregar mais
                        </Button>
                    }
                </div>

                <ColumnRightMainHome ranking={topRanking('nmr_hearts')} />
            </section>

        </main>
    )
}