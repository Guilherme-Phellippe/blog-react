import { useCallback, useContext, useEffect, useState, useRef } from "react";

import { HomeContext } from '../../../../contexts/Home/HomeProvider'
import { checkUserLogged } from '../../../../scripts/checkUserLogged'

import { GiPodium } from 'react-icons/gi'

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
    const { valueSearch, setUser, user } = useContext(HomeContext);
    const [postPerPage, setPostPerPage] = useState(7);
    const [recipes, setRecipes] = useState([])
    const [feed, setFeed] = useState(recipes);
    const [isOpenRanking, setIsOpenRanking] = useState(false)
    const recipeApi = useRef(useRecipeApi());
    const userApi = useRef(useUserApi());
    const [showIconRanking, setShowIconRanking] = useState(false)

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

    useEffect(() => {
        const removeModalRankignRecipe = document.addEventListener('click', ({ target }) => {
            const box = target.closest("div[data-id=modal-ranking-recipe-mobile]")
            if (!box) setIsOpenRanking(false)
        });

        return () => {
            document.removeEventListener('click', removeModalRankignRecipe)
        }
    }, []);

    useEffect(() => {
        if (isOpenRanking) document.documentElement.style.overflow = 'hidden'
        else document.documentElement.style.overflow = 'auto'
    }, [isOpenRanking])

    document.onscroll = () => {
        if (window.scrollY > 480) setShowIconRanking(true)
        else setShowIconRanking(false)
    }


    const topRankingByEyes = useCallback(() => {
        return [...recipes].sort((x, y) => y.nmr_eyes - x.nmr_eyes)
    }, [recipes]);

    const topRankingByHearts = useCallback(() => {
        return [...recipes].sort((x, y) => y.nmr_hearts.length - x.nmr_hearts.length)
    }, [recipes]);



    return (
        <main className="max-w-[1500px] mx-auto">
            <MostViewedRecipesContainer valueSearch={valueSearch} topRanking={topRankingByEyes} />
            <section className="grid grid-cols-2 md:grid-cols-4 gap-[2%] mt-4">
                <ColumnLeftMainHome recipes={recipes} />

                <div className={`feed col-span-2`}>
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

                {
                    window.innerWidth <= 767 && showIconRanking &&
                    <>
                        <div
                            data-id="modal-ranking-recipe-mobile"
                            className={`${!isOpenRanking ? "hidden" : 'block'} z-[999] fixed top-0 right-0 w-[70%] h-screen overflow-auto border-l-[2px] border-l-color_orange`}>
                            <ColumnRightMainHome
                                user={user}
                                ranking={topRankingByHearts()}
                                isOpenRanking={isOpenRanking}
                            />
                        </div>
                        <div
                            data-id="modal-ranking-recipe-mobile"
                            onClick={() => setIsOpenRanking((open) => !open)}
                            className={`${!isOpenRanking ? "right-[0px]" : 'right-[69%]'} shadow-md shadow-[#24242480] z-50 fixed  bottom-32 w-[70px] border-[1px] border-white bg-color_orange rounded-tl-2xl rounded-bl-2xl flex justify-center`}>
                            <GiPodium
                                className="text-s4 fill-white mb-4" />
                        </div>
                    </>

                }
            </section>

        </main>
    )
}