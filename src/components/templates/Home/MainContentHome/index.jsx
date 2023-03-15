import { useCallback, useContext, useEffect, useState, useRef } from "react";

import { HomeContext } from '../../../../contexts/Home/HomeProvider'
import { checkUserLogged } from '../../../../scripts/checkUserLogged'

import { Button } from "../../../atoms/Button";
import { PollRecipes } from "../PollRecipes/PollRecipes.jsx";
import { CreateFeed } from '../CreateFeed/CreateFeed.jsx'
import { Feed } from '../../../organisms/Feed'
import { MostViewedRecipesContainer } from "../../../organisms/MostViewedRecipesContainer";
import { ColumnLeftMainHome } from "../../../organisms/ColumnLeftMainHome";
import { ColumnRightMainHome } from "../../../organisms/ColumnRightMainHome";
import { useRecipeApi, useUserApi } from "../../../../hooks/useApi";

import './main.css'

export const MainContentHome = () => {
    const { valueSearch, setUser, user} = useContext(HomeContext);
    const [postPerPage, setPostPerPage] = useState(7);
    const [recipes, setRecipes] = useState([])
    const [feed, setFeed] = useState(recipes);
    const recipeApi = useRef(useRecipeApi());
    const userApi = useRef(useUserApi());

    const listRecipeLocalStorage = localStorage.getItem("listIdForRemove") ? JSON.parse(localStorage.getItem("listIdForRemove")) : []
    const [listRecipeForRemove, setListRecipeForRemove] = useState(listRecipeLocalStorage);

    useEffect(() => {
        (async function fetchData() {
            const { data } = await recipeApi.current.getAllRecipes();
            setRecipes(data)
        })();

        (async function checkUser() {
            const { data: userData } = await checkUserLogged(userApi.current)
            if (userData) setUser(userData)
            else localStorage.removeItem('token')

        }
        )();

    }, [setUser]);


    useEffect(() => {
        recipes.sort(() => Math.random() - .5)
    }, [recipes])

    useEffect(() => {
        const findRecipes = valueSearch ? recipes.filter(recipe => {
            return recipe.name_recipe.toLowerCase().includes(valueSearch.toLowerCase()) ||
                recipe.category.name_category.toLowerCase().includes(valueSearch.toLowerCase()) ||
                recipe.user.name.toLowerCase().includes(valueSearch.toLowerCase());
        }) : recipes.filter(recipe => !listRecipeForRemove.includes(recipe.id))

        const newFeed = findRecipes.slice(0, postPerPage);

        setFeed(newFeed);
    }, [recipes, postPerPage, valueSearch, listRecipeForRemove])


    const topRankingByEyes = useCallback(() => {
        return [...recipes].sort((x, y) => y.nmr_eyes - x.nmr_eyes)
    }, [recipes]);

    const topRankingByHearts = useCallback((column) => {
        return [...recipes].sort((x, y) => y.nmr_hearts.length - x.nmr_hearts.length)
    }, [recipes]);

    return (
        <main>
            <MostViewedRecipesContainer valueSearch={valueSearch} topRanking={topRankingByEyes} />

            <section className="container-main">
                <ColumnLeftMainHome recipes={recipes} />

                <div className="feed">
                    {!valueSearch &&
                        <>
                            <PollRecipes />
                            <CreateFeed user={user} />
                        </>
                    }
                    <Feed
                        contents={feed}
                        setFeed={setFeed}
                        setListRecipeForRemove={setListRecipeForRemove}
                        listRecipeForRemove={listRecipeForRemove}
                        valueSearch={valueSearch}
                    />
                    {postPerPage <= feed.length &&
                        <Button customClass={"btn-primary mt-6 mx-auto block px-8"} event={() => setPostPerPage((nmr_post) => nmr_post + 5)}>
                            Carregar mais
                        </Button>
                    }
                </div>

                <ColumnRightMainHome
                    user={user}
                    ranking={topRankingByHearts()}
                />
            </section>

        </main>
    )
}