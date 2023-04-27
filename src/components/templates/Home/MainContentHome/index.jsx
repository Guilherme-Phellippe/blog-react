import { useCallback, useContext, useEffect, useState, useRef } from "react";

import { HomeContext } from '../../../../contexts/Home/HomeProvider'
import { checkUserLogged } from '../../../../scripts/checkUserLogged'

import { GiPodium } from 'react-icons/gi'
import { MdArrowDropDown } from 'react-icons/md'

import { Button } from "../../../atoms/Button";
import { PollRecipes } from "../PollRecipes/PollRecipes.jsx";
import { CreateFeed } from '../CreateFeed/CreateFeed.jsx'
import { Feed } from '../../../organisms/Feed'
import { MostViewedRecipesContainer } from "../../../organisms/MostViewedRecipesContainer";
import { ColumnLeftMainHome } from "../../../organisms/ColumnLeftMainHome";
import { ColumnRightMainHome } from "../../../organisms/ColumnRightMainHome";
import { useFeedApi, useUserApi } from "../../../../hooks/useApi";

import './main.css'

export const MainContentHome = () => {
    const { valueSearch, setUser, user } = useContext(HomeContext);
    const [postPerPage, setPostPerPage] = useState(10);
    const [recipes, setRecipes] = useState([])
    const [feed, setFeed] = useState(recipes);
    const [isOpenRanking, setIsOpenRanking] = useState(false)
    const userApi = useRef(useUserApi());
    const feedApi = useRef(useFeedApi());
    const [showIconRanking, setShowIconRanking] = useState(false)

    useEffect(() => {
        (async () => {
            const { data: userData } = await checkUserLogged(userApi.current)
            const { data: recipesData } = await feedApi.current.getAllFeed();
            if(recipesData) setRecipes(recipesData)
            if (userData) setUser(userData)
            else localStorage.removeItem('token')
        }
        )();

    }, [setUser]);

    useEffect(() => {
        const findRecipes = valueSearch ? recipes.filter(recipe => {
            return recipe.name_recipe.toLowerCase().includes(valueSearch.toLowerCase()) ||
                recipe.category.name_category.toLowerCase().includes(valueSearch.toLowerCase()) ||
                recipe.user.name.toLowerCase().includes(valueSearch.toLowerCase());
        }) : recipes

        const newFeed = findRecipes.slice(0, postPerPage);

        setFeed(newFeed);
    }, [recipes, postPerPage, valueSearch])

    useEffect(() => {
        const removeModalRankignRecipe = document.addEventListener('click', ({ target }) => {
            const box = target.closest("div[data-id=modal-ranking-recipe-mobile]")
            const seeMoreNewRecipe = target.dataset.id === "see-more"
            if (!box && !seeMoreNewRecipe) {
                setIsOpenRanking(false)
            }
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
        const recipesFiltered = recipes.filter(recipe => recipe.name_recipe && recipe)
        return [...recipesFiltered].sort((x, y) => y.nmr_eyes - x.nmr_eyes)
    }, [recipes]);

    const topRankingByHearts = useCallback(() => {
        const recipesFiltered = recipes.filter(recipe => recipe.name_recipe && recipe)
        return [...recipesFiltered].sort((x, y) => y.nmr_hearts.length - x.nmr_hearts.length)
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
                        valueSearch={valueSearch}
                    />
                    {postPerPage <= feed.length &&
                        <Button
                            customClass={"btn-primary flex items-center mt-16 mx-auto block px-8 text-s1_1"}
                            event={() => setPostPerPage((nmr_post) => nmr_post + 10)}
                        >
                            Ver mais receitas
                            <MdArrowDropDown className="text-s2"/>
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