import { useCallback, useContext, useEffect, useState } from "react";

import { HomeContext } from '../../../../contexts/Home/HomeProvider'

import { recipes } from "../../../../scripts/api/simulation"

import { Button } from "../../../helper/Button";
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
    const [feed, setFeed] = useState(recipes);
    const listRecipeLocalStorage = localStorage.getItem("listIdForRemove") ? JSON.parse(localStorage.getItem("listIdForRemove")) : []
    const [listRecipeForRemove, setListRecipeForRemove] = useState(listRecipeLocalStorage);


    const topRanking = useCallback((column) => {
        return [...recipes].sort((x, y) => y[column] - x[column])
    }, [])

    useEffect(()=>{
        recipes.sort(() => Math.random() - .5)
    })

    useEffect(() => {
        const findRecipes = valueSearch ? recipes.filter(recipe => {
            return recipe.name_recipe.toLowerCase().includes(valueSearch.toLowerCase()) ||
                recipe.category.toLowerCase().includes(valueSearch.toLowerCase()) ||
                recipe.author.toLowerCase().includes(valueSearch.toLowerCase());
        }) : recipes.filter(recipe => !listRecipeForRemove.includes(recipe.id.toString()))

        const newFeed = findRecipes.slice(0, postPerPage);

        setFeed(newFeed);
    }, [postPerPage, valueSearch, listRecipeForRemove])

    return (
        <main>
            <MostViewedRecipesContainer valueSearch={valueSearch} topRanking={topRanking} />

            <section className="container-main">
                <ColumnLeftMainHome recipes={recipes} />

                <div className="feed">
                    {!valueSearch &&
                        <>
                            <PollRecipes />
                            <CreateFeed />
                        </>
                    }
                    <Feed
                        contents={feed}
                        setFeed={setFeed}
                        setListRecipeForRemove={setListRecipeForRemove}
                        listRecipeForRemove={listRecipeForRemove}
                        hasSearch={valueSearch}
                    />
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