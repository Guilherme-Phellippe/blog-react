import { useCallback, useContext, useEffect, useState, useRef } from "react";

import { HomeContext } from '../../../../contexts/Home/HomeProvider'

import { GiPodium } from 'react-icons/gi'
import { MdArrowDropDown } from 'react-icons/md'

import { Button } from "../../../atoms/Button";
import { PollRecipes } from "../PollRecipes/PollRecipes.jsx";
import { CreateFeed } from '../CreateFeed/CreateFeed.jsx'
import { Feed } from '../../../organisms/Feed'
import { MostViewedRecipesContainer } from "../../../organisms/MostViewedRecipesContainer";
import { ColumnLeftMainHome } from "../../../organisms/ColumnLeftMainHome";
import { ColumnRightMainHome } from "../../../organisms/ColumnRightMainHome";
import { useFeedApi } from "../../../../hooks/useApi";

import './main.css'
import { smartSearch } from "../../../../scripts/smartSearch";

export const MainContentHome = () => {
    const { valueSearch,  user } = useContext(HomeContext);
    const [postPerPage, setPostPerPage] = useState(10);
    const [recipes, setRecipes] = useState([])
    const [feed, setFeed] = useState(recipes);
    const [isOpenRanking, setIsOpenRanking] = useState(false)
    const feedApi = useRef(useFeedApi());
    const [showIconRanking, setShowIconRanking] = useState(false)

    //Search data in bd and fill recipes and user
    useEffect(() => {
        (async () => {
            const { data: recipesData } = await feedApi.current.getAllFeed();
            if (recipesData) setRecipes(recipesData)
            else localStorage.removeItem('token')
            document.title = "Tem Sabor receitas oficiais"
        }
        )();
    }, []);

    //filter the recipes case user search some recipes
    useEffect(() => {
        const findRecipes = valueSearch ? smartSearch(recipes, valueSearch) : recipes
        
        const newFeed = findRecipes.slice(0, postPerPage);

        setFeed(newFeed);
    }, [recipes, postPerPage, valueSearch]);

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
                        setIsOpenRanking={setIsOpenRanking}
                    />
                    {postPerPage <= feed.length &&
                        <Button
                            customClass={"btn-primary flex items-center mt-16 mx-auto block px-8 text-s1_1"}
                            event={() => setPostPerPage((nmr_post) => nmr_post + 10)}
                        >
                            Ver mais receitas
                            <MdArrowDropDown className="text-s2" />
                        </Button>
                    }
                </div>

                <ColumnRightMainHome
                    ranking={topRankingByHearts()}
                />

                {
                    window.innerWidth <= 767 && showIconRanking &&
                    <>
                        <div
                            data-id="modal-ranking-recipe-mobile"
                            className={`${!isOpenRanking ? "invisible translate-x-full" : 'visible translate-x-[43%]'} z-[999] transition-transform duration-400 fixed top-0 w-[70%] h-screen overflow-auto border-l-[2px] border-l-color_orange`}>
                            <ColumnRightMainHome
                                ranking={topRankingByHearts()}
                                isOpenRanking={isOpenRanking}
                            />
                        </div>
                        <div
                            data-id="modal-ranking-recipe-mobile"
                            onClick={() => setIsOpenRanking((open) => !open)}
                            className={`${!isOpenRanking ? "right-[0px]" : 'right-[69%]'} shadow-md shadow-[#24242480] transition-all duration-450 z-50 fixed  bottom-32 w-[70px] border-[1px] border-white bg-color_orange rounded-tl-2xl rounded-bl-2xl flex justify-center`}>
                            <GiPodium
                                className="text-s4 fill-white mb-4" />
                        </div>
                    </>

                }
            </section>

        </main>
    )
}